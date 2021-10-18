import { create } from 'utils/tests';
import { Text } from '.';

describe('Text component', () => {
  it('should match a snapshot', () => {
    const tree = create(<Text>Hello World!</Text>);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match a snapshot with bold, block and size props', () => {
    const tree = create(
      <Text bold={true} block={true} size={'xxl'}>
        Hello World!
      </Text>,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
