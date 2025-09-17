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
