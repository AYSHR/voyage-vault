import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { PlanResponse } from './chat.constants';

@Injectable()
export class ChatService {
  private apiService = inject(ApiService);

  sendMessageRequest(message: string, days: number = 5): Observable<PlanResponse> {
    const url = 'http://localhost:3001/api/plan';

    return this.apiService.postServiceCall<PlanResponse>(url, {
      destination: message,
      days: days
    });
  }
}
