import { act } from '@testing-library/react';
import { create, render, screen } from 'utils/tests';
import { Timer } from '.';

describe('Timer component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should left x time and call callbacxk', () => {
    const cb = jest.fn();

    act(() => {
      render(<Timer duration={5} cb={cb} />);
      jest.advanceTimersByTime(6000);
    });

    expect(screen.getByText('-1')).toBeInTheDocument();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should match a snapshot', () => {
    const tree = create(<Timer duration={300} repeat={true} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
