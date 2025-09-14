import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink,RouterOutlet],
  template: `
    <nav>
      <a routerLink="create-account">Create Account</a>
      <a routerLink="login">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrl: './home-component.component.css'
})

export class HomeComponentComponent {

}
