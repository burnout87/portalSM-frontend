import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective} from '@angular/forms';
import { Observable, of} from 'rxjs';
import { debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import { ConnectivityService } from '../connectivity.service';
import { Owner } from '../owner';

@Component({
  selector: 'app-ower-search',
  templateUrl: './ower-search.component.html',
  styleUrls: ['./ower-search.component.css']
})
export class OwerSearchComponent implements OnInit {

  @Output() ownerFoundEvent: EventEmitter<Owner> = new EventEmitter();
  ownerSearchControl = new FormControl();
  // @ViewChild(FormGroupDirective) myForm;
  isLoading = false;
  filteredOwners: Owner[];

  constructor(private cs: ConnectivityService) { }

  // The debounceTime checks if the keypress is less than the time provided,
  // then cancels the further events

  ngOnInit(): void {
    this.ownerSearchControl
      .valueChanges
      .pipe(
        
        tap(() => {
          this.filteredOwners = [];
          this.isLoading = true;
        }),
        debounceTime(1700),
        // map(value => typeof value === 'string' ? value : ''),
        // map(value => typeof(value) === 'object' || ( typeof(value) == 'string' && value != '' )),
        switchMap(value => this.getOwners(value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.filteredOwners = [];
        } else {
          this.filteredOwners = data;
        }
      })
  }

  selectOption(ownerData: any) {
    // send the value of the form up to the parent component
    this.ownerFoundEvent.emit(ownerData);
    // reset the text input field
    this.ownerSearchControl.reset();
    // this.myForm.resetForm();
  }

  private getOwners(filterValue: string): Observable<object[]> {
    if(filterValue && typeof(filterValue) == 'string' && filterValue != '') {
      return this.cs.GetOwnersQuery(filterValue);
    }
    return of();
  }

  displayFn(owner: Owner): string {
    return owner && owner.name ? owner.name + ' ' + owner.surname : '';
  }

}
