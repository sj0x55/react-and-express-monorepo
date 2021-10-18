import styled from 'styled-components';
import { createElement } from 'react';
import { Div } from 'components/dom/Div';

export default styled(({ tagType, children, ...props }) => createElement(tagType || Div, props, children))`
  display: grid;
`;
