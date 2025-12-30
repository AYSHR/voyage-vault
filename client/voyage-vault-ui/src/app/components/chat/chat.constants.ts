export interface PlanResponse {
  landmark: string;
  coordinates: [ number, number ];
}

export interface Message {
  sender: 'user' | 'bot';
  content: string;
  timestamp: String;
}

export const INITIAL_MESSAGE: Message[] = [
  {
    sender: 'bot',
    content: `Hey there, Voyager !!! \nWhere's your next quest? 🌎️✈️🌴 Spill the location, ` +
      `and I'll craft a perfect itinerary packed with magic from our vault! ✨📜`,
    timestamp: '',
  }
];
