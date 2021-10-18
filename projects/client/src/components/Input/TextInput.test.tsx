import { create } from 'utils/tests';
import { TextInput } from '.';

const getTextInputElement = () => {
  return <TextInput />;
};

describe('TextInput component', () => {
  it('should match a snapshot', () => {
    const tree = create(getTextInputElement());

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
