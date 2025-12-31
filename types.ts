
export interface Item {
  id: string;
  name: string;
  type: string;
  inputDate: string;
  addedDate: string;
  description: string;
  image: string; // Base64 string
  quantity: number;
}

export interface BorrowedItem {
  itemId: string;
  quantity: number;
}

export interface Activity {
  id: string;
  name: string;
  date: string;
  items: BorrowedItem[];
}

export type AppView = 'beranda' | 'history' | 'akunku';
