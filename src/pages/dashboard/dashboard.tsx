import { Grid } from '@mui/material';
import { FC } from 'react';
import SideBar from '../../components/sidebar/sidebar';
import TaskArea from '../../components/taskArea/taskArea';

export const Dashboard: FC = () => {
  return (
    <Grid container minHeight={'100vh'} p={0} m={0}>
      <TaskArea />
      <SideBar />
    </Grid>
  );
};
