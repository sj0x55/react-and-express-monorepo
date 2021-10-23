import type { TProduct } from '@package/types';
import { join } from 'path';
import { ProductType } from '@package/enums';
import { enumToArrKeys } from '@package/utils';
import { fetchContents, readDataFromFile, writeDataToFile } from '@package/product-data-io';
import { mergeData, DataParser, TFeatureMapObject } from '@package/product-data-parser';
import { Request, Response } from 'express';

const dataDir = join(__dirname, '../../data');

export const productNameToType = (name: string): ProductType | null => {
  name = (name || '').toUpperCase();

  if (name && enumToArrKeys(ProductType).includes(name)) {
    return ProductType[name as keyof typeof ProductType];
  } else {
    return null;
  }
};

export const getDataController = async (req: Request, res: Response) => {
  const type = productNameToType(req.params.name);

  if (type) {
    res.json(await readDataFromFile(dataDir, type));
  }
};

export const updateDataController = async (req: Request, res: Response) => {
  const newData: TProduct[] = [];
  const parser = new DataParser();
  const amazonUkBaseUrl = 'https://www.amazon.co.uk';
  const amazonDeBaseUrl = 'https://www.amazon.de';
  const urlQueryParams = 'filter=unpurchased&sort=price-asc';
  const capacityRegExp = /Capacity[\\n\s]?:[\\n\s]?(\d+)\s?(GB|TB)/i;
  const sizeRegExp = /Size Name[\\n\s]+:[\\n\s]+(.+)/i;
  const colorRegExp = /Colour[\\n\s]+:[\\n\s]+(.+)/i;
  const productType = productNameToType(req.params.name);
  const parseNewContents = (
    productType: ProductType,
    baseUrl: string,
    contents: (string | null)[],
    featureMapObject: TFeatureMapObject = {},
  ) => {
    return contents
      .map((content) => (content && parser.parse(productType, content, featureMapObject)) || null)
      .flat()
      .filter((item: TProduct | null): item is TProduct => {
        return item !== null;
      })
      .map((product) => ({ ...product, href: `${baseUrl}${product.href}` }));
  };

  if (productType === ProductType.DISKS) {
    newData.push(
      ...parseNewContents(
        productType,
        amazonUkBaseUrl,
        await fetchContents([
          `${amazonUkBaseUrl}/hz/wishlist/ls/2KE9LBKCL3WBX?${urlQueryParams}`,
          `${amazonUkBaseUrl}/hz/wishlist/ls/202GH96LTIUGX?${urlQueryParams}`,
          `${amazonUkBaseUrl}/hz/wishlist/ls/3UTIRVZK6MNXU?${urlQueryParams}`,
          `${amazonUkBaseUrl}/hz/wishlist/ls/B3BSCZ23IGZU?${urlQueryParams}`,
          `${amazonUkBaseUrl}/hz/wishlist/ls/2CRH7UTBN1RW9?${urlQueryParams}`,
          `${amazonUkBaseUrl}/hz/wishlist/ls/282MWNCIB5SRV?${urlQueryParams}`,
        ]),
        {
          capacity: [capacityRegExp, (str: RegExpMatchArray) => Number(str[1])],
          capacityUnit: [capacityRegExp, (str: RegExpMatchArray) => str[2]],
        },
      ),
    );
  } else if (productType === ProductType.SMARTPHONES) {
    newData.push(
      ...parseNewContents(
        productType,
        amazonUkBaseUrl,
        await fetchContents([`${amazonUkBaseUrl}/hz/wishlist/genericItemsPage/P2ZKOL4X451E?${urlQueryParams}`]),
        {
          size: sizeRegExp,
          color: colorRegExp,
        },
      ),
    );
  } else if (productType === ProductType.OTHER) {
    newData.push(
      ...parseNewContents(
        productType,
        amazonUkBaseUrl,
        await fetchContents([
          `${amazonUkBaseUrl}/hz/wishlist/ls/2HMPV7AU1IQUH?${urlQueryParams}`,
          `${amazonUkBaseUrl}/hz/wishlist/ls/34AZXQ9DIXXUM?${urlQueryParams}`,
          `${amazonUkBaseUrl}/hz/wishlist/ls/1ZTW8TPP194QS?${urlQueryParams}`,
        ]),
      ),
    );

    newData.push(
      ...parseNewContents(
        productType,
        amazonDeBaseUrl,
        await fetchContents([`${amazonDeBaseUrl}/hz/wishlist/ls/19MQHNQNMJSXW?${urlQueryParams}`]),
      ),
    );
  }

  if (productType) {
    const oldData = await readDataFromFile(dataDir, productType);
    const data = mergeData(oldData || [], newData);

    writeDataToFile(dataDir, productType, data);
    res.json(data);
  } else {
    res.status(400);
    res.json({ error: `Product type "${productType}" isn't correct.` });
  }
};
