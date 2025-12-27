import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  locationName = signal<string>('');
  duration = signal<number>(5);
}
