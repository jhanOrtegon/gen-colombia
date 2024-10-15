import React from 'react';
import { Dropdown } from '@nextui-org/react';

export const SelectCustom = ({selected, setSelected, selectedValue, options, color='error' }:any) => {
  
  return (
    <Dropdown>
      <Dropdown.Button shadow color={color} type='button' css={{ tt: 'capitalize' }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="selection actions"
        color={color}
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {
          options.map((item:any)=>(
            <Dropdown.Item key={item}>{item}</Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};
