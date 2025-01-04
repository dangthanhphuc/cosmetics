import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-cosmetic',
  standalone: true,
  imports: [CommonModule], // Thêm CommonModule vào đây
  templateUrl: './cosmetic.component.html',
  styleUrls: ['./cosmetic.component.scss']
})
export class CosmeticComponent {
  mainImage: string = 'https://via.placeholder.com/350';
  images: string[] = [
    'https://hasaki.vn/images/graphics/img_quality_2.png',
    'https://media.hcdn.vn/hsk/icons/img_quality_44.png',
    'https://via.placeholder.com/150/FF0000',
    'https://via.placeholder.com/150/00FF00'
  ];

  changeMainImage(image: string): void {
    this.mainImage = image;
  }
}
