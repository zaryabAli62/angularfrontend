import { Component } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService:AuthService,private route:Router){}
  onSignOut() {
    this.authService.logout();
    this.route.navigate(['login'])
  }
}
