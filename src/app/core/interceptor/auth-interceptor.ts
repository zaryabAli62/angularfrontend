import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  let token = null;
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token');
  }

  // const token = localStorage.getItem('token');

  const authReq = req.clone({
    setHeaders:{
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
  },
  });
  return next(authReq);
};
