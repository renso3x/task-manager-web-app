import { Box } from '@mui/material';
import TaskHeader from './taskHeader';
import TaskDescription from './taskDescription';
import TaskFooter from './taskFooter';
import { ITask } from './interfaces/ITask';
import { Status } from '../createTaskForm/enums/Status';
import { Priority } from '../createTaskForm/enums/Priority';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

const Task = ({
  title = 'Test TItle',
  date = new Date(),
  description = 'Lore ipsum',
  priority = Priority.normal,
  status = Status.completed,
  onStatusChange = (e) => console.log(e),
  onClick = (e) => console.log(e),
  id,
}: ITask) => {
  return (
    <Box
      display={'flex'}
      width={'100%'}
      justifyContent={'flex-start'}
      flexDirection={'column'}
      mb={4}
      p={2}
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: renderPriorityBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
        id={id}
        status={status}
        onClick={onClick}
        onStatusChange={onStatusChange}
      />
    </Box>
  );
};

export default Task;
