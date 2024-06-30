import {
  Box,
  Grid,
  Alert,
  LinearProgress,
} from '@mui/material';
import { format } from 'date-fns';
import TaskCounter from '../taskCounter/taskCounter';
import { Status } from '../createTaskForm/enums/Status';
import Task from '../task/Task';
import {
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Priority } from '../createTaskForm/enums/Priority';
import { IUpdateTask } from './interfaces/IUpdateTask';
import { countTasks } from '../taskCounter/helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';
import { useContext, useEffect } from 'react';

const TaskArea = () => {
  const tasksUpdatedContext = useContext(
    TaskStatusChangedContext,
  );

  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      return await sendApiRequest<ITaskApi[]>(
        'http://localhost:3200/tasks',
        'GET',
      );
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateTask;
    }) =>
      sendApiRequest<ITaskApi[]>(
        `http://localhost:3200/tasks/${id}`,
        'PUT',
        data,
      ),
  });

  useEffect(() => {
    refetch();
  }, [tasksUpdatedContext.updated]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      tasksUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess]);

  const onStatusChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    updateTaskMutation.mutate({
      id,
      data: {
        status: e.target.checked
          ? Status.inProgress
          : Status.todo,
      },
    });
  };

  const markeCompleteHandler = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    updateTaskMutation.mutate({
      id,
      data: {
        status: Status.completed,
      },
    });
  };

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>
          Status of your Tasks As On{' '}
          {format(new Date(), 'PPPP')}
        </h2>
      </Box>

      <Grid
        container
        display={'flex'}
        justifyContent={'center'}
      >
        <Grid
          item
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            count={
              data
                ? countTasks(data, Status.todo)
                : undefined
            }
            status={Status.todo}
          />
          <TaskCounter
            count={
              data
                ? countTasks(data, Status.inProgress)
                : undefined
            }
            status={Status.inProgress}
          />
          <TaskCounter
            count={
              data
                ? countTasks(data, Status.completed)
                : undefined
            }
            status={Status.completed}
          />
        </Grid>
        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          xs={10}
          md={8}
        >
          <>
            {error && (
              <Alert severity="error">
                There was an error fetching your tasks
              </Alert>
            )}

            {!error &&
              Array.isArray(data) &&
              data.length === 0 && (
                <Alert severity="warning">
                  You do not have any tasks created yet.
                  Start by creating some tasks
                </Alert>
              )}

            {isLoading ? (
              <LinearProgress />
            ) : (
              Array.isArray(data) &&
              data.length > 0 &&
              data?.map((task, index) => {
                if (
                  task.status === 'todo' ||
                  task.status === 'inProgress'
                ) {
                  return (
                    <Task
                      id={task.id}
                      key={index + task.id}
                      title={task.title}
                      description={task.description}
                      date={new Date(task.date)}
                      priority={task.priority as Priority}
                      status={task.status as Status}
                      onStatusChange={onStatusChangeHandler}
                      onClick={markeCompleteHandler}
                    />
                  );
                }
                return;
              })
            )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskArea;
