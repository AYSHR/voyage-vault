import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { finalize } from 'rxjs';
import { ChatService } from './chat.service';
import { StateService } from '../../services/state.service';
import { INITIAL_MESSAGE, Message, PlanResponse } from './chat.constants';

@Component({
  selector: 'chat',
  imports: [ FormsModule, NgClass ],
  providers: [ ChatService ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})

export class ChatComponent {
  stateService = inject(StateService);
  chatService = inject(ChatService);

  isInitialSearch = signal<boolean>(true);
  isLoading = signal<boolean>(false);
  userMessage = signal<string>('');
  messages = signal<Message[]>(INITIAL_MESSAGE);

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHours}:${displayMinutes} ${ampm}`;
  }

  onInputChange(event: Event, property = '') {
    const target = event.target as HTMLInputElement;

    switch (property) {
      case 'locationName':
        this.stateService.locationName.set(target.value);
        break;
      case 'duration':
        this.stateService.duration.set(Number(target.value));
        break;
      default: this.userMessage.set(target.value);
    }
  }

  sendMessage() {
    if ( this.userMessage().trim() ) {
      const messageContent = this.userMessage();
      this.updateBotMessage(messageContent, 'user');
      this.userMessage.set('');
      this.isLoading.set(true);

      this.chatService.sendMessageRequest(messageContent).pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
        /// todo check response return is new or older way
        next: (response: PlanResponse) => {
          const message = `Here are the suggested landmarks: ${response.landmarks.join(', ')}`;
          this.updateBotMessage(message);
        },
        error: (error: Error) => {
          console.error('Error fetching landmarks:', error);
          this.updateBotMessage('Sorry, I encountered an error. Please try again.');
        }
      });
    }
  }

  updateBotMessage(newContent: string, sender: 'bot' | 'user' = 'bot') {
    const timestamp = this.formatTime(new Date());
    this.messages.update(msg => [
      ...msg, { sender, content: newContent, timestamp }
    ]);
  }
}
