import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import { advanceTo } from 'jest-date-mock';

advanceTo(new Date(2000, 1, 1, 0, 0, 0));
