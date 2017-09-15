import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username = "anonymous"
  seed = ""

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.init();
  }

  init(){
    this.storage.ready().then(() => {
      this.username = localStorage.getItem('username');
      this.seed = localStorage.getItem('seed');
    });
  }

  login(){
    localStorage.setItem('username', this.username);
    localStorage.setItem('seed', this.seed);
    this.navCtrl.push(HomePage);
  }

}
