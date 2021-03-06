import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, ToastController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // merchantEmail = this.afAuth.auth.currentUser.email;
  userData = null;
  uid = null;
  createdAt = null;
  pointType = null;
  merchantCode = null;
  merchantData = null;

  constructor(
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    public toastController: ToastController,
    private qrScanner: QRScanner,
    private router: Router,
    public httpClientService: HttpClientService,
    ) { }

  async getUserByCode(userCodeInput: number) {
    try {
      if (userCodeInput) {
        this.userData = await this.httpClientService.getUserData(userCodeInput);
        // this.uid = this.userData.uid;      // Do not need right now //
        this.createdAt = this.userData.createdAt;
        if (this.userData === 0) {
          this.messageToast('Customer not found. Please input correct Customer Id.');
        } else  {
          this.router.navigate(['reward-by-merchant'] , {
            queryParams: { customerId: userCodeInput, createdAt: this.createdAt, }
          });
        }
      } else {
        this.messageToast('Please input Customer Id');
      }
    } catch (e) {
      this.messageToast(e.statusText + '. Please try again.');
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    await this.navCtrl.navigateForward('/login');
    await this.messageToast('Your have successfully logged out.');
  }

  async messageToast(messageBody: string) {
    const toast = await this.toastController.create({
      message: messageBody,
      duration: 3000
    });
    toast.present();
  }


  ngOnInit() {

  }

}
