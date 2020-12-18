import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../connectivity.service';
import { ImageService } from '../image.service';
import { Machine } from '../machine';
import { Image } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent implements OnInit {

  progressing = false;
  machines:Array<Machine> = new Array();
  brands:Array<string> = new Array();
  searchingObject: object = {}

  constructor(private csService: ConnectivityService, 
    private imgService: ImageService) {
    
  }

  machineRemovedHandler(machine: Machine) {
    var index: number = this.machines.indexOf(machine, 0);
    if(index > -1)
      this.machines.splice(index, 1);
  }

  buildMachinesList(data: Array<object>) {
    this.machines.splice(0, this.machines.length);
    data.forEach(element => {
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
        if(this.brands.indexOf(m.brand) == -1)
          this.brands.push(m.brand);
      });
    });
  }

  brandsFilterChanged(data: object) {
    // remove those with false
    for(const brand of Object.keys(data)){
      if(!data[brand]) 
        delete data[brand];
    }
    if(Object.entries(data).length > 0) 
      // filtered search to be applied 
      this.searchingObject['brands'] = data;
    else
      delete this.searchingObject['brands'];

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
