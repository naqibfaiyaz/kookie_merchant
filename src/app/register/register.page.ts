import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    public toastController: ToastController,
    private loadingCtrl: LoadingController,
    ) {}

  user = { email: '', password: '' };
  message = {};

  async createAccount() {
    let loading = await this.loadingCtrl.create({
      message: 'Please Wait',
      cssClass: 'custom-loading',
      spinner: 'circles',
      keyboardClose: true,
    });
    try {
      await loading.present();
      const createUser = await this.afAuth.auth.createUserWithEmailAndPassword(
        this.user.email, this.user.password
      );
      await this.navCtrl.navigateForward('/dashboard');
      await loading.dismiss();
      this.message = 'Your account has been created successfully.';
      await this.presentToast(this.message);
    } catch (message) {
      await loading.dismiss();
      await this.presentToast(message);
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
