import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


@Component({
  selector: 'app-main',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  router:Router = inject(Router)

  constructor(private authService:AuthService){}

  logout(){
    this.authService.logout();

    // Navigate back to the authentication component
    this.router.navigateByUrl("")
  }

  goToAccountSettings(){
    
  }
}
