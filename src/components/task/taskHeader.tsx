import { Box, Chip, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ITaskHeader } from './interfaces/ITaskHeader';

const TaskHeader = ({
  title = 'Default Title',
  date = new Date(),
}: ITaskHeader) => {
  return (
    <Box
      display={'flex'}
      width={'100%'}
      justifyContent={'space-between'}
      mb={3}
    >
      <Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <Chip
          variant="outlined"
          label={format(date, 'PPP')}
        />
      </Box>
    </Box>
  );
};

export default TaskHeader;
