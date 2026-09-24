export const mockOrders = [
  {
    id: 'ORD-98214',
    date: '2026-09-21',
    status: 'Delivered',
    statusColor: 'emerald',
    deliveryTime: 'Sep 21, 2:30 PM',
    address: '742 Evergreen Terrace, Apt 4B, Springfield, NY 10001',
    items: [
      { id: 1, name: 'Organic Hass Avocados', quantity: 2, price: 4.99, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=150&q=80', unit: '4 pack' },
      { id: 8, name: 'Artisan Sourdough Country Loaf', quantity: 1, price: 5.99, image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=150&q=80', unit: '750 g' },
      { id: 5, name: 'Free-Range Golden Brown Eggs', quantity: 1, price: 5.49, image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=150&q=80', unit: 'Dozen' }
    ],
    subtotal: 21.46,
    delivery: 0.00,
    discount: 4.29,
    total: 17.17,
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: 'ORD-97502',
    date: '2026-09-14',
    status: 'Delivered',
    statusColor: 'emerald',
    deliveryTime: 'Sep 14, 10:15 AM',
    address: '742 Evergreen Terrace, Apt 4B, Springfield, NY 10001',
    items: [
      { id: 10, name: 'Wild Alaskan Salmon Fillets', quantity: 2, price: 15.99, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=150&q=80', unit: '2 fillets' },
      { id: 12, name: 'Extra Virgin Olive Oil (Cold-Pressed)', quantity: 1, price: 13.99, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=150&q=80', unit: '750 ml' },
      { id: 4, name: 'Rainbow Cherry Tomatoes', quantity: 2, price: 3.99, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80', unit: '400 g' }
    ],
    subtotal: 53.95,
    delivery: 0.00,
    discount: 10.00,
    total: 43.95,
    paymentMethod: 'Apple Pay'
  }
];
