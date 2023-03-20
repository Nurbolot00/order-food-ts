import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth.slice'
import { mealsSlice } from './meals/meals.slice'
// ...
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [mealsSlice.name]: mealsSlice.reducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
