import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

 registerForm=this.fb.group({
  username:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  acno:["",[Validators.required,Validators.pattern('[0-9]*')]],
  password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  cpassword:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
 })
registerStatus: any;

constructor(private fb:FormBuilder,private api:ApiService, private registerRouter:Router){

}

// register
register(){

    let uname=this.registerForm.value.username
    let acno=this.registerForm.value.acno
    let password=this.registerForm.value.password
    let cpswd=this.registerForm.value.cpassword
    if(this.registerForm.valid){
      // checking confirm password match
    if(password==cpswd){
      // call register of apiservice
       this.api.register(acno,uname,password)
       .subscribe(
        // 200 response code
        (result:any)=>{
        // alert(result.message);
           this.registerStatus = true
           setTimeout(() => {
               // redirect to login page  after 5 sec-navigateByUrl('')
        // navigateBy url()it from Router class
            this.registerRouter.navigateByUrl('')
           }, 3000);
     
       },
      //  400 response code
      (result:any)=>{
        alert(result.error.message)
        // reset the value of input field
        this.registerForm.reset()
      }
       )
    }
    else{
      alert('invalid form')
    }
  
  }
  else{
    alert('Invalid Form')
  }



  // console.log(this.registerForm.value.username);
  
}

}
