import { Router } from "@angular/router"
import { inject } from "@angular/core"


export const authGuard  = () =>{
  const router = inject(Router);
  let token = localStorage.getItem('token')
  if ( token ){
    return true;
  }else {
    router.navigate(['/login']);
    return false;
  }

}