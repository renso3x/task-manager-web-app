import { Priority } from '../../createTaskForm/enums/Priority';
import { Status } from '../../createTaskForm/enums/Status';
import { ITaskDescription } from './ITaskDescription';
import { ITaskFooter } from './ITaskFooter';
import { ITaskHeader } from './ITaskHeader';

export interface ITask
  extends ITaskHeader,
    ITaskDescription,
    ITaskFooter {
  priority?: Priority;
  status?: Status;
}
