import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Machine } from '../machine';

@Component({
  selector: 'app-search-machine',
  templateUrl: './search-machine.component.html',
  styleUrls: ['./search-machine.component.css']
})
export class SearchMachineComponent implements OnInit, OnChanges {

  @Input() brands: Array<string>;

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    // this.machines.forEach(element => {
    //   this.brands.push(element.brand);
    // });
  }

  ngOnInit(): void {
  }

}
