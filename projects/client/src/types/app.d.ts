import type { TProduct as TProductBase } from '@react-and-express/types'
import { ProductCondition, ProductType } from "@react-and-express/enums";

export type TDiskFilters = {
  [key in 'capacity.min' | 'capacity.max']: number
}

export type TProductFiltersState = {
  [key in ProductCondition]: boolean;
} & {
  [ProductType.DISKS]: TDiskFilters;
};

export type TProduct = TProductBase & {
  type: ProductType;
  condition: ProductCondition;
};