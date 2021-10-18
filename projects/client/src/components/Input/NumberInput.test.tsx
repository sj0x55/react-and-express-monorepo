import { create } from 'utils/tests';
import { NumberInput } from '.';

const getNumberInputElement = () => {
  return <NumberInput />;
};

describe('NumberInput component', () => {
  it('should match a snapshot', () => {
    const tree = create(getNumberInputElement());

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
