import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products = [
    { id: 1, name: 'Sản phẩm 1',brand:'Klair', description:'Chất lượng cao', category:'Son', origin:'Trung Quốc', price: 500000 },
    { id: 2, name: 'Sản phẩm 2',brand:'Klair', description:'Chất lượng cao', category:'Son', origin:'Trung Quốc', price: 300000 },
    { id: 3, name: 'Sản phẩm 3',brand:'Klair', description:'Chất lượng cao', category:'Son', origin:'Trung Quốc', price: 300000}
  ];


}
