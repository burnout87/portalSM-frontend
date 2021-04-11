import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Owner } from '../owner';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit {
  inputOwner: any = null;
  newOwner: FormGroup;
  @ViewChild(FormGroupDirective) myForm;
  @Output() ownerUpdate: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private router: Router) {
      this.inputOwner = this.router.getCurrentNavigation().extras.state?.ownerData as any;
      this.newOwner = this.formBuilder.group({
        name: new FormControl(this.inputOwner?.name),
        surname: new FormControl(this.inputOwner?.surname),
        address: new FormControl(this.inputOwner?.address),
        cap: new FormControl(this.inputOwner?.postCode),
        city: new FormControl(this.inputOwner?.city),
        country: new FormControl(this.inputOwner?.country),
        phone: new FormControl(this.inputOwner?.phone),
        mail: new FormControl(this.inputOwner?.mail),
        _id: new FormControl(this.inputOwner?._id),
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
