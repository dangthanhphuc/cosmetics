import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule], // Thêm CommonModule và FormsModule
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  minPrice: number | null = null;
  maxPrice: number | null = null;
  categories = ['Sữa rửa mặt', 'Nước tẩy trang', 'Sữa tắm', 'Mặt nạ', 'Dầu gội', 'Son'];
  brands = ['Senka', 'Cocoon', 'L`Oreal', 'Garnier'];
  origins = ['USA', 'Korea', 'Japan', 'France'];

  applyPriceFilter() {
    if (this.minPrice !== null && this.maxPrice !== null) {
      console.log(`Lọc giá từ ${this.minPrice} tới ${this.maxPrice}`);
    }
  }
}
