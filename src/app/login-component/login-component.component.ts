import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  template: `

<!-- Login Form -->
<form (ngSubmit)="login()" class="create-account-form">  
  <div id='login-section'>
    <label for="username">Username</label>
    <input (input)="removeErrorMsg()" [(ngModel)]="username" id="username" type="text" name="username" required />
    <br/>
    <label for="password">Password</label>
    <input (input)="removeErrorMsg()" [(ngModel)]="password" id="password" type="password" name="password" required />
  </div>
  <!-- Reuse same button class -->
  <button type="submit" class="create-account-button">Login</button>
</form>

  `
})

export class LoginComponentComponent {
  username:string = ""
  password:string = ""
  router:Router = inject(Router)
  errorParagraphCreated:boolean = false

  constructor(private authService:AuthService){}

  login(){
    this.authService.login(this.username,this.password).subscribe({
      next: (response:any) => {
        if(response.response === 'Login successful'){
          console.log("Logged in")
          this.router.navigateByUrl("main")
        }
      },
      error: (error) => {
        console.log(error.error)
        if(this.errorParagraphCreated == false){
          let div = document.getElementById("login-section")
          let msg = document.createTextNode(error.error + "!")
          let p = document.createElement('p')
          p.append(msg)
          p.id = "error"
          p.style.color = "red"
          div?.appendChild(p)
          this.errorParagraphCreated = true
        }
      }
    })
  }

  removeErrorMsg(){
    let errorParagraph = document.getElementById("error")

    if(errorParagraph){
      errorParagraph.remove()
      this.errorParagraphCreated = false
    }

    
  }
}
