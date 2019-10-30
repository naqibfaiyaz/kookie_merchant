import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  backendServerUrl = 'http://127.0.0.1:8002/api/merchant/';
  userCode = null;
  userData = null;
  merchantData = null;
  reward = null;

  // token = await this.afAuth.auth.currentUser.getIdToken(true);   // Will use after firbase authentication //
  token = 'ThisIsSomeDummyToken';

  header = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

  constructor(
    private http: HttpClient,
    ) { }

  async getUserData(userCode: any) {
    this.userData = await this.http.get(this.backendServerUrl + 'getUserData/' + userCode, { headers: this.header }).toPromise();
    return this.userData;
  }

  async getMerchantData(merchantUid: any) {
    this.merchantData = await this.http.get(this.backendServerUrl + 'getMerchantData/' + merchantUid, { headers: this.header }).toPromise();
    return this.merchantData;
  }

  async postRewardToUser(customerId: any, merchantUid: any, rewardAmount: number, orderedFood: any) {
    this.reward = await this.http.post(
      this.backendServerUrl + 'postRewardToUser',
      { userCode: customerId,
        merchantUid: merchantUid,
        rewardAmount: rewardAmount,
        foodType: orderedFood,
      },
      { headers: this.header }
      ).toPromise();
    return this.reward;
  }

}
