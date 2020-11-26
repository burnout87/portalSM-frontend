import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {empty, Observable, of} from 'rxjs';
import {debounceTime, delay, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import { ConnectivityService } from '../connectivity.service';
import { Owner } from '../owner';

@Component({
  selector: 'app-ower-search',
  templateUrl: './ower-search.component.html',
  styleUrls: ['./ower-search.component.css']
})
export class OwerSearchComponent implements OnInit {

  myControl = new FormControl();
  isLoading = false;
  filteredOwners: Owner[];

  constructor(private cs: ConnectivityService) { }

  // The debounceTime checks if the keypress is less than the time provided,
  // then cancels the further events

  ngOnInit(): void {
    this.myControl
      .valueChanges
      .pipe(
        debounceTime(1500),
        tap(() => {
          this.filteredOwners = [];
          this.isLoading = true;
        }),
        // map(value => typeof value === 'string' ? value : ''),
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

  private getOwners(filterValue: string): Observable<object[]> {
    if (typeof(filterValue) == 'string') {
      const filterObj = {
        $or: [ {
                name: {
                    $regex: "/*" + filterValue.toLowerCase() + "/*",
                    $options: "i"
                }
              }, {
                surname: {
                    $regex: "/*" + filterValue.toLowerCase() + "/*",
                    $options: "i"
                }
            }]
      };
      return this.cs.GetOwnersQuery(filterObj);
    } else {
       return of();

    }
  }

  displayFn(owner: Owner): string {
    return owner && owner.name ? owner.name + ' ' + owner.surname : '';
  }

}
