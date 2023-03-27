import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  data:any=[]
  searchTerm:string=''

constructor(private api:ApiService,private transactionRouter:Router){}

  ngOnInit(): void {

// check user logined or not
if(!localStorage.getItem('token')){
  alert('Please Login')
  // redirect to login page
  this.transactionRouter.navigateByUrl('')
}

    // call ministatement api
    this.api.ministatement()
    .subscribe((result:any)=>{
      console.log(result.transactions);
      this.data=result.transactions
      
    })

  }



  filter(event:any){
    this.searchTerm = event.target.value
  }


  generatePdf(){
    //  create object of jspdf
    var pdf= new jsPDF()
    // setup col
    let col = ['Type','FromAcno','ToAcno','Amount']
    // set up row
    let row:any=[]
    // basic styling for pdf document
    pdf.setFontSize(16)
    pdf.text('Mini Statement',85,10)
    pdf.setFontSize(12)
    pdf.setTextColor(99)


    //  convert allTransaction to nested array

    var allItems = this.data
    for(let item of allItems){
      var temp=[item.type,item.fromAcno,item.toAcno,item.amount]
      row.push(temp)
    }

    // convert nested array to pdf
    (pdf as any).autoTable(col,row,{startY:15})
    // open pdf in another tab in browser
    pdf.output('dataurlnewwindow')
    // download table as pdf
    pdf.save('ministatement.pdf')

    
  }

}
