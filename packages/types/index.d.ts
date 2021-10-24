import { ProductType } from '@package/enums';

export type TObject = Record<string, unknown>;

// export type TProduct = {
//   type: ProductType;
//   condition: string;
//   title: string;
//   image?: string;
//   href?: string;
//   price: number;
//   prevPrice?: number | null;
//   timestampChanged?: number;
//   features: TObject;
// };

declare type TProduct = {
  type: ProductType;
  condition: string;
  title: string;
  image?: string;
  href?: string;
  price: number;
  prevPrice?: number | null;
  timestampChanged?: number;
  features: TObject;
};
