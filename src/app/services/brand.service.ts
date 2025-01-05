import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BrandResponse } from '../responses/brand.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly apiBaseUrl = `${environment.apiBaseUrl}/brands`;  // Replace with your API endpoint

  constructor(
    private http: HttpClient
  ) { }

  $brands = () : Observable<BrandResponse[]> => {
    return this.http.get<BrandResponse[]>(`${this.apiBaseUrl}`);
  }
}
