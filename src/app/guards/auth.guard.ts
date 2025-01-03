import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {

  constructor(
      private tokenService : TokenService,
      private router : Router
  ){
  }
  
  canActivate(next: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {

      if(this.tokenService.isValid()) {
        this.router.navigate(['/homepage']);
        return true;
      }
      else {
          // Nếu không authenticated, bạn có thể redirect hoặc trả về một UrlTree khác.
          // Ví dụ trả về trang login:
          this.router.navigate(['/auth/login']);
          return false;
      }
      
  }

}

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  return inject(AuthGuard).canActivate(childRoute, state);
};
