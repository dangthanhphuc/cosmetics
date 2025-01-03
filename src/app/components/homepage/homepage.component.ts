import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  categories = [
    { name: 'Sữa dưỡng thể', image: 'assets/categories/sua-duong-the.png' },
    { name: 'Dầu gội', image: 'assets/categories/dau-goi.png' },
    { name: 'Mặt nạ', image: 'assets/categories/mat-na.png' },
    { name: 'Nước tẩy trang', image: 'assets/categories/nuoc-tay-trang.png' },
    { name: 'Sữa rửa mặt', image: 'assets/categories/sua-rua-mat.png' },
    { name: 'Trang điểm mặt', image: 'assets/categories/trang-diem-mat.png' },
    { name: 'Trang điểm môi', image: 'assets/categories/trang-diem-moi.png' },
    { name: 'Trang điểm mắt', image: 'assets/categories/trang-diem-vung-mat.png' }
  ];

  
}
