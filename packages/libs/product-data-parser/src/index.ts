import type { TProduct } from '@react-and-express/types';
import { arrayToObject } from '@react-and-express/utils';

export * from './DataParser'

export const mergeData = (oldPoductData: TProduct[], newProductData: TProduct[]) => {
  const oldPoductDataObj = arrayToObject<TProduct>(['condition', 'href'], oldPoductData);
  const newProductDataObj = arrayToObject<TProduct>(['condition', 'href'], newProductData);

  Object.entries(newProductDataObj).forEach(([key, newItem]) => {
    const currentItem = oldPoductDataObj[key] || {};
    const currTimestampChanged = currentItem.timestampChanged || Date.now();
    const prevPrice = currentItem.prevPrice || 0;
    const currPrice = currentItem.price || 0;
    const newPrice = newItem.price || 0;

    if (currPrice && newPrice != currPrice) {
      // newProductData[newItem.index].isPriceChanged = true;
      newProductData[newItem.index].timestampChanged = Date.now();

      if (newPrice < currPrice) {
        newProductData[newItem.index].prevPrice = currPrice;
      } else if (newPrice > currPrice || newPrice >= prevPrice) {
        newProductData[newItem.index].prevPrice = null;
      } else {
        newProductData[newItem.index].prevPrice = prevPrice;
      }
    } else {
      // newProductData[newItem.index].isPriceChanged = false;
      newProductData[newItem.index].timestampChanged = currTimestampChanged;
      newProductData[newItem.index].prevPrice = prevPrice || null;
    }
  });

  return newProductData;
};
