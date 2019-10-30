import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-qr-code-scan',
  templateUrl: './qr-code-scan.page.html',
  styleUrls: ['./qr-code-scan.page.scss'],
})
export class QrCodeScanPage implements OnInit {

  userData = null;
  createdAt = null;

  constructor(
    private qrScanner: QRScanner,
    public afAuth: AngularFireAuth,
    public httpClientService: HttpClientService,
    private router: Router,
    private navCtrl: NavController,
    public toastController: ToastController,
  ) { }

  async QRCodeScan() {

    await this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qrScanner.show();
        document.getElementById('scan-area').style.opacity = '0';
        document.getElementById('show-view').style.opacity = '1';
        this.qrScanner.scan().subscribe((userCode: string) => {
          this.getUserByCode(userCode);
        });
      }
    })
    .catch((e: any) => console.log('Error: ', e));
  }

  async getUserByCode(userCodeInput: string) {
    try {
      if (userCodeInput) {
        this.userData = await this.httpClientService.getUserData(userCodeInput);
        this.createdAt = this.userData.createdAt;
        if (this.userData === 0) {
          this.router.navigate(['dashboard']);
          this.messageToast('Customer not found. Please scan correct QR code.');
        } else  {
          this.router.navigate(['reward-by-merchant'] , {
            queryParams: { customerId: userCodeInput, createdAt: this.createdAt, }
          });
        }
      } else {
        this.router.navigate(['dashboard']);
        this.messageToast('Customer not found. Please scan correct QR code.');
      }
    } catch (e) {
      this.router.navigate(['dashboard']);
      this.messageToast(e.statusText + '. Please try again.');
    }
  }

  async messageToast(messageBody: string) {
    const toast = await this.toastController.create({
      message: messageBody,
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
    this.QRCodeScan();
  }

}
