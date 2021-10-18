import { render, create, screen } from 'utils/tests';
import { formatDistanceToNow } from 'date-fns';
import { DateFormat, TDateProp } from '.';

const getDateFormatElement = (date: TDateProp) => {
  return <DateFormat date={date} />;
};

jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(),
}));

const testDate = new Date(2022, 1, 1);
const cases = [
  ['string', `${testDate}`],
  ['number', testDate.getTime()],
];

describe('DateFormat component', () => {
  it.each(cases)('should render a date element from date as %s', (_, date) => {
    (formatDistanceToNow as jest.Mock).mockReturnValueOnce('x time distance');

    render(getDateFormatElement(date));
    expect(screen.getByText('x time distance')).toBeInTheDocument();
    expect(formatDistanceToNow).toHaveBeenCalledWith(new Date(date));
  });

  it('should match a snapshot', () => {
    const date = new Date(2022, 1, 1);
    const tree = create(getDateFormatElement(String(date)));

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
