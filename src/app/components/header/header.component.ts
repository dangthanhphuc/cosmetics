import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  searchTerm : string = "";

  isLoggedIn: boolean = inject(TokenService).isValid();;

  constructor(
    private router: Router,
    private tokenService : TokenService,
    private localStorageService : LocalStorageService
  ) {

  }
  ngOnInit(): void {
   
  }

  onSearch() {
    if (this.searchTerm) {
      this.router.navigate(['/search'], { queryParams: { name: this.searchTerm } });
      this.searchTerm = "";
    }
  }

  onLogout() {
    this.tokenService.remove();
    this.localStorageService.remove('userId');
    this.router.navigate(['/auth/login']);
  }

 
}
