import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //  register api call
  register(acno: any, uname: any, pswd: any) {
    const body = {
      acno,
      uname,
      pswd
    }
    //  server register api - post
    return this.http.post('http://localhost:3000/register', body)

  }

  // login api call
  login(acno: any, pswd: any) {
    const body = {
      acno,
      pswd
    }
    //  server call - http://localhost:3000/login
    return this.http.post('http://localhost:3000/login', body)
  }

  // add token to request header
  appendToken() {
    // to get token from local storage
    const token = localStorage.getItem('token')
    // create request header
    let headers = new HttpHeaders()
    if(token){
      // append token in verify token as key in header
      headers=headers.append('verify-token',token)
      options.headers= headers
    }
    return options
  }

  // get Balance
  getBalance(acno: any) {
    // server call to get balance for requested acno
    return this.http.get('http://localhost:3000/getBalance/' + acno,this.appendToken())
  }

  fundTransfer(toAcno:any,pswd:any,amount:any){
    const body = {
      toAcno,
      pswd,
      amount
    }

    // api call
    return this.http.post('http://localhost:3000/fundTransfer',body,this.appendToken())

  }


  // transaction history api
  ministatement(){
    // api for transaction history
    return this.http.get('http://localhost:3000/transaction-history',this.appendToken())
  }

  // delete-account api
  deleteAcno(){
   return this.http.delete('http://localhost:3000/delete-account',this.appendToken())
  }
}
