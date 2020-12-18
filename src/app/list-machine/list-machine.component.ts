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

  constructor(private csService: ConnectivityService, 
    private imgService: ImageService) {
    
  }

  machineRemovedHandler(machine: Machine) {
    var index: number = this.machines.indexOf(machine, 0);
    if(index > -1)
      this.machines.splice(index, 1);
  }

  brandsFilterChanged(data) {
    console.log(data);
  }

  ngOnInit(): void {
    this.progressing = true;
    this.csService.GetMachines().subscribe(data => {
      if(typeof data == 'object' && Array.isArray(data)) {
        data.forEach(element => {
          var bar = new Promise((resolve, reject) => {
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
      this.progressing = false;
    });
  }

}
