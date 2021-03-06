import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { ActivationType, BaseType, Machine } from '../machine';

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
  baseTypes =["Tutti i tipi"];
  baseType = "";
  activationTypes = ["Tutti i tipi"];
  activationType = "";
  pickedColor = "";
  searchingObject: object = {}

  constructor() {
    // build list of ativation type
    for ( const type of Object.values(ActivationType) ) {
      this.activationTypes.push(type);
    }
    this.activationType = this.activationTypes[0];
    // build list of container type
    for ( const type of Object.values(BaseType) ) {
      this.baseTypes.push(type);
    }
    this.baseType = this.baseTypes[0];
  }
  
  ngOnInit(): void {  }

  resetResults() {
    this.searchingObject = {}
    this.searchClicked.emit(this.searchingObject);
    this.activationType = "Tutti i tipi"
    this.baseType = "Tutti i tipi"
    this.yearsRange['from'] = this.yearsRange['to'] = ""
    this.checkedBrands = {}
  }

  searchResults() {
    // brands
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
    // years range
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
    // color
    if(this.pickedColor)
      this.searchingObject['color'] = this.pickedColor;
    else
      this.searchingObject['color'];
    // activation type
    if(this.activationType && this.activationType != "Tutti i tipi")
      this.searchingObject['activationType'] = this.activationType;
    else
      delete this.searchingObject['activationType'];
    // container type
    if(this.baseType && this.baseType != "Tutti i tipi")
      this.searchingObject['baseType'] = this.baseType;
    else
      delete this.searchingObject['baseType'];
    this.searchClicked.emit(this.searchingObject);
  }
}
