import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router = inject(Router);

  goTo(view: string) {
    this.router.navigate([`${view}`]);
  }

  isMapView() {
    return this.router.url.includes('map');
  }
}
