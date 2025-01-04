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

  products = [
    { name: 'Cushion Clio', price: 100000, image: 'assets/products/Cushinon_Clio.png' },
    { name: 'Cushion Klavuu', price: 100000, image: 'assets/products/Cushion_klavuu.png' },
    { name: 'Cushion Laneige', price: 100000, image: 'assets/products/Cushion_Laneige.png' },
    { name: 'Cushion Missha', price: 100000, image: 'assets/products/Cushion_Missha.png' },
    { name: 'Cushion Mistine', price: 100000, image: 'assets/products/Cushion_Mistine.png' },
    { name: 'Kem chống nắng Aestura', price: 100000, image: 'assets/products/KCN_aestura.png' },
    { name: 'Kem chống nắng Anessa', price: 100000, image: 'assets/products/KCN_Anessa.png' },
    { name: 'Kem chống nắng Asialab', price: 100000, image: 'assets/products/KCN_Asialab.png' },
    { name: 'Kem chống nắng Clede Peau', price: 100000, image: 'assets/products/KCN_clede peau.png' },
    { name: 'Kem chống nắng Edally', price: 100000, image: 'assets/products/KCN_Edally.png' },
    { name: 'Kem chống nắng Espoin', price: 100000, image: 'assets/products/KCN_espoin.png' },
    { name: 'Kem chống nắng Innisfree', price: 100000, image: 'assets/products/KCN_Innisfree.png' },
    { name: 'Kem chống nắng Klavuu', price: 100000, image: 'assets/products/KCN_klavuu.png' },
    { name: 'Kem chống nắng Make Prem', price: 100000, image: 'assets/products/KCN_Make Prem.png' },
    { name: 'Kem chống nắng Sunplay', price: 100000, image: 'assets/products/KCN_sunplay.png' },
    { name: 'Kem dưỡng Bioderma', price: 100000, image: 'assets/products/KEM DƯỠNG BIODERMA.png' },
    { name: 'Kem dưỡng Klairs', price: 100000, image: 'assets/products/kemduong_KLAIRS.png' },
    { name: 'Kem dưỡng SVR', price: 100000, image: 'assets/products/kemduong_SVR.png' },
    { name: 'Kem nền CareCella', price: 100000, image: 'assets/products/kemnen_CareCella.png' },
    { name: 'Kem nền Chanel', price: 100000, image: 'assets/products/kemnen_Chanel.png' },
    { name: 'Kem nền Espoir', price: 100000, image: 'assets/products/kemnen_Espoir.png' },
    { name: 'Kem nền Kiko', price: 100000, image: 'assets/products/kemnen_Kiko.png' },
    { name: 'Kem nền Mamonde', price: 100000, image: 'assets/products/kemnen_Mamonde.png' },
    { name: 'Kem nền Maybelline', price: 100000, image: 'assets/products/kemnen_MAYBELLINE.png' },
    { name: 'Kem nền Sulwalsoo', price: 100000, image: 'assets/products/kemnen_Sulwalsoo.png' },
    { name: 'Son 3CE Cloud Lip Tint Immanence', price: 100000, image: 'assets/products/Son_3CECloudLipTintImmanence.png' },
    { name: 'Son Black Rouge Muddish Cushion Velvet', price: 100000, image: 'assets/products/Son_BlackRougeMuddishCushionVelvet.png' },
    { name: 'Son Dior Addict Lip Maximiser', price: 100000, image: 'assets/products/Son_DiorAddictLipMaximiser.png' },
    { name: 'Son Merzy Bite The Beat Mellow Tint', price: 100000, image: 'assets/products/Son_Merzy Bite The Beat Mellow Tint.png' },
    { name: 'Son Romand Blur Fudge Tint', price: 100000, image: 'assets/products/Son_RomandBlurFudgeTint.png' },
    { name: 'Son Zeesea Liquid Matte', price: 100000, image: 'assets/products/Son_ZEESEALIQUIDMATTE.png' },
    { name: 'SRM Simple', price: 100000, image: 'assets/products/SRM_ Simple.png' },
    { name: 'SRM Acnes', price: 100000, image: 'assets/products/SRM_ACNES.png' },
    { name: 'SRM Cetaphil', price: 100000, image: 'assets/products/SRM_CETAPHIL.png' }
  ];

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
}
