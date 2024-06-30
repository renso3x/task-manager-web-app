import {
  createContext,
  FC,
  PropsWithChildren,
  useState,
} from 'react';

export const TaskStatusChangedContext = createContext({
  updated: false,
  toggle: () => {},
});

export const TaskStatusChangedContextProvider: FC<
  PropsWithChildren
> = (props) => {
  const [updated, setUpdated] = useState(false);

  const toggleHandler = () => {
    updated ? setUpdated(false) : setUpdated(true);
  };

  return (
    <TaskStatusChangedContext.Provider
      value={{ updated, toggle: toggleHandler }}
    >
      {props.children}
    </TaskStatusChangedContext.Provider>
  );
};
