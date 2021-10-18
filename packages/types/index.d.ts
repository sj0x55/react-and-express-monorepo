import { ProductType } from "@react-and-express/enums";

export type TObject = Record<string, unknown>;

export type TProduct = {
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