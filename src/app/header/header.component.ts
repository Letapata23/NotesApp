import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <h1 id="header">{{title}}</h1>
  `,
  styleUrl: '../../styles.css'
})
export class HeaderComponent {
  title:string = 'My Notes';

}''
