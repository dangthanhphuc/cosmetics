import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(), // Liên kết dữ liệu route với Input Binding
      withRouterConfig({
        paramsInheritanceStrategy: 'always' // Cho phép binding dữ liệu của router từ component cha xuống component con có thế sửu dụng được
      })
    ),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor])
    )
  ]
};
