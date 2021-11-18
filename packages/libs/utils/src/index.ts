import type { TObject } from '@package/types';

export const enumToArrKeys = <T>(enumObj: T, appendValues = false): string[] => {
  return (Object.keys(enumObj) as Array<string>).reduce((acc: string[], curr: string) => {
    if (typeof curr === 'string' && isNaN(Number(curr))) {
      const value = (enumObj as any)[curr as string];

      if (!acc.includes(value)) {
        acc.push(curr);

        if (appendValues) {
          acc.push(value);
        }
      }
    }

    return acc;
  }, []);
};

export const arrayToObject = <T>(propKeyNames: string | string[], items: T[]) => {
  const flatPropKeyNames = [propKeyNames].flat();
  const obj: {
    [key: string]: T & { index: number };
  } = {};

  items.forEach((item, index) => {
    const key = flatPropKeyNames.map((key) => item[key as keyof T]).join('-');

    obj[key] = { ...item, index };
  });

  return obj;
};

export const normalizeWhitespaces = (str: string) => {
  return str.replace(/[/\s]+/gi, ' ').trim();
};
