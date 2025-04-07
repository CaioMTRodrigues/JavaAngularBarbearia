// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // Clone a requisição para adicionar headers
  const authReq = addAuthToken(req, platformId);

  // Envie a requisição modificada
  return next(authReq);
};

function addAuthToken(request: HttpRequest<any>, platformId: Object): HttpRequest<any> {
  // Only access localStorage if we're in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('auth_token');

    if (!token || !request.url.includes(environment.apiUrl)) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return request;
}
