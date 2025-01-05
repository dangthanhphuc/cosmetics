import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UUID } from 'crypto';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { CosmeticResponse } from '../../responses/cosmetic.response';
import { CartService } from '../../services/cart.service';
import { CartDTO } from '../../dtos/cart.dto';
import { LocalStorageService } from '../../services/local-storage.service';
import { CartResponse } from '../../responses/cart.response';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-cosmetic',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ], 
  templateUrl: './cosmetic.component.html',
  styleUrls: ['./cosmetic.component.scss']
})
export class CosmeticComponent implements OnInit {

  
  id = input.required<UUID>();
  cosmetic!: CosmeticResponse;

  mainImageUrl!: string;

  quantity = 1;;

  constructor(
    private userService : UserService,
    private productService : ProductService,
    private cartService : CartService,
    private localStorageService : LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.productService.$productById(this.id()).subscribe({
      next: (cosmetic : CosmeticResponse) => {
        this.cosmetic = new CosmeticResponse(cosmetic);
        this.mainImageUrl = this.cosmetic.images[0].url; 
      },
      error: (error : any) => {
        console.error('Error:', error);
      }
    });
  }

  addToCart(){
    const cartDTO : CartDTO = new CartDTO({
      user_id : this.localStorageService.get('userId'),
      product_id : this.cosmetic.id,
      quantity : this.quantity
    });
    console.log(this.quantity);
    this.cartService.$create(cartDTO).subscribe({
      next: (cart : CartResponse) => {
        console.log('Add to cart successfully', cart);
      },
      error: (error : any) => {
        console.error('Error:', error);
      }
    });
  }

  changeMainImage(imageUrl: string): void {
    this.mainImageUrl = imageUrl;
  }

}
