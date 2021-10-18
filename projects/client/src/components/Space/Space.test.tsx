import { create } from 'utils/tests';
import { Space } from '.';

describe('Space component', () => {
  it('should match a snapshot', () => {
    const tree = create(<Space />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
