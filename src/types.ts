export interface User {
  id: string;
  name: string;
  email?: string;
  role: 'buyer' | 'seller';
  avatar?: string;
  rating?: number;
  isOnline?: boolean;
}

export interface Asset {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  sellerRating?: number;
  status: 'available' | 'sold';
  dateAdded: string;
  transportType?: string; // For tickets: 'Subarna Express' etc.
  from?: string;
  to?: string;
}

export interface Order {
  id: string;
  assetId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  serviceFee: number;
  totalAmount: number;
  status: 'pending' | 'held' | 'delivered' | 'completed' | 'cancelled';
  paymentMethod?: 'bKash' | 'Nagad';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  orderId: string;
  senderId: string;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
    type: string;
    url: string;
  };
}
