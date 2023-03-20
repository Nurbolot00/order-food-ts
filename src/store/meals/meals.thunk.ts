import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import {
  addMealRequest,
  getAllMealsRequest,
  mealDelete,
  updateMealRequest,
} from '../../api/mealsService'
import { FormSchema, SendData } from '../../components/admin/pages/meals/MealModal'

export const getAllMeals = createAsyncThunk(
  'meal/getAll',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllMealsRequest()
      return data.data
    } catch (e) {
      if (isAxiosError(e)) {
        const error = e as AxiosError<{
          status: number
          message: string
        }>
        return rejectWithValue(error.response?.data.message)
      }
      return rejectWithValue('Something went wrong')
    }
    
  }
)

export const addMeals = createAsyncThunk(
  'meals/addMeals',
  async (payload: FormSchema, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await addMealRequest(payload)
      dispatch(getAllMeals())
      return data.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deleteMeal = createAsyncThunk(
  'meals/delete',
  async (id: string, { rejectWithValue, dispatch }) => {
    console.log(id)
    try {
      await mealDelete(id)
      return dispatch(getAllMeals())
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


export const updateMeal = createAsyncThunk(
    'meals/updateMeal',
    async ({ id, values }: SendData, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await updateMealRequest(id, values)
            dispatch(getAllMeals())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
