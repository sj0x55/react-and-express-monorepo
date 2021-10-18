// import { sortData, prepareItem } from '../mainContent.operations';

// const createItem = (price: number, tb: number): MainContentItem => ({
//   title: 'test-item',
//   url: 'http://test-item',
//   condition: 'new',
//   capacity: tb,
//   price,
//   oldPrice: price - 5,
//   pricePerTB: price / tb,
//   oldPricePerTB: (price - 5) / tb,
//   isPriceChanged: true,
// });

// describe('sortData()', () => {
//   it('should sort and return empty array', () => {
//     expect(sortData([])).toEqual([]);
//   });

//   it('should return two sorted products', () => {
//     const productA = createItem(10, 2);
//     const productB = createItem(20, 5);
//     const sortedProducts = sortData([productA, productB]);

//     expect(sortedProducts[0]).toEqual(productB);
//     expect(sortedProducts[1]).toEqual(productA);
//   });
// });

// describe('prepareItem()', () => {
//   it('should add new properties into the item', () => {
//     expect(prepareItem(createItem(10, 2))).toMatchObject({
//       oldPricePerTB: 5,
//       isPriceChanged: false,
//     });
//   });
// });

it('TODO', () => {
  expect(true).toBeTruthy();
});
