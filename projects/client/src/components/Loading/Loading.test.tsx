import { create } from 'utils/tests';
import { Loading } from '.';

describe('Loading component', () => {
  it('should match a snapshot', () => {
    const tree = create(<Loading />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
