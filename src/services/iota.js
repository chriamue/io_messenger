const env = require('../../env.js');
const IOTA = require('iota.lib.js');
const testnet = new IOTA({
  'host': env.host,
  'port': env.port
});
const iota = testnet;

export async function sendMessage(seed, from, to, message, name = 'anonymous') {
  console.log(seed, from, to, message, name);
  var messageToSend = {
    'name': name,
    'message': message
  };

  try {
    console.log('Sending Message: ', messageToSend);
    var messageTrytes = iota.utils.toTrytes(JSON.stringify(messageToSend));
    const transfer = [
      {
        address: to,
        value: 0,
        message: messageTrytes,
        tag: iota.utils.toTrytes('io_messenger')
      }
    ];
    var options = {
      address: from
    };
    if (!iota.valid.isTransfersArray(transfer)) {
      console.log(
        'Transfer Error',
        'The transaction object appears to be invalid. \n Please try again.'
      );
      return;
    }
    iota.api.sendTransfer(seed, 9, 15, transfer, options,
      (error, success) => {
        if (error) {
          console.error(error);
        } else {
          console.log(success);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
}

export function getMessages(seed, address) {
  iota.api.getNewAddress(
    seed,
    {index: 0},
    function(error, success) {
      console.log(error);
      console.log(success);
    }
  );
  console.log(seed);
  console.log(address);
  iota.api.getTransfers(env.seed, {start: 0}, function(e, transfers) {
    console.log(transfers);
  });
  var messages = [];
  iota.api.getAccountData(seed, function (e, accountData) {
    console.log(e);
    console.log(accountData);
    accountData.transfers.forEach(function (transfer) {
      try {
        var message = iota.utils.extractJson(transfer);
        messages.push(message);
        console.log('Extracted JSON from Transaction: ', message);
      } catch (e2) {
        console.log(e2);
        console.log('Transaction did not contain any JSON Data');
      }
    });
  });
  return messages;
}
