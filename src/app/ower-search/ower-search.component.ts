import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ConnectivityService } from '../connectivity.service';

@Component({
  selector: 'app-ower-search',
  templateUrl: './ower-search.component.html',
  styleUrls: ['./ower-search.component.css']
})
export class OwerSearchComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private cs: ConnectivityService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    value.toLowerCase();
    // define the options, which means retrieve the users
    const filterObj = {
      $or: [
          {
              name: {
                  '$regex': "/*" + value.toLowerCase() + "/*",
                  '$options': "i"
              }
          },
          {
              surname: {
                  '$regex': "/*" + value.toLowerCase() + "/*",
                  '$options': "i"
              }
          }
      ]
  }; 
    
    this.cs.GetOwners(filterObj);
    // return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
