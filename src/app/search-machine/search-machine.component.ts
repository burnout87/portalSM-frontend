import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Machine } from '../machine';

@Component({
  selector: 'app-search-machine',
  templateUrl: './search-machine.component.html',
  styleUrls: ['./search-machine.component.css']
})
export class SearchMachineComponent implements OnInit {

  @Input() brands: Array<string>;
  @Output() searchClicked: EventEmitter<any> = new EventEmitter();

  checkedBrands = {};
  yearsRange = {};
  
  searchingObject: object = {}

  constructor() { }
  
  ngOnInit(): void {  }

  searchResults() {
    if(this.checkedBrands)
    {
      for(const brand of Object.keys(this.checkedBrands)){
        if(!this.checkedBrands[brand]) 
          delete this.checkedBrands[brand];
      }
      if(Object.entries(this.checkedBrands).length > 0) 
        // filtered search to be applied 
        this.searchingObject['brands'] = this.checkedBrands;
      else
        delete this.searchingObject['brands'];

    }
    if(this.yearsRange && Object.entries(this.yearsRange).length > 0)
    {
      this.searchingObject['years'] = { };
      if(this.yearsRange['from'] && this.yearsRange['from'] != "")
        this.searchingObject['years']['from'] = this.yearsRange['from'];
      else
        delete this.searchingObject['from'];
      if(this.yearsRange['to'] && this.yearsRange['to'] != "")
        this.searchingObject['years']['to'] = this.yearsRange['to'];
      else
        delete this.searchingObject['to'];
    }
    if(!this.searchingObject['years'] || Object.entries(this.searchingObject['years']).length == 0)
      delete this.searchingObject['years'];
    this.searchClicked.emit(this.searchingObject);
  }
}
