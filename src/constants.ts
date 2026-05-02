import { Asset, Order, User } from './types';

export const MOCK_USER: User = {
  id: 'user1',
  name: 'Rafi',
  email: 'rafi@trustdeal.com',
  role: 'buyer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
};

export const MOCK_ASSETS: Asset[] = [];

export const DIGITAL_CATEGORIES = [
  "CV & Resume",
  "Graphic Design",
  "Source Code",
  "Domain Names",
  "Data Entry",
  "Premium Accounts",
  "eBooks & PDF",
  "Visiting Card",
  "Social Media Kit",
  "Document Templates",
  "Study Notes",
  "Gaming Assets",
  "Other"
];

export const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: '1. Buyer Places Order',
    description: 'Buyer selects an asset and pays into escrow.',
    icon: 'ShoppingCart'
  },
  {
    id: 2,
    title: '2. Payment Held in Escrow',
    description: 'TrustDeal holds funds securely until verification.',
    icon: 'ShieldCheck'
  },
  {
    id: 3,
    title: '3. Asset Delivered & Verified',
    description: 'Seller sends file and Buyer approves it.',
    icon: 'FileCheck'
  },
  {
    id: 4,
    title: '4. Seller Gets Paid',
    description: 'Payment is released to the seller instantly.',
    icon: 'UserCheck'
  }
];
