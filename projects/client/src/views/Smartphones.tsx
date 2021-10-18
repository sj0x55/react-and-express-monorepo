import { ProductType } from '@react-and-express/enums';
import { Filters } from 'containers/filters';
import { MainContent } from 'containers/main-content';
import { ListOfSmartphones } from 'containers/list-of-smartphones';
import { RootLayoutBlock } from 'components/layouts/root';
import { FetchNewData } from 'containers/fetch-new-data';

export const Smartphones = () => {
  return (
    <>
      <RootLayoutBlock>
        <FetchNewData type={ProductType.SMARTPHONES} />
        <Filters />
      </RootLayoutBlock>
      <RootLayoutBlock>
        <MainContent type={ProductType.SMARTPHONES} component={ListOfSmartphones} />
      </RootLayoutBlock>
    </>
  );
};
