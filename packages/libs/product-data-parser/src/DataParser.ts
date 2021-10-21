import type { TProduct } from "@react-and-express/types";
import cheerio from "cheerio";
import { ProductCondition, ProductType } from '@react-and-express/enums';
import { normalizeWhitespaces } from '@react-and-express/utils';
import { priceToNumber } from "@react-and-express/money";

export type TFeatureMap = [RegExp, ((matched: RegExpMatchArray) => unknown) | null] | RegExp;

export type TFeatureMapObject = {
  [key: string]: TFeatureMap;
};

export class DataParser {
  parseFeatureMap(value: string, featureMapObject: TFeatureMapObject) {
    const productFeatures: {
      [key: string]: unknown
    } = {};
  
    if (value && typeof value === 'string') {
      Object.entries(featureMapObject).forEach(([key, rexExp]) => {
        const parseValue = (...args: [RegExp, ((matched: RegExpMatchArray) => unknown) | null]) => {
          const matched = value.match(args[0]);
          const matcherFn = args[1];
  
          return matched && (matcherFn ? matcherFn(matched) : matched[1].trim());
        };
  
        if (!Array.isArray(rexExp)) {
          rexExp = [rexExp, null];
        }
        
        const matchedValue = parseValue(...rexExp);
  
        if (!productFeatures[key] && matchedValue) {
          productFeatures[key] = matchedValue;
        }
      });
    }
  
    return productFeatures;
  };

  parse(type: ProductType, content: string, featureMapObject: TFeatureMapObject = {}) {
    const data: TProduct[] = [];
    const rootElement = cheerio.load(content);
    const getElementContent = (element: cheerio.Cheerio, selector: string) => element.find(selector).text().trim();
    const getElementAttr = (element: cheerio.Cheerio, selector: string, attrName: string) => (element.find(selector).attr(attrName) || '').trim();  

    rootElement('[id^="itemInfo_"]').each((_, item) => {
      const productVariants: Partial<TProduct>[] = []
      const itemInfoElement = rootElement(item);
      const itemId = ((itemInfoElement.attr('id') || '').match(/^itemInfo_(.+)/) || [])[1];
      const image = rootElement(`[id="itemImage_${itemId}"]`).find('img').attr('src');
      const title = getElementContent(itemInfoElement, `#itemName_${itemId}`);
      const priceForNew = priceToNumber(getElementContent(itemInfoElement, `#itemPrice_${itemId} > span:first-child`));
      const priceForUsed = priceToNumber(getElementContent(itemInfoElement, '.itemUsedAndNew > .itemUsedAndNewPrice'));
      const linkForNew = getElementAttr(itemInfoElement, `#itemName_${itemId}`, 'href');
      const linkForUsed = getElementAttr(itemInfoElement, '.itemUsedAndNew > .itemUsedAndNewLink', 'href');
      const productFeatures = {};
  
      itemInfoElement.find('span:not(:has(*))').map((_, span) => {
        const spanText = normalizeWhitespaces(rootElement(span).text());
        const parsedFeatures = this.parseFeatureMap(spanText, featureMapObject);
  
        Object.assign(productFeatures, parsedFeatures);
      });
    
      if (priceForNew) {
        data.push({
          type,
          title,
          image,
          href: linkForNew,
          price: priceToNumber(priceForNew),
          condition: ProductCondition.NEW,
          features: productFeatures
        })
      }

      if (priceForUsed && priceForUsed !== priceForNew) {
        data.push({
          type,
          title,
          image,
          href: linkForUsed,
          price: priceToNumber(priceForUsed),
          condition: ProductCondition.USED,
          features: productFeatures
        })
      }
    });

    return data;
  }
}