import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Typography } from '@mui/material'
import { UserRoles } from '../common/types'
import { ProtectedRoutes } from './ProtectedRoutes'
import UserLayout from '../layout/user'
import AdminLayout from '../layout/admin'
import { RootState } from '../store/store'
import SignIn from '../pages/guest/SignIn'
import Meals from '../pages/admin/Meals.page'
import SignUp from '../pages/guest/SignUp'
import Orders from '../pages/admin/Orders.page'
import UserMeals from '../pages/user/Meals.page'
import UserOrders from '../pages/user/Orders.page'


const AppRoutes = () => {
  const role = useSelector((state: RootState) => state.auth.user.role)

  const isAllowed = (roles: UserRoles[]) => {
    return roles.includes(role)
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes
            isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
            fallBackPath="admin/meals"
            component={UserLayout}
          />
        }
      >
        <Route
          index
          element={
            <ProtectedRoutes
              isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
              fallBackPath={role === UserRoles.ADMIN ? 'admin/meals' : '/'}
              component={() => <UserMeals/>}
            />
          }
        />
        <Route
          path="signup"
          element={
            <ProtectedRoutes
              isAllowed={isAllowed([UserRoles.GUEST])}
              fallBackPath={role === UserRoles.ADMIN ? 'admin/meals' : '/'}
              component={SignUp}
            />
          }
        />
        <Route
          path="signin"
          element={
            <ProtectedRoutes
              isAllowed={isAllowed([UserRoles.GUEST])}
              fallBackPath={role === UserRoles.ADMIN ? 'admin/meals' : '/'}
              component={SignIn}
            />
          }
        />
        <Route
          path="myOrders"
          element={
            <ProtectedRoutes
              isAllowed={isAllowed([ UserRoles.USER])}
              fallBackPath={role === UserRoles.ADMIN ? 'admin/meals' : '/'}
              component={UserOrders}
            />
          }
        />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoutes
            isAllowed={isAllowed([UserRoles.ADMIN])}
            fallBackPath="/"
            component={AdminLayout}
          />
        }
      >
        <Route
          path="meals"
          element={
            <ProtectedRoutes
              isAllowed={isAllowed([UserRoles.ADMIN])}
              fallBackPath="/"
              component={Meals}
            />
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoutes
              isAllowed={isAllowed([UserRoles.ADMIN])}
              fallBackPath="/"
              component={() => <Orders/>}
            />
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Typography sx={{ color: '#e0360b' }}>PAGE NOT FOUND!!!</Typography>
        }
      />
    </Routes>
  )
}

export default AppRoutes
