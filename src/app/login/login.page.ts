import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { NavController, LoadingController, AlertController, ToastController } from "@ionic/angular";
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
    public alertCtrl: AlertController,
    public toastController: ToastController,
    public http: HttpClient,
    ) {}

  user = { email: '', password: '' }
  data = {}

  async test() {
    console.log(this.afAuth.auth.currentUser.getIdToken(true));
    console.log(this.afAuth.auth.currentUser.getIdToken());

    let token = await this.afAuth.auth.currentUser.getIdToken(true);
    const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
      });
    this.data = await this.http.get("http://127.0.0.1:8002/api//merchant/me", { headers: header }).toPromise();
      console.log(this.data );
  }  



  async login() {
    try {
      const loginUser = await this.afAuth.auth.signInWithEmailAndPassword(
        this.user.email, this.user.password
      );
      console.log(this.afAuth.auth.currentUser.getIdToken(true));

    //   let token = await this.afAuth.auth.currentUser.getIdToken();   
    //   const header = new HttpHeaders({
    //     'Authorization': 'Bearer ' + token,
    //   }); 
    //   this.data = await this.http.get("http://127.0.0.1:8002/api/onlyme", { headers: header }).toPromise();
    //   console.log(this.data );
      
      this.navCtrl.navigateForward("/dashboard");
    } catch (error) {
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
