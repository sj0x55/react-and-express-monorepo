import { render, create, screen } from 'utils/tests';
import { Image } from '.';
import reactLogo from 'static/images/react-logo.png';

const getImageElement = (src: string) => {
  return <Image src={src} alt="React image" />;
};

describe('Image component', () => {
  it('should render an image', () => {
    render(getImageElement(reactLogo));
    expect(screen.getByAltText('React image')).toBeInTheDocument();
  });

  it('should match a snapshot', () => {
    const tree = create(getImageElement(reactLogo));

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
