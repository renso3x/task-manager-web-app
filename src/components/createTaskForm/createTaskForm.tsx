import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

import { useEffect, useState, useContext } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import TaskDateField from './taskDateField';
import TaskDescriptionField from './taskDescriptionField';
import TaskSelectField from './taskSelectField';
import TaskTitleField from './taskTitleField';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context';

const CreateTaskForm = () => {
  const [title, setTitle] = useState<string | undefined>(
    undefined,
  );
  const [description, setDescription] = useState<
    string | undefined
  >(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(
    Priority.normal,
  );
  const [isSuccess, setIsSuccess] =
    useState<boolean>(false);

  const tasksUpdatedContext = useContext(
    TaskStatusChangedContext,
  );

  const createTaskMutation = useMutation({
    mutationFn: async (data: ICreateTask) => {
      setIsSuccess(true);
      await sendApiRequest(
        'http://localhost:3200/tasks',
        'POST',
        data,
      );
    },
  });

  // Use a validation like yup/ react-hook-form
  const createTaskHandler = () => {
    if (!title || !date || !description) {
      return;
    }
    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };

    createTaskMutation.mutate(task);
  };

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setIsSuccess(true);

      tasksUpdatedContext.toggle();
    }

    const successTimeout = setTimeout(() => {
      setIsSuccess(false);
      clearFields();
    }, 7000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setDate(new Date());
    setStatus(Status.todo);
    setPriority(Priority.normal);
  };

  return (
    <Box
      display="flex"
      flexDirection={'column'}
      alignItems={'flex-start'}
      width={'100%'}
      px={4}
      my={6}
    >
      {isSuccess && (
        <Alert
          severity="success"
          sx={{ width: '100%', marginBottom: '16px' }}
        >
          <AlertTitle>Success</AlertTitle>
          The task has been created succesfully
        </Alert>
      )}

      <Typography mb={2} component="h2" variant="h6">
        Create a Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
        />
        <TaskDescriptionField
          onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDateField onChange={(date) => setDate(date)} />
        <Stack
          direction={'row'}
          sx={{ width: '100%' }}
          spacing={2}
        >
          <TaskSelectField
            label="Status"
            name="status"
            value={status}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
              {
                value: Status.completed,
                label: Status.completed.toUpperCase(),
              },
            ]}
            onChange={(e) => setStatus(e.target.value)}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            value={priority}
            items={[
              {
                value: Priority.low,
                label: Priority.low.toUpperCase(),
              },
              {
                value: Priority.normal,
                label: Priority.normal.toUpperCase(),
              },
              {
                value: Priority.high,
                label: Priority.high.toUpperCase(),
              },
            ]}
            onChange={(e) => setPriority(e.target.value)}
          />
        </Stack>

        {createTaskMutation.status === 'pending' && (
          <LinearProgress />
        )}
        <Button
          variant="contained"
          fullWidth
          onClick={createTaskHandler}
          disabled={
            !title ||
            !description ||
            !date ||
            !status ||
            !priority
          }
        >
          Create A Task
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateTaskForm;
