import babelJest from 'babel-jest';
import babelConfig from '@package/babel-config';

export default babelJest.createTransformer ? babelJest.createTransformer(babelConfig) : {};
