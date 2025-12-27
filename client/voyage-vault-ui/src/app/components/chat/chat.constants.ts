export interface PlanResponse {
  landmarks: string[];
}

export interface Message {
  sender: 'user' | 'bot';
  content: string;
  timestamp: String;
}

export const INITIAL_MESSAGE: Message[] = [
  {
    sender: 'bot',
    content: 'Hello! How can I assist you today?',
    timestamp: '',
  }
];
