interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
}
