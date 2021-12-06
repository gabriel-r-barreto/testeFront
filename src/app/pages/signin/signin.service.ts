import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  url: string = `${environment.apiUrl}/api`;

  private storage: Storage;

  constructor() { 
    this.storage = window.localStorage;
  }

  public saveUser(key: string, value: string) {
    if (this.storage) {
      this.storage.setItem(key, value);
      return true;
    }
    return false;
  }


  get(key: string): any {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key));
    }
    return null;
  }
}
