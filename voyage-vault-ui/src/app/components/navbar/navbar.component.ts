import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router = inject(Router);
  stateService = inject(StateService);
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.isDarkMode.set(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  toggleTheme() {
    this.applyTheme();
    this.isDarkMode.set(!this.isDarkMode());
  }

  applyTheme() {
    const currentMode = this.isDarkMode() ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentMode);
  }

  openMaps() {
    const locations = this.stateService.landmarks();

    if ( !locations.length ) return;

    let url: string;

    if ( locations.length === 1 ) {
      const [lat, lng] = locations[0].coordinates;
      url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    } else {
      const origin = locations[0].coordinates.join(',');
      const destination = locations[locations.length - 1].coordinates.join(',');
      const waypoints = locations.slice(1, -1)
        .map(l => l.coordinates.join(','))
        .join('|');

      url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
      url += waypoints ? `&waypoints=${waypoints}` : ``;
    }

    window.open(url, '_blank');
  }
}
