import React from 'react';
import { Status } from '../../createTaskForm/enums/Status';

export interface ITaskFooter {
  id: string;
  status?: Status;
  onStatusChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => void;
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => void;
}
