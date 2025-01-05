import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule], // Thêm CommonModule vào đây
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products = [
    { id: 1, name: 'Sản phẩm 1', price: 500000 },
    { id: 2, name: 'Sản phẩm 2', price: 300000 },
    { id: 3, name: 'Sản phẩm 3', price: 300000}
  ];

  addProduct() {
    
  }

  viewProduct(productId: number) {
    
  }

  editProduct(productId: number) {
    
  }

  deleteProduct(productId: number) {
    
  }
}
