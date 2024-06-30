import { TextField } from '@mui/material';
import { ITextField } from './interfaces/ITextField';

const TaskDescriptionField = ({
  onChange = (e) => console.log(e),
  disabled,
}: ITextField) => {
  return (
    <TextField
      id="description"
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      name="description"
      multiline
      rows={4}
      fullWidth
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default TaskDescriptionField;
