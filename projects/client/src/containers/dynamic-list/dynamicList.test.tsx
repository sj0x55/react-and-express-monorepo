import { render } from 'utils/tests';
import { DynamicList } from '.';
import { prepareValue } from './dynamicList.operations';

describe('DynamicList component', () => {
  it('should render list with few items', () => {
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
    const data: DynamicListItem[] = [
      {
        title: 'WD 5 TB My Passport',
        image: 'https://image1',
        href: 'https://url1',
        condition: 'new',
        features: {
          capacity: 5,
        },
        price: 120.59,
        isPriceChanged: false,
        isPriceDropped: false,
        timestampChanged: 1632167550962,
        prevPrice: null,
      },
      {
        title: 'WD 5 TB My Passport',
        image: 'https://image1',
        href: 'https://url1',
        condition: 'used',
        features: {
          capacity: 5,
        },
        price: 110.59,
        isPriceChanged: false,
        isPriceDropped: false,
        timestampChanged: 1632167550962,
        prevPrice: null,
      },
      {
        title: 'Seagate 8 TB',
        image: 'https://image2',
        href: 'https://url2',
        condition: 'used',
        features: {
          capacity: 8,
        },
        price: 180.99,
        isPriceChanged: true,
        isPriceDropped: true,
        timestampChanged: 1632167550962,
        prevPrice: 219.99,
      },
      {
        title: 'Seagate 8 TB (no image, no date)',
        image: null,
        href: 'https://url2',
        condition: 'used',
        features: {
          capacity: 8,
        },
        price: 180.99,
        isPriceChanged: true,
        isPriceDropped: true,
        timestampChanged: 0,
        prevPrice: 219.99,
      },
    ];

    const { firstChild } = render(<DynamicList config={config} data={data} />);

    expect(firstChild).toMatchSnapshot();
  });
});

describe('dynamicList operations', () => {
  it('should return default value for empty value', () => {
    expect(prepareValue('', { prefix: '$ ', suffix: ' #' })).toBe('-');
    expect(prepareValue(' ', { prefix: '$ ', suffix: ' #' })).toBe('-');
  });

  it('should return a value when used a number', () => {
    expect(prepareValue(123)).toBe('123');
    expect(prepareValue(123.99)).toBe('123.99');
  });

  it('should return a value when used a string', () => {
    expect(prepareValue('test-value')).toBe('test-value');
    expect(prepareValue(' test-value ')).toBe('test-value');
    expect(prepareValue('test-value  with-space')).toBe('test-value  with-space');
  });

  it('should return a value with prefix and suffix when used a string', () => {
    expect(prepareValue('test-value', { prefix: '$ ', suffix: ' #' })).toBe('$ test-value #');
  });
});
