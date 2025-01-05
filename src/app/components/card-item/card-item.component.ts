import { Component, input, OnInit } from '@angular/core';
import { CosmeticResponse } from '../../responses/cosmetic.response';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent implements OnInit{ 
  cosmetic = input.required<CosmeticResponse>();

  constructor(

  ){}

  ngOnInit(): void {
    
  }

}
