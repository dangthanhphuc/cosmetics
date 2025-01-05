import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../dtos/login.dto';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import {RegisterDTO} from '../dtos/register.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiBaseUrl = `${environment.apiBaseUrl}`

  constructor(
    private http : HttpClient
  ) { }

  login$ = (loginDTO : LoginDTO) : Observable<any> => {
    return this.http.post<any>(`${this.apiBaseUrl}/auth/login`, loginDTO);
  }

  register$ = (registerDTO : RegisterDTO) : Observable<any> => {
    return this.http.post<any>(`${this.apiBaseUrl}/auth/register`, registerDTO);
  }

}
