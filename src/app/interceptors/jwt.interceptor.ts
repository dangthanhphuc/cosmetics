import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService).get();
  if(token) {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(reqWithHeader);
  }
  return next(req);
};
