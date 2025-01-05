import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private localStorageService : LocalStorageService
  ) { }

  set(token : string) {
    this.localStorageService.save('token', token);
  }

  get() : string | null {
    return this.localStorageService.get('token');
  }

  remove() {
    this.localStorageService.remove('token');
  }

  isValid() : boolean {
    const token = this.get();
    if(token) {
      const payload = this.payload();
      if(payload) {
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.iat <= currentTime && payload.exp > currentTime ? true : false;
      }
    }
    return false;
  }

  isAdmin() {
    const token = this.get();
    if(token) {
      const payload = this.payload(); 
      if(payload) {
        return payload.role == 'ADMIN';
      }
    }
    return false;
  }


  payload() {
    const payloadEncode = this.get()?.split('.')[1];
    return this.decode(payloadEncode);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload))
  }
}
