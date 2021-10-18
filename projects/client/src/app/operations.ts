import type { TProduct, TProductFiltersState } from 'types/app';
import { HttpMethod, ProductCondition } from '@react-and-express/enums';
import { info, error } from 'modules/logger';
import * as fetch from 'modules/fetch';

export const fetchData = async (method: HttpMethod, type: string): Promise<TProduct[]> => {
  let doFetch = async (url: string) => {
    info(`Fetching data from: ${url}`);

    if (method === HttpMethod.GET) {
      return await fetch.GET<TProduct[]>(url);
    } else if (method === HttpMethod.PUT) {
      return await fetch.PUT<TProduct[]>(url);
    } else {
      return [];
    }
  }

  try {
    return await doFetch(`${process.env.REACT_APP_LOCAL_SERVER_URL}/data/${type}`);
  } catch (err) {
    error(`${err}`);
    return await doFetch(`${process.env.REACT_APP_REMOTE_SERVER_URL}/data/${type}`);
  }
};

export const fetchDataPayloadCreator = async ([method, type]: [HttpMethod, string]) => {
  try {
    return await fetchData(method || HttpMethod.GET, type);
  } catch (err) {
    error(`${err}`);
    return [];
  }
};

export const filterData = (options: TProductFiltersState) => (item: TProduct) => {
  const isItemNew = item.condition === ProductCondition.NEW;
  const isItemUsed = item.condition === ProductCondition.USED;

  if ((isItemNew && !options.new) || (isItemUsed && !options.used)) {
    return false;
  }

  return true;
};