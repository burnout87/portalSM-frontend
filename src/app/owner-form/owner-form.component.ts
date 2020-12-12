import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit {

  newOwner:FormGroup;
  @ViewChild(FormGroupDirective) myForm;
  @Output() ownerUpdate: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
      this.newOwner = this.formBuilder.group({
        name: new FormControl(null),
        surname: new FormControl(null),
        address: new FormControl(null),
        cap: new FormControl(null),
        city: new FormControl(null),
        country: new FormControl(null),
        phone: new FormControl(null),
        mail: new FormControl(null),
        _id: new FormControl(null),
      });
  }

  public resetForm() {
    this.newOwner.reset();
    this.myForm.resetForm();
  }

  onDataOwnerChange($event) {
    this.ownerUpdate.emit(this.newOwner);
  }

  ownerFound($event) {
    if($event){
      // this.newOwner.setValue($event);
      this.newOwner.patchValue($event);
      this.ownerUpdate.emit(this.newOwner);
    }
  }

  ngOnInit(): void {
  }

}
