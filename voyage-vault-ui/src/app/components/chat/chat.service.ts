import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { PlanResponse } from './chat.constants';
import { StateService } from '../../services/state.service';

@Injectable()
export class ChatService {
  private apiService = inject(ApiService);
  private stateService = inject(StateService);

  sendMessageRequest(message: string): Observable<PlanResponse[]> {
    const destination = this.stateService.locationName();
    const duration = this.stateService.duration();
    const url = `http://localhost:3001/api/plan/${destination}/${duration}`;
    const queryParams = message ? { message } : {}

    return this.apiService.getServiceCall(url, queryParams);
  }
}
