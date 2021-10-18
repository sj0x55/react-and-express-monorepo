type DynamicListItem = Product;

type DataFactory<T> = (item: DynamicListConfig) => T;

type DynamicListConfig = {
  name: string;
  type: string;
  colSize: string;
  textSize?: string;
  align?: string;
  dataPropertyName?: string;
} & {
  [key: string]: DynamicListConfig[keyof DynamicListConfig];
};

type DynamicListConfigProps = {
  config: DynamicListConfig[];
  data: DynamicListItem[];
};

interface DynamicListState {}
