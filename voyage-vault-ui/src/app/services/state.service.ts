import { Injectable, signal } from '@angular/core';
import { PlanResponse } from '../components/chat/chat.constants';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  duration = signal<number>(5);
  locationName = signal<string>('');
  landmarks = signal<PlanResponse[]>([]);
}
