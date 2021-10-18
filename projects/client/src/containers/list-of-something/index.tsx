import { DynamicList } from 'containers/dynamic-list';
import { sort } from 'modules/data';

export const ListOfSomething = ({ data }: ListOfSomethingProps) => {
  const config: DynamicListConfig[] = [
    {
      name: 'Image',
      type: 'image',
      colSize: '120px',
      align: 'center',
      dataPropertyName: 'image',
    },
    {
      name: 'Price',
      type: 'price',
      colSize: '200px',
      align: 'center',
      dataPropertyName: 'price',
    },
    {
      name: 'Condition',
      type: 'text',
      colSize: '150px',
      align: 'center',
      dataPropertyName: 'condition',
    },
    {
      name: 'Name',
      type: 'link',
      colSize: '1fr',
      dataPropertyName: 'title',
    },
  ];

  return <DynamicList config={config} data={sort(data, 'price')} />;
};
