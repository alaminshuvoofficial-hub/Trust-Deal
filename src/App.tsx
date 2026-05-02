/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  Briefcase as BriefcaseIcon, 
  PlusCircle, 
  MessageSquare, 
  User as UserIcon,
  Bell,
  Search,
  Settings,
  ChevronRight,
  Shield,
  Palette,
  Layers,
  Type,
  Database,
  ShoppingCart,
  ShieldCheck,
  FileCheck,
  UserCheck,
  ArrowLeft,
  MoreHorizontal,
  FileText,
  Send,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { MOCK_USER, MOCK_ASSETS, HOW_IT_WORKS_STEPS, DIGITAL_CATEGORIES } from './constants';
import { Asset, Order, Message } from './types';

// --- Sub-components ---

const BottomNav = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'trades', label: 'My Trades', icon: BriefcaseIcon },
    { id: 'create', label: 'Create', icon: PlusCircle, special: true },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => onTabChange(tab.id)}
      className={cn(
        "flex flex-col items-center gap-1 transition-all",
        tab.special ? "text-primary -mt-10" : activeTab === tab.id ? "text-primary scale-110" : "text-gray-400"
      )}
    >
      {tab.special ? (
        <div className="bg-primary rounded-full p-4 shadow-xl shadow-primary/30 ring-4 ring-white">
          <PlusCircle className="w-7 h-7 text-white" />
        </div>
      ) : (
        <>
          <tab.icon className={cn("w-6 h-6", activeTab === tab.id && "fill-primary/10")} />
          <span className="text-[10px] font-bold tracking-tight">{tab.label}</span>
        </>
      )}
    </button>
  ));
};

// --- Screens ---

const Header = ({ title, showBack, onBack }: { title?: string, showBack?: boolean, onBack?: () => void }) => (
  <div className="flex items-center justify-between p-5 sticky top-0 bg-white/80 backdrop-blur-md z-40">
    {showBack ? (
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-dark-text" />
        </button>
        {title && <h1 className="text-xl font-bold text-dark-text">{title}</h1>}
      </div>
    ) : (
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-primary">TrustDeal</h1>
        </div>
        <p className="text-[10px] font-bold text-primary/60 mt-0.5 tracking-widest uppercase">Secure Digital Assets</p>
      </div>
    )}
    <div className="flex items-center gap-4">
      {showBack ? (
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-6 h-6 text-dark-text" />
        </button>
      ) : (
        <button className="p-2 bg-gray-100 rounded-full relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-100"></span>
        </button>
      )}
    </div>
  </div>
);

const HomeScreen = ({ assets, trades, onBrowse, onOpenTrade }: { assets: Asset[], trades: any[], onBrowse: () => void, onOpenTrade: (asset: Asset) => void }) => {
  const getCount = (label: string) => {
    return assets.filter(a => a.category === label && a.status === 'available').length;
  };

  const stats = {
    total: trades.length,
    pending: trades.filter(t => t.status === 'Pending').length,
    inProgress: trades.filter(t => t.status === 'In Progress').length,
    completed: trades.filter(t => t.status === 'Completed').length
  };

  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <Header />
      
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div>
             <h2 className="text-2xl md:text-3xl font-bold text-dark-text">Hello, {MOCK_USER.name} 👋</h2>
             <p className="text-gray-text text-sm md:text-base">Welcome to TrustDeal</p>
          </div>
        </div>

        {/* Info Grid - Responsive on Tablet/Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Total Escrow Trades Card */}
          <div className="lg:col-span-12 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 overflow-hidden relative group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-dark-text md:text-xl">Total Escrow Trades</h3>
              <button className="text-primary text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="text-5xl font-black text-dark-text mb-6">{stats.total}</div>
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {[
                { label: 'Pending', val: stats.pending, color: 'yellow', bg: 'bg-yellow-50', border: 'border-yellow-100/50', text: 'text-yellow-700', active: 'bg-yellow-400' },
                { label: 'In Progress', val: stats.inProgress, color: 'blue', bg: 'bg-blue-50', border: 'border-blue-100/50', text: 'text-blue-700', active: 'bg-blue-400' },
                { label: 'Completed', val: stats.completed, color: 'green', bg: 'bg-green-50', border: 'border-green-100/50', text: 'text-green-700', active: 'bg-green-400' },
              ].map(stat => (
                <div key={stat.label} className={cn("flex flex-col items-center p-4 rounded-2xl border", stat.bg, stat.border)}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn("w-2 h-2 rounded-full", stat.active)}></div>
                    <span className={cn("text-[10px] md:text-xs font-bold uppercase", stat.text)}>{stat.label}</span>
                  </div>
                  <span className="text-2xl md:text-3xl font-bold text-dark-text">{stat.val}</span>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-dark-text md:text-xl">Popular Categories</h3>
            <button className="text-primary text-xs font-bold">View all</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 1, label: 'Source Code', icon: Database, bg: 'primary' },
              { id: 2, label: 'Graphic Design', icon: Palette, bg: 'green' },
              { id: 3, label: 'Data Entry', icon: Layers, bg: 'blue' },
              { id: 4, label: 'Domain Names', icon: ShoppingCart, bg: 'yellow' },
            ].map(cat => (
              <div key={cat.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors">
                <div className={cn("p-3 rounded-2xl", cat.bg === 'primary' ? 'bg-primary-light' : cat.bg === 'green' ? 'bg-green-50' : cat.bg === 'blue' ? 'bg-blue-50' : 'bg-yellow-50')}>
                  <cat.icon className={cn("w-6 h-6", cat.bg === 'primary' ? 'text-primary' : cat.bg === 'green' ? 'text-green-600' : cat.bg === 'blue' ? 'text-blue-600' : 'text-yellow-600')} />
                </div>
                <div>
                  <p className="font-bold text-sm md:text-base">{cat.label}</p>
                  <p className="text-[10px] md:text-xs text-gray-text font-medium">{getCount(cat.label)} listings</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works? */}
        <div className="mt-12 bg-primary/5 rounded-3xl p-8 border border-primary/10">
          <h3 className="font-bold text-dark-text md:text-xl mb-6 text-center">How it works?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 1, icon: ShoppingCart, label: 'Buyer Places Order' },
              { id: 2, icon: ShieldCheck, label: 'Payment Held in Escrow' },
              { id: 3, icon: FileCheck, label: 'Asset Delivered & Verified' },
              { id: 4, icon: UserCheck, label: 'Seller Gets Paid' },
            ].map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-primary/20">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-[10px] md:text-xs font-bold text-gray-700 leading-tight uppercase tracking-tight">
                  {step.id}. {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-md mx-auto w-full">
          <button 
            onClick={onBrowse}
            className="w-full bg-primary text-white py-5 rounded-3xl font-bold mt-12 shadow-xl shadow-primary/30 transition-all hover:translate-y-[-2px] active:scale-95"
          >
            Browse Listings
          </button>
        </div>
      </div>
    </div>
  );
};

const MarketplaceScreen = ({ assets, onBack, onSelectAsset }: { assets: Asset[], onBack: () => void, onSelectAsset: (asset: Asset) => void }) => {
  const [filter, setFilter] = useState('All');
  
  return (
    <div className="pb-12 bg-white min-h-screen">
      <Header title="Browse Listings" showBack onBack={onBack} />
      
      <div className="px-5">
        <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide mb-6 sticky top-20 bg-white z-30">
          {['All', ...DIGITAL_CATEGORIES.slice(0, 10)].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all border",
                filter === cat 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                  : "bg-white text-gray-500 border-gray-200 hover:border-primary/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assets.filter(a => (filter === 'All' || a.category === filter) && a.status === 'available').map(asset => (
            <div 
              key={asset.id} 
              onClick={() => onSelectAsset(asset)}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/10 transition-all active:scale-[0.98] cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary-light rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-text md:text-lg">{asset.title}</h4>
                    <p className="text-xs text-gray-text font-medium">{asset.category}</p>
                    <p className="text-[10px] text-gray-text font-medium">Added: {asset.dateAdded}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-primary leading-none">৳{asset.price}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                <div className="flex items-center gap-3">
                  <img src={asset.sellerAvatar} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-50" />
                  <div>
                    <p className="text-xs font-bold text-dark-text">{asset.sellerName}</p>
                    <div className="flex items-center gap-0.5">
                      <span className="text-[10px] text-yellow-500">★</span>
                      <span className="text-[10px] font-bold text-gray-text">{asset.sellerRating}</span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrderDetailsScreen = ({ asset, onPlaceOrder, onBack }: { asset: Asset, onPlaceOrder: () => void, onBack: () => void }) => {
  const serviceFee = Math.round(asset.price * 0.02);
  const total = asset.price + serviceFee;
  const [payment, setPayment] = useState('bKash');

  return (
    <div className="pb-12 bg-white min-h-screen">
      <Header title="Order Details" showBack onBack={onBack} />
      
      <div className="px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Asset Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 ring-1 ring-primary/5">
              <div className="p-4 bg-primary-light rounded-2xl">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-dark-text md:text-xl">{asset.title}</h4>
                <p className="text-sm text-gray-text font-medium">{asset.category}</p>
                <p className="text-xs text-gray-text font-medium mt-1">Date: {asset.dateAdded}</p>
              </div>
              <span className="text-2xl font-black text-primary">৳{asset.price}</span>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-text uppercase tracking-widest mb-4">Seller Info</h3>
              <div className="flex items-center gap-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                <img src={asset.sellerAvatar} alt="" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-sm" />
                <div>
                  <p className="font-bold text-lg">{asset.sellerName}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                       {[1,2,3,4,5].map(i => (
                         <span key={i} className={cn("text-sm", i <= Math.floor(asset.sellerRating || 0) ? "text-yellow-500" : "text-gray-300")}>★</span>
                       ))}
                    </div>
                    <span className="text-sm font-bold text-gray-text">{asset.sellerRating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block bg-primary/5 p-6 rounded-3xl border border-primary/10">
              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                TrustDeal Escrow Protection
              </h4>
              <p className="text-xs text-primary/70 leading-relaxed font-medium">
                Your money is safe. We hold the payment until you verify the delivered asset. Only then is it released to the seller.
              </p>
            </div>
          </div>

          {/* Right Column: Checkout */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold text-gray-text uppercase tracking-widest mb-4">Price Summary</h3>
              <div className="space-y-4 bg-gray-50/50 p-8 rounded-3xl border border-dashed border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-text font-medium">Service Price</span>
                  <span className="font-bold">৳{asset.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-gray-text font-medium">Platform Fee (2%)</span>
                    <p className="text-[9px] text-primary font-bold uppercase mt-0.5">Escrow Service commission</p>
                  </div>
                  <span className="font-bold">৳{serviceFee}</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-bold text-dark-text text-lg">Total Payable</span>
                  <span className="font-black text-3xl text-primary">৳{total}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-text uppercase tracking-widest mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                 {['bKash', 'Nagad'].map(method => (
                   <button 
                    key={method}
                    onClick={() => setPayment(method)}
                    className={cn(
                      "flex items-center justify-between p-5 rounded-3xl border-2 transition-all",
                      payment === method ? "border-primary bg-primary/5" : "border-gray-100 bg-white"
                    )}
                   >
                     <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black text-white", method === 'bKash' ? "bg-pink-500" : "bg-orange-500")}>
                          {method[0]}
                        </div>
                        <span className="font-bold tracking-tight text-sm">{method}</span>
                     </div>
                     <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", payment === method ? "border-primary" : "border-gray-200")}>
                       {payment === method && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                     </div>
                   </button>
                 ))}
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={onPlaceOrder}
                className="w-full bg-primary text-white py-5 rounded-3xl font-bold shadow-xl shadow-primary/30 flex items-center justify-center gap-3 text-lg transition-transform active:scale-95"
              >
                <Shield className="w-6 h-6" />
                Place Order Securely
              </button>
              <p className="text-[10px] text-gray-text text-center mt-4 font-bold uppercase tracking-widest">Secured by TrustDeal Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentHeldScreen = ({ total, onNext }: { total: number, onNext: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-10 text-center animate-in zoom-in duration-500 pb-24">
      <p className="text-xs font-bold text-gray-text uppercase tracking-widest mb-8">Payment Held</p>
      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/40 rotate-12">
          <Shield className="w-12 h-12 text-white -rotate-12" />
        </div>
      </div>
      <h2 className="text-4xl font-black text-dark-text mb-2 tracking-tight">৳{total}</h2>
      <p className="text-lg font-bold text-dark-text mb-6">is held in escrow</p>
      
      <p className="text-sm text-gray-text leading-relaxed mb-10 max-w-xs">
        Your payment is secure with us. Please wait for the seller to deliver the digital asset.
      </p>

      <div className="bg-gray-100 p-4 rounded-2xl mb-12 w-full">
        <p className="text-[10px] font-bold text-gray-text uppercase">Order ID</p>
        <p className="text-sm font-bold text-dark-text tracking-wider">#TD584726</p>
      </div>

      <button 
        onClick={onNext}
        className="w-full border-2 border-primary text-primary py-4 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all transform active:scale-95"
      >
        Waiting for Delivery...
      </button>
      <p className="text-[10px] text-gray-text mt-4 font-bold uppercase tracking-tighter">You will be notified when seller uploads the asset.</p>
    </div>
  );
};

const VerifyAssetScreen = ({ asset, onConfirm }: { asset: Asset | null, onConfirm: () => void }) => {
  return (
    <div className="pb-24 bg-white min-h-screen">
      <Header title="Verify Asset" showBack />
      
      <div className="px-5 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-dark-text mb-2">Seller has delivered the digital asset.</h2>
        <p className="text-sm text-gray-text mb-8">Please verify the asset carefully.</p>

        {/* Asset Preview Mock */}
        <div className="w-full bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-10 relative overflow-hidden text-left shadow-inner">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Asset Preview</p>
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-[10px] font-bold text-gray-400">DIGITAL DELIVERY</p>
              <h3 className="text-2xl font-black text-dark-text tracking-tighter truncate w-48">{asset?.title.toLowerCase().replace(/ /g, '_')}_final.zip</h3>
            </div>
            <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-2 w-3/4 bg-gray-200 rounded-full"></div>
            <div className="h-2 w-1/2 bg-gray-200 rounded-full"></div>
            <div className="h-2 w-5/6 bg-gray-200 rounded-full"></div>
            <div className="h-20 w-full bg-white border border-gray-100 rounded-xl mt-4 flex items-center justify-center">
               <p className="text-[10px] font-bold text-gray-300">File content preview encrypted</p>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12"></div>
        </div>

        <button 
          onClick={onConfirm}
          className="w-full bg-primary text-white py-4 rounded-3xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all"
        >
          Confirm & Release Payment
        </button>
        <button className="w-full py-4 text-gray-text font-bold text-sm hover:text-dark-text transition-colors">
          Request Changes
        </button>
        <p className="text-[10px] text-red-500 mt-2 font-bold flex items-center gap-1 uppercase">
          <AlertCircle className="w-3 h-3" />
          You have 12:30 minutes to verify
        </p>
      </div>
    </div>
  );
};

const SuccessScreen = ({ total, onFinish }: { total: number, onFinish: () => void }) => {
  const platformCommission = Math.round(total * 0.02);
  const sellerPayout = total - platformCommission;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-10 text-center animate-in slide-in-from-bottom duration-700 pb-24">
      <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-8 relative">
        <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/40 relative">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-dark-text mb-2">Payment Released Successfully!</h2>
      <p className="text-sm text-gray-text mb-8">The digital safe has been opened.</p>
      
      <div className="w-full bg-gray-50 border border-gray-100 rounded-3xl p-6 mb-10 space-y-4">
        <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
           <span>Total Released</span>
           <span className="text-dark-text">৳{total}</span>
        </div>
        <div className="h-px bg-gray-200"></div>
        <div className="flex justify-between items-center">
           <div className="text-left">
             <p className="text-xs font-bold text-dark-text">Seller Receipt (98%)</p>
             <p className="text-[10px] text-gray-text">Sent to Sakib Hasan</p>
           </div>
           <span className="font-bold text-green-600">৳{sellerPayout}</span>
        </div>
        <div className="flex justify-between items-center">
           <div className="text-left">
             <p className="text-xs font-bold text-primary">Admin Commission (2%)</p>
             <p className="text-[10px] text-gray-text">Platform Service Fee</p>
           </div>
           <span className="font-bold text-primary">৳{platformCommission}</span>
        </div>
      </div>

      <div className="space-y-4 w-full">
        <button 
          onClick={onFinish}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/30"
        >
          View My Trades
        </button>
        <div>
          <p className="text-xs font-bold text-gray-text uppercase mb-4">Rate Your Experience</p>
          <div className="flex justify-center gap-4">
             <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl hover:bg-primary/10 transition-all active:scale-90">😊</button>
             <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl hover:bg-primary/10 transition-all active:scale-90">😐</button>
             <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl hover:bg-primary/10 transition-all active:scale-90">☹️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TradesScreen = ({ trades, onBack }: { trades: any[], onBack: () => void }) => {
  const [tab, setTab] = useState('All');
  return (
    <div className="pb-12 min-h-screen bg-background">
      <Header title="My Trades" />
      <div className="px-5">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide mb-4 sticky top-20 bg-background/80 backdrop-blur-md z-30">
          {['All', 'In Progress', 'Completed', 'Cancelled'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold transition-all border",
                tab === t ? "bg-primary text-white border-primary shadow-md shadow-primary/20" : "bg-white text-gray-500 border-gray-100"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trades.filter(item => tab === 'All' || item.status === tab).map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
              <div className={cn("p-4 rounded-2xl", item.color === 'blue' ? "bg-blue-50" : "bg-green-50")}>
                <FileText className={cn("w-6 h-6", item.color === 'blue' ? "text-blue-600" : "text-green-600")} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-dark-text">{item.title}</h4>
                <p className="text-[10px] text-gray-text font-medium">{item.category}</p>
                <p className="text-[9px] text-gray-400 font-medium">{item.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-dark-text">৳{item.price}</p>
                <p className={cn("text-[9px] font-black uppercase tracking-wider mt-1", item.status === 'In Progress' ? "text-blue-500" : item.status === 'Completed' ? "text-green-500" : "text-red-500")}>
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChatScreen = () => {
    return (
        <div className="pb-24 bg-white min-h-screen flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <button className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ArrowLeft className="w-6 h-6" /></button>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" alt="" className="w-10 h-10 rounded-full" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <p className="font-bold text-sm">Sakib Hasan</p>
                        <p className="text-[10px] text-green-500 font-bold uppercase">Online</p>
                    </div>
                </div>
                <button className="p-2 bg-gray-100 rounded-full"><Settings className="w-5 h-5 text-gray-600" /></button>
            </div>
            
            <div className="flex-1 p-5 space-y-6 overflow-y-auto">
                <div className="flex justify-start">
                    <div className="max-w-[75%] bg-gray-100 p-4 rounded-3xl rounded-tl-none">
                        <p className="text-sm">Hi, I have placed the order.</p>
                        <p className="text-[8px] text-gray-400 mt-1 font-bold">10:30 AM</p>
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <div className="max-w-[75%] bg-primary p-4 rounded-3xl rounded-tr-none text-white">
                        <p className="text-sm">Okay, I will deliver the asset soon.</p>
                        <p className="text-[8px] text-white/50 mt-1 font-bold">10:31 AM</p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="max-w-[75%] bg-white border border-gray-100 p-4 rounded-3xl rounded-tr-none shadow-sm space-y-3">
                        <p className="text-sm text-dark-text">Here is your digital asset.</p>
                        <div className="bg-gray-50 p-3 rounded-2xl flex items-center justify-between gap-4 border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-xl">
                                    <FileText className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold truncate w-24">cv_template.pdf</p>
                                    <p className="text-[9px] text-gray-400 font-medium tracking-tight">1.2 MB</p>
                                </div>
                            </div>
                            <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"><X className="w-4 h-4 text-gray-400" /></button>
                        </div>
                        <p className="text-[8px] text-gray-400 mt-1 font-bold">10:35 AM</p>
                    </div>
                </div>

                <div className="flex justify-start">
                    <div className="max-w-[75%] bg-gray-100 p-4 rounded-3xl rounded-tl-none">
                        <p className="text-sm">Thanks! Received.</p>
                        <p className="text-[8px] text-gray-400 mt-1 font-bold text-right">10:50 AM</p>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex items-center gap-3">
                <button className="p-3 bg-gray-100 rounded-2xl"><PlusCircle className="w-6 h-6 text-gray-500" /></button>
                <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-center">
                    <input type="text" placeholder="Type a message..." className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium" />
                </div>
                <button className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20"><Send className="w-6 h-6" /></button>
            </div>
        </div>
    );
};

const CreateListingScreen = ({ onFinish }: { onFinish: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: DIGITAL_CATEGORIES[0],
    price: '',
    description: ''
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.price) {
      alert('Please fill in required fields');
      return;
    }
    onFinish(formData);
  };

  return (
    <div className="pb-24 bg-white min-h-screen">
      <Header title="Create Asset" />
      <div className="px-5 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-text uppercase mb-2 block">Asset Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Modern UI Kit" 
              className="w-full p-4 rounded-2xl bg-gray-50 border-gray-100 focus:border-primary focus:ring-0 font-medium" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-text uppercase mb-2 block">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-4 rounded-2xl bg-gray-50 border-gray-100 focus:border-primary focus:ring-0 font-medium appearance-none"
            >
              {DIGITAL_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-text uppercase mb-2 block">Price (৳)</label>
            <input 
              type="number" 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="0.00" 
              className="w-full p-4 rounded-2xl bg-gray-50 border-gray-100 focus:border-primary focus:ring-0 font-bold text-xl text-primary" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-text uppercase mb-2 block">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your digital asset..." 
              rows={4} 
              className="w-full p-4 rounded-2xl bg-gray-50 border-gray-100 focus:border-primary focus:ring-0 font-medium"
            ></textarea>
          </div>
          <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 bg-gray-50/50">
             <PlusCircle className="w-8 h-8 text-gray-300" />
             <p className="text-xs font-bold text-gray-400">Upload Digital File (.zip, .pdf, .txt)</p>
          </div>
        </div>
        <button onClick={handleSubmit} className="w-full bg-primary text-white py-5 rounded-3xl font-bold shadow-xl shadow-primary/30 active:scale-95 transition-all">
          List Asset for Sale
        </button>
      </div>
    </div>
  );
};

const ProfileScreen = () => {
  return (
    <div className="pb-24 bg-white min-h-screen">
      <Header title="My Profile" />
      <div className="px-5">
        <div className="flex flex-col items-center py-8 bg-primary/5 rounded-3xl border border-primary/10 mb-8">
           <img src={MOCK_USER.avatar} alt="" className="w-24 h-24 rounded-full border-4 border-white shadow-xl mb-4" />
           <h2 className="text-xl font-bold text-dark-text">{MOCK_USER.name}</h2>
           <p className="text-gray-text text-sm font-medium">{MOCK_USER.email}</p>
           <div className="mt-4 flex gap-2">
             <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold uppercase">Verified Buyer</span>
             <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase">Seller Level 1</span>
           </div>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Wallet balance', val: '৳4,250', color: 'text-primary' },
            { label: 'Total Earnings', val: '৳12,400', color: 'text-green-600' },
            { label: 'Account Settings', icon: Settings },
            { label: 'Help & Support', icon: AlertCircle },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
               <span className="font-bold text-dark-text">{item.label}</span>
               {item.val ? <span className={cn("font-black", item.color)}>{item.val}</span> : <ChevronRight className="w-5 h-5 text-gray-300" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App Logic ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentFlow, setCurrentFlow] = useState<'home' | 'browse' | 'details' | 'held' | 'verify' | 'success'>('home');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [trades, setTrades] = useState<any[]>([]);

  const resetToHome = () => {
    setCurrentFlow('home');
    setActiveTab('home');
  };

  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setCurrentFlow('details');
  };

  const handlePlaceOrder = () => {
    setCurrentFlow('held');
  };

  const handleCreateAsset = (newAssetData: any) => {
    const asset: Asset = {
      id: `asset-${Date.now()}`,
      title: newAssetData.title,
      description: newAssetData.description,
      price: Number(newAssetData.price),
      category: newAssetData.category,
      sellerId: MOCK_USER.id,
      sellerName: MOCK_USER.name,
      sellerAvatar: MOCK_USER.avatar,
      sellerRating: 5.0,
      status: 'available',
      dateAdded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setAssets([asset, ...assets]);
    resetToHome();
  };

  const handleConfirmAsset = () => {
    if (selectedAsset) {
      const newTrade = {
        title: selectedAsset.title,
        status: 'Completed',
        category: selectedAsset.category,
        price: selectedAsset.price + Math.round(selectedAsset.price * 0.02),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        color: 'green'
      };
      setTrades([newTrade, ...trades]);
      // Mark asset as sold
      setAssets(assets.map(a => a.id === selectedAsset.id ? { ...a, status: 'sold' as const } : a));
    }
    setCurrentFlow('success');
  };

  const renderContent = () => {
    if (activeTab === 'trades') return <TradesScreen trades={trades} onBack={resetToHome} />;
    if (activeTab === 'messages') return <ChatScreen />;
    if (activeTab === 'create') return <CreateListingScreen onFinish={handleCreateAsset} />;
    if (activeTab === 'profile') return <ProfileScreen />;

    switch (currentFlow) {
      case 'home':
        return <HomeScreen assets={assets} trades={trades} onBrowse={() => setCurrentFlow('browse')} onOpenTrade={handleSelectAsset} />;
      case 'browse':
        return <MarketplaceScreen assets={assets} onBack={() => setCurrentFlow('home')} onSelectAsset={handleSelectAsset} />;
      case 'details':
        return selectedAsset ? <OrderDetailsScreen asset={selectedAsset} onBack={() => setCurrentFlow('browse')} onPlaceOrder={handlePlaceOrder} /> : null;
      case 'held':
        return <PaymentHeldScreen total={(selectedAsset?.price || 0) + Math.round((selectedAsset?.price || 0) * 0.02)} onNext={() => setCurrentFlow('verify')} />;
      case 'verify':
        return <VerifyAssetScreen asset={selectedAsset} onConfirm={handleConfirmAsset} />;
      case 'success':
        return <SuccessScreen total={(selectedAsset?.price || 0) + Math.round((selectedAsset?.price || 0) * 0.02)} onFinish={() => { setActiveTab('trades'); setCurrentFlow('home'); }} />;
      default:
        return <HomeScreen assets={assets} trades={trades} onBrowse={() => setCurrentFlow('browse')} onOpenTrade={handleSelectAsset} />;
    }
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen relative font-sans">
      <div className="w-full max-w-6xl md:px-6 bg-white md:bg-gray-50 flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 lg:pt-4">
          <div className="max-w-4xl mx-auto bg-white min-h-full md:rounded-3xl md:shadow-xl md:my-4 border border-transparent md:border-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + (selectedAsset?.id || '') + currentFlow}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Responsive Bottom Nav: Centered fixed container */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 md:pb-8 pointer-events-none">
          <div className="w-full max-w-md bg-white border border-gray-100 rounded-full shadow-2xl flex items-center justify-around py-3 px-6 pointer-events-auto">
            <BottomNav activeTab={activeTab} onTabChange={(tab) => {
               setActiveTab(tab);
               if (tab === 'home') setCurrentFlow('home');
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
