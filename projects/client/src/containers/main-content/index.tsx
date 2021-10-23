import { useCallback, useEffect } from 'react';
import { HttpMethod } from '@package/enums';
import { useSelector, useDispatch } from 'app/hooks';
import { Loading } from 'components/Loading';
import { ContentLayoutGrid } from 'components/layouts/content';
import { Text } from 'components/Text';
import { isLoading, selectData, selectFilters } from 'app/selectors';
import { fetchDataAsync, actions } from 'app/slice';
import { filterData } from 'app/operations';
import { Pane } from 'components/Pane';
import { Timer } from 'components/Timer';
import { Spinner } from 'components/Spinner';

export const MainContent = ({ type, component }: MainContentProps) => {
  const timerDuration = 30;
  const ContentComponent = component;
  const dispatch = useDispatch();
  const isLoadingFlag = useSelector(isLoading);
  const filters = useSelector(selectFilters);
  let data = useSelector(selectData) || [];
  const dispatchWrapper = useCallback(() => {
    dispatch(fetchDataAsync([HttpMethod.GET, type]));
  }, [dispatch, type]);

  if (data.length > 0) {
    data = data.filter(filterData(filters));
  }

  useEffect(() => {
    dispatch(actions.cleanData());
    dispatchWrapper();
  }, [dispatchWrapper, dispatch]);

  return (
    <>
      <Pane align="right">
        {isLoadingFlag && <Spinner />}
        <Text size="s">
          <Text bold={true}>Next refresh in: </Text>
          <Timer duration={timerDuration} cb={dispatchWrapper} repeat={true} />
          s.
        </Text>
      </Pane>

      {isLoadingFlag && !data.length ? (
        <Loading />
      ) : data.length > 0 ? (
        <ContentLayoutGrid>
          <ContentComponent data={data} />
        </ContentLayoutGrid>
      ) : (
        <Text>No data!</Text>
      )}
    </>
  );
};
