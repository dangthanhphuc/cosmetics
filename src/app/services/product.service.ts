import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { CosmeticResponse } from '../responses/cosmetic.response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly apiBaseUrl = `${environment.apiBaseUrl}/products`;

  constructor(
    private http : HttpClient
  ) { }

  $products = () : Observable<CosmeticResponse[]> => {
    return this.http.get<CosmeticResponse[]>(this.apiBaseUrl);
  }

  $productById = (productId : string) : Observable<CosmeticResponse> => {
    return this.http.get<CosmeticResponse>(`${this.apiBaseUrl}/${productId}`);
  }

}
