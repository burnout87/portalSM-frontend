import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Machine } from '../machine';
import { SwiperOptions, Swiper } from 'swiper/bundle';
import { SwiperComponent } from 'ngx-useful-swiper';
import { ConnectivityService } from '../connectivity.service';
import { Description, DescriptionStrategy } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit, AfterViewInit  {

  constructor(private csService: ConnectivityService) { }

  @Output() machineRemovedEvent: EventEmitter<Machine> = new EventEmitter();
  @Input() machineData: Machine;
  @Input() id: Number;
  // @ViewChild('galleryTop',{static: false}) galleryTop: SwiperComponent;
  // @ViewChild('galleryThumbs',{static: false}) galleryThumbs: SwiperComponent;

  private slideThumb:boolean = true;

  ngOnInit(): void { }

   ngAfterViewInit() { }

  deleteMachine() {
    this.csService.RemoveMachine(this.machineData._id).subscribe(response => {
      if((response as any).state == 1)
        this.machineRemovedEvent.emit(this.machineData);
    });
  }

  customDescription: Description = {
    strategy: DescriptionStrategy.HIDE_IF_EMPTY
  };
}
