import {
  ChoiceGroup,
  ChoiceGroupPropOnChange,
} from '@consta/uikit/ChoiceGroup';

import { items } from '../data/data';
import type { Item } from '../data/data';

const ButtonGroup = ({
  value,
  setValue,
}: {
  value: Item;
  setValue: React.Dispatch<React.SetStateAction<Item>>;
}) => {
  const handleChange: ChoiceGroupPropOnChange<Item, false> = ({ value }) => {
    setValue(value);
  };

  return (
    <ChoiceGroup
      value={value}
      onChange={handleChange}
      items={items}
      getItemLabel={(item) => item.name}
      name="ChoiceGrouple"
      multiple={false}
      size="xs"
      className="button"
    />
  );
};

export default ButtonGroup;
