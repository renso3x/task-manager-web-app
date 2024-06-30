import { ITaskApi } from '../../taskArea/interfaces/ITaskApi';
import { TaskCounterStatusType } from '../interfaces/ITaskCounter';

export const countTasks = (
  tasks: ITaskApi[],
  status: TaskCounterStatusType,
) => {
  if (!Array.isArray(tasks)) {
    return 0;
  }

  const totalTasks = tasks.filter(
    (task) => task.status === status,
  );

  return totalTasks.length;
};
