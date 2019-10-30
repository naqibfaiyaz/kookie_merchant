import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClientService } from '../http-client.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reward-by-merchant',
  templateUrl: './reward-by-merchant.page.html',
  styleUrls: ['./reward-by-merchant.page.scss'],
})
export class RewardByMerchantPage implements OnInit {

  customerId = this.route.snapshot.queryParamMap.get('customerId');
  createdAt = this.route.snapshot.queryParamMap.get('createdAt');
  merchantUid = this.afAuth.auth.currentUser.uid;

  // userUid = this.route.snapshot.queryParamMap.get('uid');    // Do not need right now //
  // merchantUid = 'clw8Q9TWtJeRBVz4WigFFBhpxwM2';
  // merchantUid = 'pRKkWxE9wvPSh1esl3mRi5eY5O52';
  // customerId = '24254588';
  // createdAt = 'Jun 2019';

  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = this.customerId;   // For Showing QR Code for specific uid

  merchantData = null;
  pointType = null;
  merchantCode = null;
  merchantOfferings = null;
  rewardResponse = null;
  rewardValue = null;
  foodOrder = null;
  orderedFood = null;
  showContent = false;
  star = false;
  points = false;
  firstOfferSelected = false;
  secondOfferSelected = false;
  thirdOfferSelected = false;
  forthOfferSelected = false;
  fifthOfferSelected = false;
  sixthOfferSelected = false;
  selectedOneStar = false;
  selectedTwoStar = false;
  selectedThreeStar = false;
  selectedFourStar = false;
  selectedFiveStar = false;
  selectedOrders = [];

  constructor(
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    public httpClientService: HttpClientService,
    private router: Router,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
  ) { }

  async getMerchantByEmail() {

    let loading = await this.loadingCtrl.create({
      message: 'Please Wait',
      cssClass: 'custom-loading',
      spinner: 'circles',
      keyboardClose: true,
    });
    await loading.present();
    this.merchantData = await this.httpClientService.getMerchantData(this.merchantUid);
    this.pointType = this.merchantData.pointType;
    this.merchantCode = this.merchantData.merchantCode;
    this.merchantOfferings = Object.values(this.merchantData.offers);
    // this.merchantOfferings = ['food', 'drink', 'coffee'];
    if (this.pointType === 'points') {
      this.points = true;
    } else if (this.pointType === 'star') {
      this.star = true;
    }
    this.showContent = true;
    loading.dismiss();
  }

  orderFood() {
    if (this.firstOfferSelected === true) {
      this.selectedOrders.push(this.merchantOfferings[0]);
    }
    if (this.secondOfferSelected === true) {
      this.selectedOrders.push(this.merchantOfferings[1]);
    }
    if (this.thirdOfferSelected === true) {
      this.selectedOrders.push(this.merchantOfferings[2]);
    }
    if (this.forthOfferSelected === true) {
      this.selectedOrders.push(this.merchantOfferings[3]);
    }
    if (this.fifthOfferSelected === true) {
      this.selectedOrders.push(this.merchantOfferings[4]);
    }
    if (this.sixthOfferSelected === true) {
      this.selectedOrders.push(this.merchantOfferings[5]);
    }
    this.foodOrder = this.selectedOrders.join(',');
    this.selectedOrders = [];
    return this.foodOrder;
  }

  async starRewardToUser() {
    this.orderedFood = this.orderFood();
    if (this.orderedFood === '' || this.rewardValue === null) {
      this.messageToast('Please input reward amount and order.');
    } else {
      this.rewardResponse = await this.httpClientService.postRewardToUser(
        this.customerId, this.merchantUid, this.rewardValue, this.orderedFood
        );
      this.showMessageAndNavigate(this.rewardResponse);
    }
  }

  async pointRewardToUser(rewardPointValue: any) {
    this.orderedFood = this.orderFood();
    if (this.orderedFood === '' || rewardPointValue === '') {
      this.messageToast('Please input reward amount and order.');
    } else {
    this.rewardResponse = await this.httpClientService.postRewardToUser(
      this.customerId, this.merchantUid, rewardPointValue, this.orderedFood
      );
    this.showMessageAndNavigate(this.rewardResponse);
    }
  }

  async showMessageAndNavigate(rewardResponse: any) {
    if (rewardResponse === 1) {
      this.router.navigate(['dashboard']);
      this.messageToast('Reward Successful !!');
    } else {
      this.messageToast(this.rewardResponse);
    }
  }

  async messageToast(messageText: any) {
    const toast = await this.toastController.create({
      message: messageText,
      duration: 3000
    });
    toast.present();
  }

  toggleOrder(order: string, orderNumber: number) {
    if (orderNumber === 0) {
      if (this.firstOfferSelected === false) {
        this.firstOfferSelected = true;
      } else if (this.firstOfferSelected === true) {
        this.firstOfferSelected = false;
      }
    }
    if (orderNumber === 1) {
      if (this.secondOfferSelected === false) {
        this.secondOfferSelected = true;
      } else if (this.secondOfferSelected === true) {
        this.secondOfferSelected = false;
      }
    }
    if (orderNumber === 2) {
      if (this.thirdOfferSelected === false) {
        this.thirdOfferSelected = true;
      } else if (this.thirdOfferSelected === true) {
        this.thirdOfferSelected = false;
      }
    }
    if (orderNumber === 3) {
      if (this.forthOfferSelected === false) {
        this.forthOfferSelected = true;
      } else if (this.forthOfferSelected === true) {
        this.forthOfferSelected = false;
      }
    }
    if (orderNumber === 4) {
      if (this.fifthOfferSelected === false) {
        this.fifthOfferSelected = true;
      } else if (this.fifthOfferSelected === true) {
        this.fifthOfferSelected = false;
      }
    }
    if (orderNumber === 5) {
      if (this.sixthOfferSelected === false) {
        this.sixthOfferSelected = true;
      } else if (this.sixthOfferSelected === true) {
        this.sixthOfferSelected = false;
      }
    }
  }
  toggleOneStar() {
    if (this.selectedOneStar === false) {
      this.selectedOneStar = true;
      this.selectedTwoStar = false;
      this.selectedThreeStar = false;
      this.selectedFourStar = false;
      this.selectedFiveStar = false;
      this.rewardValue = 1;
    } else if (this.selectedOneStar === true) {
      this.selectedOneStar = false;
      this.selectedTwoStar = false;
      this.selectedThreeStar = false;
      this.selectedFourStar = false;
      this.selectedFiveStar = false;
      this.rewardValue = null;
    }
  }
  toggleTwoStar() {
    if (this.selectedTwoStar === false) {
      this.selectedOneStar = true;
      this.selectedTwoStar = true;
      this.selectedThreeStar = false;
      this.selectedFourStar = false;
      this.selectedFiveStar = false;
      this.rewardValue = 2;
    } else if (this.selectedTwoStar === true) {
      this.selectedOneStar = false;
      this.selectedTwoStar = false;
      this.selectedThreeStar = false;
      this.selectedFourStar = false;
      this.selectedFiveStar = false;
      this.rewardValue = null;
    }
  }
  toggleThreeStar() {
    if (this.selectedThreeStar === false) {
      this.selectedOneStar = true;
      this.selectedTwoStar = true;
      this.selectedThreeStar = true;
      this.selectedFourStar = false;
      this.selectedFiveStar = false;
      this.rewardValue = 3;
    } else if (this.selectedThreeStar === true) {
      this.selectedOneStar = false;
      this.selectedTwoStar = false;
      this.selectedThreeStar = false;
      this.selectedFourStar = false;
      this.selectedFiveStar = false;
      this.rewardValue = null;
    }
  }
  toggleFourStar() {
    if (this.selectedFourStar === false) {
      this.selectedOneStar = true;
      this.selectedTwoStar = true;
      this.selectedThreeStar = true;
      this.selectedFourStar = true;
      this.selectedFiveStar = false;
      this.rewardValue = 4;
    } else if (this.selectedFourStar === true) {
      this.selectedOneStar = false;
      this.selectedTwoStar = false;
      this.selectedThreeStar = false;
      this.selectedFourStar = false;
      this.selectedFiveStar = false;
      this.rewardValue = null;
    }
  }
  toggleFiveStar() {
    if (this.selectedFiveStar === false) {
      this.selectedOneStar = true;
      this.selectedTwoStar = true;
      this.selectedThreeStar = true;
      this.selectedFourStar = true;
      this.selectedFiveStar = true;
      this.rewardValue = 5;
    } else if (this.selectedFiveStar === true) {
      this.selectedOneStar = false;
      this.selectedTwoStar = false;
      this.selectedThreeStar = false;
      this.selectedFourStar = false;
      this.selectedFiveStar = false;
      this.rewardValue = null;
    }
  }

  ngOnInit() {

  }

  async ionViewWillEnter() {

    await this.getMerchantByEmail();

  }

}


