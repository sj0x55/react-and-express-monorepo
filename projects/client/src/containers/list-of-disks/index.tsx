import { useSelector } from 'react-redux';
import { ProductType } from '@package/enums';
import { selectProductFilters } from 'app/selectors';
import { DynamicList } from 'containers/dynamic-list';
import { sort } from 'modules/data';
import { prepareData, filterData } from './listOfDisks.operations';

export const ListOfDisks = ({ data }: ListOfDisksProps) => {
  const diskFilters = useSelector(selectProductFilters(ProductType.DISKS));
  const sortByPricePerTB = (data: DiskItem[]) => sort(data, 'pricePerTB');
  const config: DynamicListConfig[] = [
    {
      name: 'Image',
      type: 'image',
      colSize: '120px',
      align: 'center',
      dataPropertyName: 'image',
    },
    {
      name: 'Price per TB',
      type: 'text',
      colSize: '200px',
      align: 'center',
      dataPropertyName: 'pricePerTB',
      dataPrefix: '£ ',
    },
    {
      name: 'Price',
      type: 'text',
      colSize: '200px',
      align: 'center',
      dataPropertyName: 'price',
      dataPrefix: '£ ',
    },
    {
      name: 'Capacity',
      type: 'text',
      colSize: '150px',
      align: 'center',
      dataPropertyName: 'features.capacity',
      dataSuffix: ' TB',
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

  return <DynamicList config={config} data={sortByPricePerTB(filterData(diskFilters, prepareData(data)))} />;
};
