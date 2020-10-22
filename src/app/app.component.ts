import { Component } from '@angular/core';
import { ConnectivityService } from './connectivity.service';
import { Machine } from './machine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portalSM-frontend';

  constructor() { }

}
