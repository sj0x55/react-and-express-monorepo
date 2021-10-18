import { get } from 'lodash';
import { ProductType } from '@react-and-express/enums';
import { useDispatch, useSelector } from 'app/hooks';
import { actions } from 'app/slice';
import { selectProductFilters } from 'app/selectors';
import { Label } from 'components/dom/Label';
import { Div } from 'components/dom/Div';
import { Pane } from 'components/Pane';
import { NumberInput } from 'components/Input';
import styled from 'styled-components';

const DivWrapper = styled(Div)`
  margin-bottom: 5px;
`;

export const FiltersOfDisks = () => {
  const dispatch = useDispatch();
  const diskFilters = useSelector(selectProductFilters(ProductType.DISKS));
  const capacityMin = get(diskFilters, 'capacity.min');
  const capacityMax = get(diskFilters, 'capacity.max');
  const updateFilterCapacity = (key: string, value: string) => {
    dispatch(
      actions.updateProductFilter({
        type: ProductType.DISKS,
        property: `capacity.${key}`,
        value: Number(value),
      }),
    );
  };

  return (
    <Pane title="Capacity">
      <DivWrapper>
        <NumberInput
          value={`${capacityMin || ''}`}
          placeholder="min"
          onChange={(e) => updateFilterCapacity('min', e.target.value)}
        />
        <Label> min</Label>
      </DivWrapper>
      <DivWrapper>
        <NumberInput
          value={`${capacityMax || ''}`}
          placeholder="max"
          onChange={(e) => updateFilterCapacity('max', e.target.value)}
        />
        <Label> max</Label>
      </DivWrapper>
    </Pane>
  );
};
