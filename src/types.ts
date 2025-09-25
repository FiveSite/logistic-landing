export interface Content {
  id: number;
  title: string;
  body: string;
}
export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any;
  documentId: string;
  content: Content[];
}
export interface News {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any;
  documentId: string;
  content?: Content[];
}

export interface Team {
  id: number;
  name: string;
  description: string;
  position: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any;
  documentId: string;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any;
  documentId: string;
}

export interface Country {
  id: number;
  code: string;
  name: string;
  participants: number;
  documentId: string;
}
