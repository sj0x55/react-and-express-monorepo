import { ProductType } from '@package/enums';
import { Filters } from 'containers/filters';
import { MainContent } from 'containers/main-content';
import { ListOfSomething } from 'containers/list-of-something';
import { RootLayoutBlock } from 'components/layouts/root';
import { FetchNewData } from 'containers/fetch-new-data';

export const Something = () => {
  return (
    <>
      <RootLayoutBlock>
        <FetchNewData type={ProductType.OTHER} />
        <Filters />
      </RootLayoutBlock>
      <RootLayoutBlock>
        <MainContent type={ProductType.OTHER} component={ListOfSomething} />
      </RootLayoutBlock>
    </>
  );
};
