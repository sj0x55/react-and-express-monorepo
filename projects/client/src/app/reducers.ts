import type { TAppState } from 'types/slice';
import type { TProduct } from 'types/app';
import { ProductType } from '@package/enums';
import { set } from 'lodash';
import { PayloadAction } from '@reduxjs/toolkit';

export const cleanData = (state: TAppState) => {
  state.data = [];
};

export const toggleIsNew = (state: TAppState, action: PayloadAction<boolean>) => {
  state.filters.isNew = action.payload;
};

export const toggleIsUsed = (state: TAppState, action: PayloadAction<boolean>) => {
  state.filters.isUsed = action.payload;
};

export const updateProductFilter = (
  state: TAppState,
  action: PayloadAction<{ type: ProductType; property: string; value: unknown }>,
) => {
  const { type, property, value } = action.payload;

  set(state.filters, [type, property], value);
};

export const setLoadingStatus = (state: TAppState) => {
  state.status = 'loading';
};

export const setFulfilledStatus = (state: TAppState, action: PayloadAction<TProduct[]>) => {
  state.status = 'idle';
  state.data = action.payload;
};
