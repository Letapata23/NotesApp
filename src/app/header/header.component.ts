import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
  <h1 id="header" style="text-align: left;">{{title}}</h1>
  `,
})
export class HeaderComponent {
  title:string = 'My Notes';

}''
