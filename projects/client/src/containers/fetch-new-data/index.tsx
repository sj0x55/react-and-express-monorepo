import { useCallback } from 'react';
import { HttpMethod } from '@package/enums';
import { useSelector, useDispatch } from 'app/hooks';
import { isLoading } from 'app/selectors';
import { fetchDataAsync } from 'app/slice';
import { Pane } from 'components/Pane';
import { Button } from 'components/Button';
import { TFetchNewDataProps } from './fetchNewData';

export const FetchNewData = ({ type }: TFetchNewDataProps) => {
  const dispatch = useDispatch();
  const isLoadingFlag = useSelector(isLoading);
  const onClickButton = useCallback(() => {
    if (!isLoadingFlag) {
      dispatch(fetchDataAsync([HttpMethod.PUT, type]));
    }
  }, [dispatch, type, isLoadingFlag]);

  return (
    <Pane border={false} padding={false} background={false}>
      <Button onClick={onClickButton} disabled={isLoadingFlag} stretch={true}>
        Fetch new data
      </Button>
    </Pane>
  );
};
