import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Share } from './share.model';

@Injectable()
export class ShareService {
  selectedShare: Share;
  shares: Share[];
  readonly baseURL = 'http://localhost:3000/shares';

  constructor(private http: HttpClient) { }

  createShare(share : Share) {
    return this.http.post(this.baseURL, share);
  }

  getShareList() {
    return this.http.get(this.baseURL);
  }

  updateShare(share: Share) {
    return this.http.put(this.baseURL + `/${share._id}`, share);
  }

  deleteShare(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`, {responseType: 'text'});
  }

}
