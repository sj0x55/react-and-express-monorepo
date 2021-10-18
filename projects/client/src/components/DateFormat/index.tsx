import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { Span } from 'components/dom/Span';

export type TDateProp = string | number;

export type TDateProps = {
  date: TDateProp;
};

export const Wrapper = styled(Span)``;
export const DateFormat = ({ date }: TDateProps) => {
  return <Wrapper>{formatDistanceToNow(new Date(date))}</Wrapper>;
};
