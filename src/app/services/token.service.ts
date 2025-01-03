import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  set(token : string) {
    localStorage.setItem('token', token);
  }

  get() : string | null {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() : boolean {
    const token = this.get();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.iat <= currentTime && payload.exp > currentTime &&(payload.iss==="") ? true : false;
      }
    }
    return false;
  }

  payload(token : any) {
    const payloadEncode = token?.split('.')[1];
    return this.decode(payloadEncode);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload))
  }
}
