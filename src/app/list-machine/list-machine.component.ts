import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../connectivity.service';
import { ImageService } from '../image.service';
import { Machine } from '../machine';

@Component({
  selector: 'app-list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent implements OnInit {

  machines:Array<Machine> = new Array();
  constructor(private csService: ConnectivityService, 
    private imgService: ImageService) {
    this.csService.GetMachines().subscribe(data => {
      if(typeof data == 'object') {
        data.forEach(element => {
          // if(element['images'] || element['image'])
            element['images']?.forEach(imgData => {
              if (typeof imgData?.data != 'string')
                this.imgService.arrayBufferToBase64(imgData?.data);
            });
            element['image']?.forEach(imgData => {
              if (typeof imgData?.data != 'string')
                this.imgService.arrayBufferToBase64(imgData?.data);
            });
        });

      }
      this.machines = data;
    })
  }

  ngOnInit(): void {
  }

}
