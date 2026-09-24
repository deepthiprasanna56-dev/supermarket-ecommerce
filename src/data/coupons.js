export const coupons = [
  {
    code: 'FRESH20',
    type: 'percent',
    discount: 20,
    minSpend: 30,
    description: '20% off on all orders over $30'
  },
  {
    code: 'SUPERMARKET',
    type: 'fixed',
    discount: 10,
    minSpend: 40,
    description: '$10 off on your supermarket haul over $40'
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    discount: 4.99,
    minSpend: 0,
    description: 'Free doorstep express delivery on any order'
  },
  {
    code: 'ORGANIC15',
    type: 'percent',
    discount: 15,
    minSpend: 25,
    description: '15% off fresh produce and organic items'
  }
];
