import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  public arrayBufferToBase64(buffer) {
    if(buffer != undefined) {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      return window.btoa(binary);
    }
};

  // public getBase64ImageFromURL(url: string) {
  //   return Observable.create((observer: Observer<string>) => {
  //     // create an image object
  //     let img = new Image();
  //     img.crossOrigin = 'Anonymous';
  //     img.src = url;
  //     if (!img.complete) {
  //         // This will call another method that will create image from url
  //         img.onload = () => {
  //         observer.next(this.getBase64Image(img));
  //         observer.complete();
  //       };
  //       img.onerror = (err) => {
  //          observer.error(err);
  //       };
  //     } else {
  //         observer.next(this.getBase64Image(img));
  //         observer.complete();
  //     }
  //   });
  // }
}
