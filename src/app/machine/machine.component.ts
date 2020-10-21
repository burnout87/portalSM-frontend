import { Component, Input, OnInit } from '@angular/core';
import { Machine } from '../machine';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  constructor() { }

  @Input() machineData: Machine;

  ngOnInit(): void {
  }

}
