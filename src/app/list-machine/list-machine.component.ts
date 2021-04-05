import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../connectivity.service';
import { ImageService } from '../image.service';
import { Machine } from '../machine';
import { Image } from '@ks89/angular-modal-gallery';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent implements OnInit {

  progressing = false;
  machines:Array<Machine> = new Array();
  brands:Array<string> = new Array();
  searchingObject: object = {};
  orderingType = "name";
  orderingTypes = [
    {
      id: 1,
      key: "name",
      value: "Nome"
    },
    {
      id: 2,
      key: "year",
      value: "Anno"
    },
    {
      id: 3,
      key: "brand",
      value: "Marchio"
    },
    {
      id: 4,
      key: "recordingTime",
      value: "Data d'inserimento"
    },
  ];

  constructor(private csService: ConnectivityService, 
    private imgService: ImageService) {
      this.machines.sort(this.dynamicSort('name'));
  }

  changeOrdering(value) {
    this.machines.sort(this.dynamicSort(value));
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        if(a[property] && b[property]) {
          var valueCompareA = a[property];
          var valueCompareB = b[property];
          if(typeof valueCompareA == 'string'){
            valueCompareA = valueCompareA.toUpperCase();
            valueCompareB = valueCompareB.toUpperCase();
          } 
          var result = (valueCompareA < valueCompareB) ? -1 : (valueCompareA > valueCompareB) ? 1 : 0;
          return result * sortOrder;
        }
        return a[property] ? -1 : 1;
    }
  }

  machineRemovedHandler(machine: Machine) {
    var index: number = this.machines.indexOf(machine, 0);
    if(index > -1) {
      this.machines.splice(index, 1);
      var indexBrand = this.brands.indexOf(machine.brand, 0);
      if(indexBrand > -1) {
        this.brands.splice(indexBrand, 1);
      }
    }
  }

  buildMachinesList(data: Array<object>) {
    this.machines.splice(0, this.machines.length);
    // data = _.orderBy(data, ['brand']);
    data.forEach((element, i) => {
      var bar = new Promise<void>((resolve, reject) => {
        if(element['images'] && element['images'].length > 0) {
          element['images']?.forEach((imgData, index) => {
            element['images'][index] = new Image(index, {img: 'data:' + imgData.type + ';base64,' + imgData.data});
            if(index == element['images'].length - 1) resolve();
          });
        } 
        else
          resolve();
      });
      bar.then(() =>  {
        var m: Machine = new Machine(element);
        this.machines.push(m);
        if(m.brand && this.brands.indexOf(m.brand) == -1)
          this.brands.push(m.brand);
        if(i == data.length - 1)
          this.brands = _.orderBy(this.brands);
      });
    });
  }

  searchClicked(data: object) {
    this.searchingObject = data;
    this.progressing = true;
    this.csService.SearchMachines(this.searchingObject)
      .subscribe(data => {
        if(typeof data == 'object' && Array.isArray(data)) {
          this.buildMachinesList(data);
        }
        this.progressing = false;
      });
  }

  ngOnInit(): void {
    this.progressing = true;
    this.csService.SearchMachines(this.searchingObject).subscribe(data => {
      if(typeof data == 'object' && Array.isArray(data)) {
        this.buildMachinesList(data);
      }
      this.progressing = false;
    });
  }

}
