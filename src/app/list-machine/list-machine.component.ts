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

  constructor(private csService: ConnectivityService, 
    private imgService: ImageService) {
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
          bar.then(() =>  this.machines.push(new Machine(element)));
        });
      }
      this.progressing = false;
    });
  }

  machineRemovedHandler(machine: Machine) {
    var index: number = this.machines.indexOf(machine, 0);
    if(index > -1)
      this.machines.splice(index, 1);
  }

  ngOnInit(): void {
  }

}
