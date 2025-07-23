import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <h1>{{title}}</h1>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title:string = 'My Notes';

}
