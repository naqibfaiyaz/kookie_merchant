import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClientService } from '../http-client.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reward-by-merchant',
  templateUrl: './reward-by-merchant.page.html',
  styleUrls: ['./reward-by-merchant.page.scss'],
})
export class RewardByMerchantPage implements OnInit {
 
  userUid = this.route.snapshot.queryParamMap.get('uid');
  customerId = this.route.snapshot.queryParamMap.get('customerId');
  createdAt = this.route.snapshot.queryParamMap.get('createdAt');
 
  merchantUid = this.afAuth.auth.currentUser.uid;
  // merchantUid = 'clw8Q9TWtJeRBVz4WigFFBhpxwM2';

  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = this.userUid;   // For Showing QR Code for specific uid

  merchantData = null;
  pointType = null;
  merchantCode = null;
  merchantOfferings = null;
  userData = null;
  userCode = null;
  rewardResponse = null;
  selectedOneStar = false;
  selectedTwoStar = false;
  selectedThreeStar = false;
  selectedFourStar = false;
  selectedFiveStar = false;
  drinkSelected = false;
  foodSelected = false;
  coffeeSelected = false;
  orderName = null;
  rewardValue = null;
  star = false;
  points = false;
  userDd = null;
  order1 = null;
  order2 = null;
  userDatt = null;

  constructor(
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth, 
    public httpClientService: HttpClientService,
    private router: Router,
    private navCtrl: NavController,
    public toastController: ToastController,
  ) { }

  async getMerchantByEmail() {
    this.merchantData = await this.httpClientService.getMerchantData(this.merchantUid);
    this.pointType = this.merchantData.pointType;
    this.merchantCode = this.merchantData.merchantCode;
    this.merchantOfferings = Object.values(this.merchantData.offers);
    if (this.pointType === 'points') {
      this.points = true;
    } else if (this.pointType === 'star') {
      this.star = true;
    }
  }

  async starRewardToUser() {

    this.rewardResponse = await this.httpClientService.postRewardToUser(this.userUid, this.merchantUid, this.rewardValue);
    this.showErrorAndNavigate(this.rewardResponse);
    
  }

  async pointRewardToUser(rewardPointValue: number) {

    this.rewardResponse = await this.httpClientService.postRewardToUser(this.userUid, this.merchantUid, rewardPointValue);
    this.showErrorAndNavigate(this.rewardResponse);
    
  }

  async showErrorAndNavigate(rewardResponse: any) {
    if (rewardResponse === 1) {
      this.router.navigate(['dashboard']);
      this.messageToast('Reward Successful !');
    } else {
      console.log(this.rewardResponse);
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


  toggleOrder(order: string) {
    this.orderName = order;
    if (this.orderName === 'drink') {
      if (this.drinkSelected === false) {
        this.drinkSelected = true;
        this.foodSelected = false;
        this.coffeeSelected = false;
      } else if (this.drinkSelected === true) {
        this.drinkSelected = false;
        this.orderName = null;
      }
    } else if (this.orderName === 'food') {
      if (this.foodSelected === false) {
        this.drinkSelected = false;
        this.foodSelected = true;
        this.coffeeSelected = false;
      } else if (this.foodSelected === true) {
        this.foodSelected = false;
        this.orderName = null;
      } 
    } else if (this.orderName === 'coffee') {
      if (this.coffeeSelected === false) {
        this.drinkSelected = false;
        this.foodSelected = false;
        this.coffeeSelected = true;
      } else if (this.coffeeSelected === true) {
        this.coffeeSelected = false;
        this.orderName = null;
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


