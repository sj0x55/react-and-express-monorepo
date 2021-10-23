import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export default (configFilePath: string) => {
  dotenvExpand(dotenv.config({ path: configFilePath }));
};
