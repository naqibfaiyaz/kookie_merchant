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
    // tslint:disable-next-line: max-line-length
    this.userData = await this.http.get(this.backendServerUrl + 'getUserData/' + userCode, { headers: this.header }).toPromise();
    return this.userData;
  }

  async getMerchantData(merchantUid: any) {
    // tslint:disable-next-line: max-line-length
    this.merchantData = await this.http.get(this.backendServerUrl + 'getMerchantData/' + merchantUid, { headers: this.header }).toPromise();
    return this.merchantData;
  }

  async postRewardToUser(userUid: any, merchantUid: any, rewardAmount: number) {
    // tslint:disable-next-line: max-line-length
    this.reward = await this.http.post(
      this.backendServerUrl + 'postRewardToUser',
      { userUid: userUid,
        merchantUid: merchantUid,
        rewardAmount: rewardAmount,
      },
      { headers: this.header }
      ).toPromise();

    return this.reward;
  }


}
