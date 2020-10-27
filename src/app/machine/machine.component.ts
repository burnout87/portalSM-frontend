import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Machine } from '../machine';
import { SwiperOptions, Swiper } from 'swiper';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit, AfterViewInit  {

  constructor() { }

  @Input() machineData: Machine;
  @ViewChild('galleryTop',{static: false}) galleryTop: Swiper;
  @ViewChild('galleryThumbs',{static: false}) galleryThumbs: Swiper;

  ngOnInit(): void { }

   ngAfterViewInit() {  
    this.configTop.thumbs = {};
    this.configTop.thumbs.swiper = this.galleryThumbs;
    this.galleryThumbs.swiper.slides[this.galleryTop.swiper.realIndex].style.opacity = 1;
  }

  slideToThis(index) {
    this.galleryThumbs.swiper.slides[this.galleryTop.swiper.realIndex].style.opacity = 0.6;
    this.galleryTop.swiper.slideTo(index);
    this.galleryThumbs.swiper.slides[index].style.opacity = 1;
  }

  configTop: SwiperOptions = {
    spaceBetween: 10,
    loop: true,
    loopedSlides: 5, //looped slides should be the same
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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

    // var galleryThumbs = new Swiper('.gallery-thumbs', {
    //   spaceBetween: 10,
    //   slidesPerView: 4,
    //   loop: true,
    //   freeMode: true,
    //   loopedSlides: 5, //looped slides should be the same
    //   watchSlidesVisibility: true,
    //   watchSlidesProgress: true,
    // });
    // var galleryTop = new Swiper('.gallery-top', {
    //   spaceBetween: 10,
    //   loop: true,
    //   loopedSlides: 5, //looped slides should be the same
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    //   thumbs: {
    //     swiper: galleryThumbs,
    //   },
    // });


}
