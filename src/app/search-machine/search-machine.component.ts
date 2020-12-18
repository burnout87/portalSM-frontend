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
  @Output() brandChecked: EventEmitter<any> = new EventEmitter();

  checkedBrands = {};

  constructor() { }
  
  ngOnInit(): void {  }

  checkBrand() {
    this.brandChecked.emit(this.checkedBrands);
  }
}
