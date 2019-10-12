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

  merchantEmail = this.afAuth.auth.currentUser.email;
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

    this.userData = await this.httpClientService.getUserData(userCodeInput);
    this.uid = this.userData.uid;
    this.createdAt = this.userData.createdAt;

    if (this.userData === 0) {
      this.errorToast();
    } else  {
      this.router.navigate(['reward-by-merchant'] , {
        queryParams: { uid: this.uid,
                       customerId: userCodeInput,
                       createdAt: this.createdAt, }
      });
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    await this.navCtrl.navigateForward('/login');
    await this.logOutToast();
  }

  async logOutToast() {
    const toast = await this.toastController.create({
      message: 'Your have successfully logged out.',
      duration: 3000
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'User not found. Please input correct user Id.',
      duration: 3000
    });
    toast.present();
  }


  /*  Need to sort out later

  async QRCodeScan() {
        // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });
      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }
  */

  ngOnInit() {

  }

}
