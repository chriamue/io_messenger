const env = require('../../env.js');
const IOTA = require('iota.lib.js');
var testnet = new IOTA({
  'host': env.host,
  'port': env.port
});
var iota = testnet;

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
