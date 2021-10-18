import { render, create, screen } from 'utils/tests';
import { Button } from '.';

const getButtonElement = (stretch = false) => {
  return <Button stretch={stretch}>Click me!</Button>;
};

const jsonButtonElement = (stretch = false) => {
  return create(getButtonElement(stretch)).toJSON();
};

describe('Button component', () => {
  it('should render a button', () => {
    render(getButtonElement());

    expect(screen.getByRole('button', { name: /Click me!/i })).toBeInTheDocument();
  });

  it('should stretch a button', () => {
    expect(jsonButtonElement(true)).toHaveStyleRule('width', '100%');
  });

  it('should match a snapshot', () => {
    expect(jsonButtonElement()).toMatchSnapshot();
  });

  it('should match a snapshot with stretch prop', () => {
    expect(jsonButtonElement(true)).toMatchSnapshot();
  });
});
