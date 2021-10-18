type MainContentProps = {
  type: string;
  component: ElementType;
};

type MainContentItemJsonSchemaFeatures = {
  [key: string]: string | number;
};

type MainContentItemJsonSchema = {
  condition: string;
  title: string;
  image: string;
  href: string;
  price: number;
  prevPrice: number | null;
  features: MainContentItemJsonSchemaFeatures;
  isPriceChanged: boolean;
  timestampChanged: number;
};

type MainContentItem = MainContentItemJsonSchema & {
  condition: 'new' | 'used';
  isPriceDropped: boolean;
} & {
  [key: string]: MainContentItem[keyof MainContentItem];
};

interface MainContentState {
  data: MainContentItem[];
  isNew: boolean;
  isUsed: boolean;
  status: 'idle' | 'loading' | 'failed';
  filters: {
    [key: string]: string | number | boolean | null;
  };
}
