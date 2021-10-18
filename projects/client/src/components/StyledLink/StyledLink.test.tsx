import { render, mockComponent } from 'utils/tests';
import { StyledLink } from '.';

jest.mock('react-router-dom', () => ({
  NavLink: mockComponent(),
}));

describe('StyledLink component', () => {
  it('should match a snapshot', () => {
    const { firstChild } = render(<StyledLink to="..." />);

    expect(firstChild).toMatchSnapshot();
  });
});
