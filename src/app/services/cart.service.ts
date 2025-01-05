import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartResponse } from '../responses/cart.response';
import { environment } from '../environments/environment';
import { CartDTO } from '../dtos/cart.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly apiBaseUrl = `${environment.apiBaseUrl}/cart`;

  constructor(
    private http : HttpClient
  ) {}

  $cart = () : Observable<CartResponse[]> => {
    return this.http.get<CartResponse[]>(`${this.apiBaseUrl}`);
  }

  $create = (cartDTO : CartDTO) : Observable<CartResponse> => {
    return this.http.post<CartResponse>(`${this.apiBaseUrl}/create`, cartDTO);
  }

  $update = (cartsDTO : CartDTO[]) : Observable<CartResponse> => {
    return this.http.put<CartResponse>(`${this.apiBaseUrl}/update`, {"carts" : cartsDTO});
  }

  $delete = (cartDTO : CartDTO) : Observable<string> => {
    return this.http.delete<string>(`${this.apiBaseUrl}/delete`, {body : cartDTO});
  }
}
