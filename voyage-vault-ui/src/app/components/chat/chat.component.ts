import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
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
  userMessage = signal<string>('');
  messages = signal<Message[]>(INITIAL_MESSAGE);

  locationName = computed(()=> this.stateService.locationName());
  duration = computed(()=> this.stateService.duration());
  isSearchDisabled = computed(() => !this.locationName().trim().length );

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
        this.isInitialSearch.set(true);
        break;
      case 'duration':
        let value = Number(target.value);
        this.stateService.duration.set( ( value < 1 ) ? 1 : value );
        this.isInitialSearch.set(true);
        break;
      default: this.userMessage.set(target.value);
    }
  }

  resetSelection() {
    this.stateService.locationName.set('');
    this.stateService.duration.set(5);
    this.isInitialSearch.set(true);
    this.messages.set(INITIAL_MESSAGE);
  }

  sendMessage() {
    let userInput = '';
    let extraContent = '';

    if ( this.isInitialSearch() ) {
      userInput = `Itinerary for a ${this.duration()} day trip to ${this.locationName()}.`;
      extraContent = '';
      this.isInitialSearch.set(false);
    } else if ( this.userMessage().trim() ) {
      userInput = this.userMessage().trim();
      extraContent = this.userMessage().trim();
      this.userMessage.set('');
    } else {
      return;
    }

    this.updateMessage(userInput, 'user');

    this.chatService.sendMessageRequest(extraContent).subscribe({
      next: (response: PlanResponse[]) => {
        this.updateBotResponse(response);
      },
      error: (error: Error) => {
        console.error(error);
        this.updateMessage('Sorry, I encountered an error. Please try again.');
      }
    });
  }

  updateBotResponse(data: PlanResponse[]) {
    let message: string;

    if ( !data || !data.length ) {
      message = 'Sorry, I could not find any landmarks for that location.';
    } else {
      const landmarks = data.map(item => `📍 ${item.landmark}`).join('\n');
      message = `Here are the suggested landmarks:\n${landmarks}`;
    }

    this.stateService.landmarks.set(data);
    this.updateMessage(message);
  }

  updateMessage(newContent: string, sender: 'bot' | 'user' = 'bot') {
    const timestamp = this.formatTime(new Date());
    this.messages.update(msg => [ ...msg, { sender, content: newContent, timestamp } ]) ;
  }
}
