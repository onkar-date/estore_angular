import { Image } from './Image.interface';

export interface Product {
  id: number; // Corresponds to Long in Java
  name: string;
  description: string;
  price: number; // In rupees
  stockQuantity: number;
  sellerId: number; // Corresponds to Long in Java
  images: Array<Image>;
}
