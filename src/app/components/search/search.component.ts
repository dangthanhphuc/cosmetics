import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CosmeticResponse } from '../../responses/cosmetic.response';
import { CosmeticComponent } from '../cosmetic/cosmetic.component';
import { CardItemComponent } from '../card-item/card-item.component';
import { BrandService } from '../../services/brand.service';
import { BrandResponse } from '../../responses/brand.response';
import { CategoryService } from '../../services/category.service';
import { CategoryResponse } from '../../responses/category.response';
import { Origin } from '../../enums/origin.enum';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CardItemComponent
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  minPrice: number = 0;
  maxPrice: number = 0;

  categories : CategoryResponse[] = [];
  origins = ['VN','CN','JP','US','TW','KR'];

  products: CosmeticResponse[] = [];
  productsFilter: CosmeticResponse[] = [];
  brands: BrandResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private brandService : BrandService,
    private productService: ProductService,
    private categoryService : CategoryService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
    const searchTerm = this.route.snapshot.queryParams['name'];
    this.getProducts(searchTerm);
  
  }

  applyPriceFilter() {
    if (this.minPrice > 0 && this.maxPrice > this.minPrice) {
      this.applyFilters();
      this.productsFilter = this.products.filter(product => product.price >= this.minPrice && product.price <= this.maxPrice);
    }
  }

  selectedCategories : string[] = [];
  selectedBrands : string[] = [];
  selectedOrigin : string[] = [];

  onChangeFilter(event : any, id : string, type : 'brand' | 'category' | 'origin') {
    if (event.target.checked) { 
      if(type == 'brand') { 
        this.selectedBrands.push(id);
      } else if(type == 'category') {
        this.selectedCategories.push(id);
      } else if(type == 'origin') {
        this.selectedOrigin.push(id);
      }
    } else {
      let index = -1;
      if(type == 'brand') {  
        index = this.selectedBrands.indexOf(id);
        this.selectedBrands.splice(index, 1);
      } else if(type == 'category') {
        index = this.selectedCategories.indexOf(id);
        this.selectedCategories.splice(index, 1);
      } else if(type == 'origin') {
        index = this.selectedOrigin.indexOf(id);
        this.selectedOrigin.splice(index, 1);
      }

    }

    console.log(this.selectedBrands);
    console.log(this.selectedCategories);
    console.log(this.selectedOrigin);
    this.applyFilters();
  }

  applyFilters() {
    debugger
    this.productsFilter = this.products.filter((product : CosmeticResponse) => { 
      const categoryMatch = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category.id);
      const brandMatch = this.selectedBrands.length === 0 || this.selectedBrands.includes(product.brand.id);
      const originMatch = this.selectedOrigin.length === 0 || this.selectedOrigin.includes(product.origin.toString());
  
      return categoryMatch && brandMatch && originMatch;

    });
  }


  searchItem(search: string) {}

  getProducts(searchTerm : string) {
    this.productService.$products().subscribe({
      next: (products: CosmeticResponse[]) => {
        this.products = products.map(
          (product) => new CosmeticResponse(product)
        );
        this.productsFilter = this.products.filter((product : CosmeticResponse) => {
          if (!searchTerm)
            return true;
          const searchLower = searchTerm.toLowerCase();
          return (
            product.name.toLowerCase().includes(searchLower) ||
            (product.description && product.description.toLowerCase().includes(searchLower))
          );
        })
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getBrands() {
    this.brandService.$brands().subscribe({
      next: (brands: BrandResponse[]) => {
        this.brands = brands;
      },
      error: (error: any) => {
        console.error(error);
      },
    }); 
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
