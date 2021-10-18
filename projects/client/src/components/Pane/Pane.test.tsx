import { create } from 'utils/tests';
import { Pane } from '.';

describe('Pane component', () => {
  it('should match a snapshot', () => {
    const tree = create(<Pane />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
