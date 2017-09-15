import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  seed: string
  add_address = ""
  addresses = []

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.init();
  }

  init() {
    this.storage.ready().then(() => {
      this.seed = localStorage.getItem('seed');
      if(JSON.parse(localStorage.getItem("addresses")))
        this.addresses = JSON.parse(localStorage.getItem("addresses"));
    });
  }

  addAddress() {
    this.addresses.push(this.add_address)
    this.add_address = ""
    localStorage.setItem("addresses", JSON.stringify(this.addresses));
  }

  chat(address){
    
  }
}
