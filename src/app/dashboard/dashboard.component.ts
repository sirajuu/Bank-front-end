import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapse: boolean = true
  currentUser: string = ""
  userBalance: number = 0
  currentAcno: string = ""
  fundTransferSuccessMsg: string = ""
  fundTransferErrorMsg: string = ""
  logoutStatus: boolean = false
  deleteConfirmStatus: boolean = false
  deleteAcno: any
  deleteMsg:any=""

  fundTransferForm = this.fb.group({
    creditAcno: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    amount: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb: FormBuilder, private api: ApiService, private dashboarRouter: Router) { }


  ngOnInit() {

    // check user logined or not
    if (!localStorage.getItem('token')) {
      alert('Please Login')
      // redirect to login page
      this.dashboarRouter.navigateByUrl('')
    }



    // get currentUser from local storage
    this.currentUser = localStorage.getItem("currentUser") || ''
    // get currentAcno from local storage
    this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || "")
    console.log(typeof (this.currentAcno));


  }
  collapse() {
    this.isCollapse = !this.isCollapse
  }

  // getBalance()
  getBalance() {
    // api call to get balance
    this.api.getBalance(this.currentAcno)
      .subscribe((result: any) => {
        this.userBalance = result.balance

      },
        (result: any) => {
          alert(result.error.message)
        }
      )


  }

  // transfer
  transfer() {
    if (this.fundTransferForm.valid) {
      let toAcno = this.fundTransferForm.value.creditAcno
      let fromAcnopswd = this.fundTransferForm.value.password
      let amount = this.fundTransferForm.value.amount
      // alert('fund transfer clicked')
      this.api.fundTransfer(toAcno, fromAcnopswd, amount)
        .subscribe((result: any) => {
          console.log(result);

          this.fundTransferSuccessMsg = result.message
        },
          //  404
          (result: any) => {
            this.fundTransferErrorMsg = result.error.message
          }
        )

    }
    else {
      alert('Invalid Form')
    }
  }


  resetForm() {
    this.fundTransferForm.reset()
    this.fundTransferSuccessMsg = ""
    this.fundTransferErrorMsg = ""
  }


  // logout()
  logout() {
    // remove login details from local storage
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentAcno')
    this.logoutStatus = true
    setTimeout(() => {

      // redirect to login page
      this.dashboarRouter.navigateByUrl('')

    }, 2000);





  }


  // deleteMyAccount
  deleteMyAccount() {
    //  set deleteConfirmStatus as true
    this.deleteConfirmStatus = true

    // get acno to be deleted
    this.deleteAcno = this.currentAcno


  }


  // cancelDeleteConfirm()
  cancelDeleteConfirm(){
    // to hide child deleteConfirm view
    this.deleteAcno=''
    // set deleteConfirmStatus as fire
    this.deleteConfirmStatus = false
  }

  // deleteFromParent()
  deleteFromChild(event:any){
    // alert('Alert from parent '+event)
    this.deleteAcno=""
    // make api call to delete acno
    this.api.deleteAcno()
    .subscribe((result:any)=>{
      // display delete msg
      this.deleteMsg=result.message
       // remove login details from local storage
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentAcno')
    setTimeout(() => {
       // redirect to login page
      this.dashboarRouter.navigateByUrl('')
    },2000);
    },
    // status 400
    (result:any)=>{
      this.deleteMsg = result.error.message
    }
    )

  }

}



