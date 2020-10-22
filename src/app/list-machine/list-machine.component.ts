import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../connectivity.service';
import { Machine } from '../machine';

@Component({
  selector: 'app-list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent implements OnInit {

  machines:Array<Machine> = new Array();
  constructor(private csService: ConnectivityService) {
    this.csService.GetMachines().subscribe(data => {
      this.machines = data;
    })
  }

  ngOnInit(): void {
  }

}
