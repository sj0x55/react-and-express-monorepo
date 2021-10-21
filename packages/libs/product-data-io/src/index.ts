import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import axios from "axios";
import { ProductType } from '@react-and-express/enums';
import { TProduct } from '@react-and-express/types';
import userAgents from './user-agents';

export const getFileName = (type: ProductType) => `${type}-data.json`

export const createDir = (dir: string) => {
  try {
    mkdirSync(dir);
  } catch (err) {
    console.error(`${err}`);
  }
}

export const readDataFromFile = (dir: string, type: ProductType): TProduct[] | null => {
  try {
    return JSON.parse(readFileSync(
      join(dir, getFileName(type))
    ).toString());
  } catch (err) {
    console.error(`${err}`);
    return null;
  }
};

export const writeDataToFile = (dir: string, type: ProductType, data: TProduct[]) => {
  createDir(dir);

  try {
    writeFileSync(
      join(dir, getFileName(type)),
      JSON.stringify(data)
    );
  } catch (err) {
    console.error(`${err}`);
  }
};

export async function fetchContent(url: string) {
  try {
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    const result: { data: string } = await axios.get(url, {
      params: {},
      headers: {
        Pragma: 'no-cache',
        Expires: '0',
        'Cache-Control': 'no-cache',
        'User-Agent': userAgent,
      },
    });

    return result.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const fetchContents = async (urls: string[]) => {
  return (await Promise.all(urls.map((url) => fetchContent(url)))).flat();
};


// export async function fetchContentFromWishList(url: string, featureMap: TFeaturesMap) {
//   const allData = [];
//   const content = await fetchContent(url);
//   const getElementContent = (element: cheerio.Cheerio, selector: string) => element.find(selector).text().trim();
//   const getElementAttr = (element: cheerio.Cheerio, selector: string, attrName: string) => (element.find(selector).attr(attrName) || '').trim();

//   content('[id^="itemInfo_"]').each((_, item) => {
//     const itemInfoElement = content(item);
//     const itemId = ((itemInfoElement.attr('id') || '').match(/^itemInfo_(.+)/) || [])[1];
//     const image = content(`[id="itemImage_${itemId}"]`).find('img').attr('src');
//     const title = getElementContent(itemInfoElement, `#itemName_${itemId}`);
//     const priceForNew = getElementContent(itemInfoElement, `#itemPrice_${itemId} > span:first-child`);
//     const linkForNew = getElementAttr(itemInfoElement, `#itemName_${itemId}`, 'href');
//     const priceForUsed = getElementContent(itemInfoElement, '.itemUsedAndNew > .itemUsedAndNewPrice');
//     const linkForUsed = getElementAttr(itemInfoElement, '.itemUsedAndNew > .itemUsedAndNewLink', 'href');
//     const productFeatures = {};

//     itemInfoElement.find('span:not(:has(*))').map((_, span) => {
//       const spanText = normalizeWhitespaces(content(span).text());
//       const parsedFeatures = parseFeatureMap(featureMap, spanText);

//       Object.assign(productFeatures, parsedFeatures);
//     });

//     allData.push(
//       ...productsFactory(
//         {
//           title,
//           image,
//         },
//         productFeatures,
//       )([
//         priceForNew && {
//           condition: 'new',
//           price: priceForNew,
//           href: linkForNew,
//         },
//         priceForUsed &&
//           priceForUsed !== priceForNew && {
//             condition: 'used',
//             price: priceForUsed,
//             href: linkForUsed,
//           },
//       ]),
//     );
//   });

//   return allData;
// }
