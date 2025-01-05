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
  getImageForCategory(name : string) {
    switch (name) {
      case "Son":
        return "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg";
      case "Kem dưỡng":
        return "https://media.hcdn.vn/catalog/category/c1897-duong-the_img_120x120_17b03c_fit_center.jpg";
      case "Nước tẩy trang":
        return "https://media.hcdn.vn/catalog/category/c52-trang-diem-mat_img_120x120_17b03c_fit_center.jpg";
      case "Sữa dưỡng thể":
        return "https://media.hcdn.vn/catalog/category/26_1_img_120x120_17b03c_fit_center.jpg";
      case "Phấn":
        return "https://media.hcdn.vn/catalog/category/30_1_img_120x120_17b03c_fit_center.jpg";
      case "Kem nền":
        return "https://media.hcdn.vn/catalog/category/1901_1_img_120x120_17b03c_fit_center.jpg";
      case "Sữa rửa mặt":
        return "https://media.hcdn.vn/catalog/category/19_3_img_120x120_17b03c_fit_center.jpg";
      case "Bông tẩy trang":
        return "https://media.hcdn.vn/catalog/category/48_1_img_120x120_17b03c_fit_center.jpg";
      case "Mặt nạ":
        return "https://media.hcdn.vn/catalog/category/30_1_img_120x120_17b03c_fit_center.jpg";
      case "Kem chống nắng":
        return "https://media.hcdn.vn/catalog/category/11_1_img_120x120_17b03c_fit_center.jpg";
      case "Dầu gội đầu":
        return "https://media.hcdn.vn/catalog/category/2144_img_120x120_17b03c_fit_center.jpg";
      case "Cushion":
        return "https://media.hcdn.vn/catalog/category/102_1_img_120x120_17b03c_fit_center.jpg";
    }
    return "";
  }

}
