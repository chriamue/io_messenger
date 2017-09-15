import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.init();
  }

  init(){
    this.storage.get('username').then((val) => {
      console.log('Your age is', val);
      document.getElementById('username').setAttribute('value', val)
    });
  }

  login(){
    this.storage.set('username', document.getElementById('username').getAttribute('value'));
    this.navCtrl.push(HomePage);
  }

}
