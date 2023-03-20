import Grid from '@mui/material/Grid';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from './header/AdminHeader';

const AdminLayout = () => {
    return <div>
      <AdminHeader/>
      <Grid >
        <Outlet/>
      </Grid>
    </div>
  }
  
  export default AdminLayout
  