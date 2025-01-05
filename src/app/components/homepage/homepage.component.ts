import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { CosmeticResponse } from '../../responses/cosmetic.response';
import { CardItemComponent } from '../card-item/card-item.component';
import { CategoryService } from '../../services/category.service';
import { CategoryResponse } from '../../responses/category.response';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    CardItemComponent,
    RouterModule
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  
  categories : CategoryResponse[] = [];
  products : CosmeticResponse[] = [];

  constructor(
    private productService : ProductService,
    private categoryService : CategoryService
  ) {

  }

  currentPage = 1;
  itemsPerPage = 12;

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.products.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productService.$products().subscribe({
      next: (products : CosmeticResponse[]) => {
        this.products = products.map(product => new CosmeticResponse(product));      },
      error: (error : any) => {
        console.error(error);
      }
    }) 
  }

  getCategories() {
    this.categoryService.$categories().subscribe({
      next: (categories : CategoryResponse[]) => {
        this.categories = categories;
      },
      error: (error : any) => {
        console.error(error);
      }
    });
  }


}
