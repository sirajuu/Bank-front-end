import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //  success msg

   successMsg:boolean=false
   errormsg:string=''

  loginForm=this.fb.group({ 
     acno:["",[Validators.required,Validators.pattern('[0-9]*')]],
  password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

  constructor(private fb:FormBuilder, private api:ApiService, private loginRouter:Router){

  }

  login(){
    if(this.loginForm.valid){
      let acno =this.loginForm.value.acno
      let password =this.loginForm.value.password


      this.api.login(acno,password)
      .subscribe(
        (result:any)=>{
          // login success
          this.successMsg = true

          // get username from result and store it in localstorage
          localStorage.setItem("currentUser", result.currentUsername)
         // get username from result and store it in localstorage
         localStorage.setItem("currentAcno", result.currentAcno)
         // get token from result and store it in localstorage
         localStorage.setItem("token",result.token)



          //  code to redirect after 2 sec
         setTimeout(() => {
           this.loginRouter.navigateByUrl('dashboard')
         }, 2000);
          // alert(result.message)
        },
        (result:any)=>{
         this.errormsg = result.error.message
        setTimeout(() => {
          this.loginForm.reset(),
          this.errormsg=""
        }, 2000);
        }
      )
      // alert('successfully')
      // console.log(this.login);
      
    }
    
    else{
      alert('Invalid form')
    }
  }

}
