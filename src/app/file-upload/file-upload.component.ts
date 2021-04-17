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
  inputFiles: Array<any> = null;
  
  public files: Array<any> = new Array();
  onChange: Function;

  constructor(private router: Router) { 
    this.inputFiles = this.router.getCurrentNavigation().extras.state?.images as Array<any>;
  }

  private dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  private dataURLtoFile(dataurl, filename) {
  
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }


  writeValue(obj: any): void { 
    this.cleanFilesList();
    // Performs an init-like operation in case it is an edit operation
    if (this.inputFiles) {
      for (let file of this.inputFiles) {
        let base64URL = null
        var fr = new FileReader();
        if(file && file.modal && file.modal.img) {
          base64URL = file.modal.img
          file = this.dataURLtoFile(file.modal.img,'');
        }
        file.imageURL = base64URL
        this.files.push(file);
      }
      this.inputFiles = null;
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
