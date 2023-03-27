import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {

  @Input() acno:any
  @Output() onCancel = new EventEmitter ()
  @Output() onDelete = new EventEmitter()

  Cancel(){
    // to occur an userdefined event use emit()
    this.onCancel.emit()
    
  }

  deleteFromChild(){
   // to occur an userdefined event use emit()
   this.onDelete.emit(this.acno)


  }

}
