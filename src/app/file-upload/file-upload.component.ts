import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileItem } from 'ng2-file-upload';
import { Image } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor  {
  
  public files: Array<any> = new Array();
  onChange: Function;

  constructor(private router: Router) { 
  }

  private dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    let fileExtension = mime.split('/')[1];
    return new File([u8arr], filename + '.' + fileExtension, {type:mime});
  }


  writeValue(obj: any): void { 
    this.cleanFilesList();
    let filesInput = obj as Array<any>;
    // Performs an init-like operation in case it is an edit operation
    if (filesInput) {

      filesInput.forEach((file, i) => {
        var bar = new Promise<void>((resolve, reject) => {
          let base64URL = null
          if(file && file.modal && file.modal.img) {
            base64URL = file.modal.img
            file = this.dataURLtoFile(file.modal.img, i);
          }
          file.imageURL = base64URL as string;
          this.files.push(file);
          resolve();
        });
        bar.then(() =>  {
          file.loading = false;
          this.onChange(this.files);
        });
      });
    }
  }

  private calculateImageSize(base64String) {
    let padding;
    let inBytes;
    let base64StringLength;
    if (base64String.endsWith('==')) { padding = 2; }
    else if (base64String.endsWith('=')) { padding = 1; }
    else { padding = 0; }

    base64StringLength = base64String.length;
    inBytes = (base64StringLength / 4) * 3 - padding;
    return inBytes;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void { }

  onFileChange($event) {
    var fileImg: any = $event.target.files[0];
    fileImg.loading = true;
    var bar = new Promise<void>((resolve, reject) => {
      this.files.push(fileImg);
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        fileImg.imageURL = reader.result as string;
        resolve();
      }
      reader.readAsDataURL(fileImg);
    });
    bar.then(() =>  {
      fileImg.loading = false;
      $event.target.value = null;
      this.onChange(this.files);
    });
  }

  cleanFilesList() {
    this.files = new Array<any>();
  }

  removeFileFromList(file) {
    const index = this.files.indexOf(file, 0);
    if(index > -1)
      this.files.splice(index, 1);
  }
}
