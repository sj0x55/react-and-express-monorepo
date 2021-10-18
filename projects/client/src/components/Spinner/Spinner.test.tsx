import { create } from 'utils/tests';
import { Spinner } from '.';

describe('Spinner component', () => {
  it('should match a snapshot', () => {
    const tree = create(<Spinner />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
