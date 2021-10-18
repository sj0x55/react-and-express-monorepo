import { render, create, screen } from 'utils/tests';
import { Link } from '.';

const getLinkElement = () => {
  return <Link href="#">Link</Link>;
};

describe('Link component', () => {
  it('should render a link', () => {
    render(getLinkElement());
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should match a snapshot', () => {
    const tree = create(getLinkElement());

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
