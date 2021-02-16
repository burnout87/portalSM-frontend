import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectivityService } from './connectivity.service';
import { Machine } from './machine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portalSM-frontend';

  constructor(public router: Router) { }

  goToTheTop() {
    window.scrollTo(0, 0);
  }

}
