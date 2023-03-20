import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../../common/types'
import { getAllMeals } from './meals.thunk'

type MealsState = {
  items: Meal[]
}

const initialState: MealsState = {
  items: [],
}

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMeals.fulfilled, (state, action) => {
      state.items = action.payload
    })
  },
})
