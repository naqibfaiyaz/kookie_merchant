import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public toastController: ToastController,
    public http: HttpClient,
    ) {}

  user = { email: '', password: '' };
  data = {};

  async login() {
    let loading = await this.loadingCtrl.create({
      message: 'Please Wait',
      cssClass: 'custom-loading',
      spinner: 'circles',
      keyboardClose: true,
    });
    try {
      await loading.present();
      const loginUser = await this.afAuth.auth.signInWithEmailAndPassword(
        this.user.email, this.user.password
      );
      console.log(this.afAuth.auth.currentUser.getIdToken(true));
      await this.navCtrl.navigateForward('/dashboard');
      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      await this.presentToast(error);
    }
  }

  async presentToast(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2500
    });
    toast.present();
  }

  ngOnInit() {

  }

}
