import babelJest from 'babel-jest';
import babelConfig from '@react-and-express/babel-config';

export default babelJest.createTransformer ? babelJest.createTransformer(babelConfig) : {};
