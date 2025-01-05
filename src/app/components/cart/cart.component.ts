import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartResponse } from '../../responses/cart.response';
import { UUID } from 'node:crypto';
import { CartDTO } from '../../dtos/cart.dto';
import { TokenService } from '../../services/token.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy{

  carts!: CartResponse[];
  cartsChangeQuantity : CartDTO[] = [];

  indexSelected : number[] = [];
  totalPrice : number = 0;

  constructor( 
    private cartService: CartService,
    private router : Router,
    private localStorageService : LocalStorageService
  ){
    
  }
  ngOnDestroy(): void {
    if(this.cartsChangeQuantity.length!=0)
      this.onUpdate();
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.$cart().subscribe({
      next: (carts : CartResponse[]) => {
        this.carts = carts.map(cart => new CartResponse(cart));
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  onUpdate() {
    debugger
    if(this.cartsChangeQuantity.length != 0)
      this.updateCarts(this.cartsChangeQuantity)
  }

  updateCarts(cartsDTO : CartDTO[]) {
    this.cartService.$update(cartsDTO).subscribe({
      next: (response : any) => {
        console.log('Update cart successfully', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }

  onDelete(productId : UUID, index : number) {
    const cartDTO : CartDTO = new CartDTO({
      user_id: this.localStorageService.get("userId"),
      product_id: productId
    });
    this.cartService.$delete(cartDTO).subscribe({
      next: (response : string) => {
        this.carts = this.carts.filter(cart => cart.product.id != productId);
        if(this.indexSelected.includes(index))
          this.calculateTotalPrice();    
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  onQuantityChange(cart: CartResponse) {
    const cartDTO = new CartDTO({
      product_id: cart.product.id,
      user_id: this.localStorageService.get("userId"),
      quantity: cart.quantity
    });

    const cartExitsIndex = this.cartsChangeQuantity.findIndex(cart => cart.product_id == cartDTO.product_id && cart.user_id == cartDTO.user_id);
    if(cartExitsIndex == -1) {
      this.cartsChangeQuantity.push(cartDTO);
    } else {
      this.cartsChangeQuantity[cartExitsIndex].quantity = cartDTO.quantity;
    }

  }

  updateQuantity(cart: CartResponse, index: number, change: number) {
    this.carts[index].quantity += change;
    if(this.indexSelected.includes(index))
      this.calculateTotalPrice();
    this.onQuantityChange(cart);
  }


  onSelected(index : number) {
    if(this.indexSelected.includes(index)){
      this.indexSelected.splice(this.indexSelected.indexOf(index), 1);
    } else {
      this.indexSelected.push(index);
    }
    this.calculateTotalPrice();    
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    this.indexSelected.forEach(index => {
      this.totalPrice += this.carts[index].product.price * this.carts[index].quantity;
    })
  }
}
