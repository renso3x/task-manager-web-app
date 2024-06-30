import React from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {
  SelectChangeEvent,
} from '@mui/material/Select';
import { ISelectField } from './interfaces/ISelectField';

const TaskSelectField = ({
  value = '',
  label = 'Select Box',
  name = 'selectBox',
  onChange = (e) => console.log(e),
  items = [{ value: '', label: 'Add Items' }],
}: ISelectField) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="status">{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={`${name}-label-id`}
        value={value}
        label={label}
        name={name}
        onChange={onChange}
      >
        {items.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TaskSelectField;
