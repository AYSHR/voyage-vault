import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Location {
  name: string;
  x: number;
  y: number;
}

@Component({
  selector: 'map',
  imports: [ CommonModule ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  locations: Location[] = [];

  goBack(): void {}
}
