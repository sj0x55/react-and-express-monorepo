import { create } from 'utils/tests';
import { Navigation } from '.';

jest.mock('components/StyledLink');

it('should match a snapshot', () => {
  const tree = create(<Navigation />);

  expect(tree.toJSON()).toMatchSnapshot();
});
