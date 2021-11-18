import type { RootState } from 'types/store';
import { ProductType } from '@package/enums';
import { get } from 'lodash';
import { StateStatus } from './enums';

export const selectStatus = (state: RootState) => get(state.app, 'status');
export const isLoading = (state: RootState) => selectStatus(state) === StateStatus.LOADING;
export const selectData = (state: RootState) => get(state.app, 'data');
export const selectFilters = (state: RootState) => get(state.app, 'filters');
export const selectProductFilters = (type: ProductType) => (state: RootState) => get(state.app, ['filters', type]);
export const selectIsNew = (state: RootState) => get(selectFilters(state), 'isNew');
export const selectIsUsed = (state: RootState) => get(selectFilters(state), 'isUsed');
