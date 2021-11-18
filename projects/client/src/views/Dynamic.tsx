import { ProductType } from '@package/enums';
import { Filters } from 'containers/filters';
import { MainContent } from 'containers/main-content';
import { RootLayoutBlock } from 'components/layouts/root';
import { FetchNewData } from 'containers/fetch-new-data';
import { DynamicList } from 'containers/dynamic-list'; // Work in progress.

export const Dynamic = () => {
  return (
    <>
      <RootLayoutBlock>
        <FetchNewData type={ProductType.DISKS} />
        <Filters />
      </RootLayoutBlock>
      <RootLayoutBlock>
        <MainContent type={ProductType.DISKS} component={DynamicList} />
      </RootLayoutBlock>
    </>
  );
};
