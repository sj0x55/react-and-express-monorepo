import type { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'app/hooks';
import { Pane } from 'components/Pane';
import { Label } from 'components/dom/Label';
import { Checkbox } from 'components/dom/Checkbox';
import { actions } from 'app/slice';
import { selectIsNew, selectIsUsed } from 'app/selectors';
import { Div } from 'components/dom/Div';

export const Filters = () => {
  const dispatch = useDispatch();
  const isNew = useSelector(selectIsNew);
  const isUsed = useSelector(selectIsUsed);
  const handleToggleNew = (event: ChangeEvent<HTMLInputElement>) => dispatch(actions.toggleIsNew(event.target.checked));
  const handleToggleUsed = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(actions.toggleIsUsed(event.target.checked));

  return (
    <Pane title="Condition">
      <Div>
        <Checkbox data-test="newConditionCheckbox" checked={isNew} onChange={handleToggleNew} />
        <Label> New</Label>
      </Div>
      <Div>
        <Checkbox data-test="usedConditionCheckbox" checked={isUsed} onChange={handleToggleUsed} />
        <Label> Used</Label>
      </Div>
    </Pane>
  );
};
