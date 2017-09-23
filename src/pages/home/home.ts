import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

//import {IOTA} from 'iota.lib.js';

declare var IOTA: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  seed: string
  add_address = ""
  addresses = []
  transferList = []
  iota = new IOTA({
    'host': 'http://localhost',
    'port': 14265
  });

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.init();
  }

  init() {
    this.storage.ready().then(() => {
      this.seed = localStorage.getItem('seed');
      if (JSON.parse(localStorage.getItem("addresses")))
        this.addresses = JSON.parse(localStorage.getItem("addresses"));
    });
    this.getTransactions();
  }

  addAddress() {
    this.addresses.push(this.add_address)
    this.add_address = ""
    localStorage.setItem("addresses", JSON.stringify(this.addresses));
  }

  chat(address) {

  }

  getTransactions() {
    var checkedTxs = 0
    var address
    this.iota.api.getAccountData(this.seed, function (e, accountData) {
      console.log('Account data', accountData)
      if ( !accountData) return
      // Update address in case it's not defined yet
      if (!address && accountData.addresses[0]) {
        address = this.iota.utils.addChecksum(accountData.addresses[accountData.addresses.length - 1])
        console.log(address)
      }

      var transferList = []

      //  Go through all transfers to determine if the tx contains a message
      //  Only valid JSON data is accepted
      if (accountData.transfers.length > checkedTxs) {
        console.log('RECEIVED NEW TXS')

        accountData.transfers.forEach(function (transfer) {
          try {
            var message = this.iota.utils.extractJson(transfer)
            console.log('Extracted JSON from Transaction: ', message)

            message = JSON.parse(message)
            console.log('JSON: ', message)

            var newTx = {
              'name': message.name,
              'message': message.message,
              'value': transfer[0].value
            }
            transferList.push(newTx)
          } catch (e) {
            console.log('Transaction did not contain any JSON Data')
          }
        })

        // Increase the counter of checkedTxs
        checkedTxs = accountData.transfers.length
      }
    })
  }
}
