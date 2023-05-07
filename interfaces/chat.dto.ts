export interface ChatContentDTO {
  order: number;
  speaker?: number;
  message: string;
  createdAt: string;
  timestamp: number;
}

export interface ChatDTO {
  chatId: number;
  contents: ChatContentDTO[];
}
