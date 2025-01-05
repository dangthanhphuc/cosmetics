import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryResponse } from '../responses/category.response';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiBaseUrl = `${environment.apiBaseUrl}/categories`; 

  constructor(
    private http : HttpClient
  ) { }

  $categories = () : Observable<CategoryResponse[]> => {
    return this.http.get<CategoryResponse[]>(`${this.apiBaseUrl}`);
  }
}
