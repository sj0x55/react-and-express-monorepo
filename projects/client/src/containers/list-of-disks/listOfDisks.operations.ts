import type { TDiskFilters } from "types/app";

export const calcPricePerTB = (price?: number | null, capacity?: number): number | null => {
  if (capacity && price) {
    return parseFloat((price / capacity).toFixed(2));
  } else {
    return null;
  }
};

export const prepareData = (data: DiskItem[]): DiskItem[] => {
  return data.map((item) => {
    const { features, price, prevPrice } = item;
    const { capacity, capacityUnit } = features || {};
    const capacityTB = capacityUnit === 'GB' ? (capacity || 0) / 1024 : capacity;

    return {
      ...item,
      features: { ...features },
      pricePerTB: calcPricePerTB(price, capacityTB),
      prevPricePerTB: calcPricePerTB(prevPrice, capacityTB),
    };
  });
};

export const filterData = (filters: TDiskFilters, items: DiskItem[]) => {
  return items.filter((item) => {
    const { capacity } = item.features;
    const { 
      'capacity.min': capacityMin, 
      'capacity.max': capacityMax
    } = filters || {};

    if (capacity) {
      return !((capacityMin && capacity < capacityMin) || (capacityMax && capacity > capacityMax));
    } else {
      return false;
    }

  });
};
