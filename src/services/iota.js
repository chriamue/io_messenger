const env = require('../../env.js');
const IOTA = require('iota.lib.js'); // "iota.lib.js": "Roconda/iota.lib.js#react_native",
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
  var addresses = [address];
  var messages = [];
  console.log(seed,' X ', address);
  return new Promise((resolve, reject) => {
    iota.api._bundlesFromAddresses(addresses, true, (error, bundles) => {
      if (error) {
        reject(error);
      }
      console.log(bundles);
      if (bundles) {
        bundles.forEach((bundle) => {
          var timestamp = bundle[0].timestamp;
          if (timestamp < 1262304000000) {
            timestamp *= 1000;
          }
          var time = new Date(timestamp);
          var message = JSON.parse(iota.utils.extractJson(bundle));
          console.log(message);
          messages.push({time: time, message: message.message});
        });
      }
      resolve(messages);
    });
  }).then(() => messages).catch((error) => { console.warn(error); return []; });
}

export function generateAddress(seed, index) {
  var options = {
    index: index,
    checksum: true,
    total: 1
  };
  return new Promise((resolve, reject) => {
    iota.api.getNewAddress(seed, options, (error, addresses) => {
      if (error) {
        reject(error);
      }
      resolve(addresses[0]);
    });
  }).then((address) => address).catch((error) => { console.log(error); return ''; });
}

export function fillSeed(seed) {
  if (!seed) {
    seed = '';
  }
  var filledseed = '';
  for (var i = 0; i < seed.length; ++i) {
    if (('ABCDEFGHIJKLMNOPQRSTUVWXYZ9').indexOf(seed.charAt(i)) < 0) {
      filledseed += '9';
    } else {
      filledseed += seed.charAt(i);
    }
  }
  while (filledseed.length < 81) {
    filledseed += 9;
  }
  return filledseed;
}
