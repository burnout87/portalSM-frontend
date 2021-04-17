import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Machine } from '../machine';
import { Owner } from '../owner';
import { ConnectivityService } from '../connectivity.service';
import { Description, DescriptionStrategy } from '@ks89/angular-modal-gallery';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';

// export function scrollFactory(overlay: Overlay): () => ScrollStrategy {
//   return () => overlay.scrollStrategies.reposition();
// }

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
  
  // providers: [
  //   { 
  //     provide: MAT_DIALOG_SCROLL_STRATEGY, 
  //     useFactory: scrollFactory, 
  //     deps: [Overlay] 
  //   }
  // ]
})
export class MachineComponent implements OnInit, AfterViewInit  {

  constructor(private csService: ConnectivityService,
    public dialog: MatDialog,
    private overlay: Overlay,
    private router : Router) {
     }

  @Output() machineRemovedEvent: EventEmitter<Machine> = new EventEmitter();
  @Input() machineData: Machine;
  @Input() id: Number;
  // @ViewChild('userDataTooltip') public userDataTooltip: TooltipComponent;
  ownerDataDialog: MatDialogRef<DialogContentUserDialog, any>;
  tooltipContent: string = "";

  private slideThumb:boolean = true;

  ngOnInit(): void { }

  ngAfterViewInit() { }

  deleteMachine() {
    this.csService.RemoveMachine(this.machineData._id).subscribe(response => {
      if((response as any).state == 1)
        this.machineRemovedEvent.emit(this.machineData);
    });
  }

  editMachine() {
    this.router.navigateByUrl('/addsm', { state: this.machineData });
  }

  // tooltip/dialog stuff
  openDialog(event) {
    
    if(this.machineData.ownerData) {
      const bottom = event.target.getBoundingClientRect().bottom - event.target.getBoundingClientRect().height * 2;
      const left  = event.target.getBoundingClientRect().left + event.target.getBoundingClientRect().width + 10;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.backdropClass = 'custom-dialog-backdrop-class';
      dialogConfig.panelClass = 'custom-dialog-panel-class';
      dialogConfig.hasBackdrop = true;
      dialogConfig.scrollStrategy = this.overlay.scrollStrategies.close();
      // dialogConfig.disableClose = true;
      // dialogConfig.autoFocus = true;
      dialogConfig.data = this.machineData.ownerData
      dialogConfig.position = {
        top:  bottom + 'px',
        left: left + 'px'
      };
      this.ownerDataDialog = this.dialog.open(
        DialogContentUserDialog, 
        dialogConfig
       );
  
      this.ownerDataDialog.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  customDescription: Description = {
    strategy: DescriptionStrategy.HIDE_IF_EMPTY
  };
}

@Component({
  selector: 'dialog-content-user-dialog',
  templateUrl: 'dialog-content-user-dialog.html',
  styleUrls: ['./dialog-content-user-dialog.css'],
})
export class DialogContentUserDialog {

  constructor(
    public thisDialogRef: MatDialogRef<DialogContentUserDialog, any>, 
    @Inject(MAT_DIALOG_DATA) public ownerData: Owner) { }

  ngOnInit() {
  }

  closeDialog() {
    this.thisDialogRef.close('user-close');
  }
}