import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountDto } from '../DTO/account-dto';
import { CreateAccountService } from '../create-account.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-create-account-component',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="createAccount()" class="create-account-form">
    <div id="input-div">
      <label for="username">Username</label>
      <input (input) = "removeInputErrorMsg()" [(ngModel)]="username" id="username" type="text" name="username" required />

      <label for="password">Password</label>
      <input [(ngModel)]="password" id="password" type="password" name="password" required />
    </div>
    <button type="submit" id="create-account-button">Create Account</button>
    </form>

  `,
  styleUrl: './create-account-component.component.css'
})

export class CreateAccountComponentComponent {
  username:string = ""
  password:string = ""
  router:Router = inject(Router)
  errorParagraphCreated:boolean = false;

  constructor(private createAccountService:CreateAccountService){}

  createAccount(){

    var newAccount:AccountDto = {
      username:this.username,
      password:this.password
    }

    this.createAccountService.createAccount(newAccount).subscribe({
      next: (account) => {
        // Navigate to the notes-list component
        this.router.navigateByUrl("login")
      },
      error: (error) => {
        if(error.status === 409){
          console.log(error.error)
          
          if(this.errorParagraphCreated == false){
            let errorMsg = document.createTextNode(error.error + "!")
            let errorParagraph = document.createElement("p")
            errorParagraph.id = "error"
            errorParagraph.style.color = "red"
            errorParagraph.append(errorMsg)

            let inputDiv = document.getElementById("input-div")
            inputDiv?.appendChild(errorParagraph)
            this.errorParagraphCreated = true
          }
        }else{
          console.log("Unexpected error:", error.error)
        }
      }
    })
  }

  removeInputErrorMsg(){
    let paragraph = document.getElementById("error")
    paragraph?.remove()
    this.errorParagraphCreated = false
  }

  
}
