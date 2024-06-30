import {
  Box,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import { Status } from '../createTaskForm/enums/Status';

const TaskFooter = ({
  id,
  status,
  onStatusChange = (e) => console.log(e),
  onClick = (e) => console.log(e),
}: ITaskFooter) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            color="warning"
            onChange={(e) => onStatusChange(e, id)}
            checked={status === Status.inProgress}
          />
        }
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: '#fff' }}
        onClick={(e) => onClick(e, id)}
      >
        Mark Complete
      </Button>
    </Box>
  );
};

export default TaskFooter;
