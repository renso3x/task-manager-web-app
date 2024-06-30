import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IDateField } from './interfaces/IDateField';

const TaskDateField = ({
  onChange = (e) => console.log(e),
  value = new Date(),
}: IDateField) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Task Date"
        format="dd/MM/yyyy"
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default TaskDateField;
