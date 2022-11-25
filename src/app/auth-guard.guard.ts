import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private AuthGuardService:AuthGuardService,private router:Router){}
    
  canActivate():boolean{
   
      if(!this.AuthGuardService.getToken()){
        Swal.fire({
          icon:'error',
          title:'Not Authorized',
          text:'You are not Loggedin. First Login with your credentials!'
        })
  
        this.router.navigate(['/login-form']);
      }
      
        return this.AuthGuardService.getToken();
  
  
  }
  
}
