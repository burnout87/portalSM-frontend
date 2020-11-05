import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Machine } from '../machine';
import { SwiperOptions, Swiper } from 'swiper/bundle';
import { SwiperComponent } from 'ngx-useful-swiper';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit, AfterViewInit  {

  constructor() { }

  @Input() machineData: Machine;
  @ViewChild('galleryTop',{static: false}) galleryTop: SwiperComponent;
  @ViewChild('galleryThumbs',{static: false}) galleryThumbs: SwiperComponent;

  private slideThumb:boolean = true;

  ngOnInit(): void { }

   ngAfterViewInit() {
    this.configTop.thumbs = {};
    this.configTop.thumbs.swiper = this.galleryThumbs.swiper;
    this.updateThumbSlidesOpacity();
  }

  slideToThis(index) {
      this.galleryTop.swiper.slideTo(index);
  }

  updateThumbSlidesOpacity() {
    this.galleryThumbs.swiper.slides.forEach(slide => {
      if(this.galleryThumbs.swiper.slides.indexOf(slide) == this.galleryTop.swiper.realIndex)
        (slide as HTMLElement).style.opacity = "1";
      else
      (slide as HTMLElement).style.opacity = "0.6";
    }, this);
  }

  configTop: SwiperOptions = {
    spaceBetween: 10,
    loop: true,
    loopedSlides: 5,
    autoHeight: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs : { },
    on: {
       slideChange: () => {
          if(this.galleryThumbs.swiper != undefined && this.galleryTop.swiper != undefined) {
            this.galleryThumbs.swiper.slideTo(this.galleryTop.swiper.realIndex);
          }
        },
        slideChangeTransitionEnd: () => {
          if(this.galleryThumbs.swiper != undefined && this.galleryTop.swiper != undefined) {
            this.updateThumbSlidesOpacity();
          }
        }
      }
    };

  configThumbs: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    loop: false,
    freeMode: true,
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true
  };

}
