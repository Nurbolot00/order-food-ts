import { Meal } from '../common/types'
import { FormSchema } from '../components/admin/pages/meals/MealModal'
import { mainApi } from './instances'

type AllMealsResponse = {
  data: Meal[]
}

export const getAllMealsRequest = () => {
  return mainApi.get<AllMealsResponse>('/foods')
}

type MealResponse = {
  data: Meal
}

export const getMealById = (id: string) => {
  return mainApi.get<MealResponse>(`/foods/${id}`)
}

export const mealDelete = (id: string) => {
  return mainApi.delete<MealResponse>(`/foods/${id}`)
}

export const addMealRequest = (data: FormSchema) => {
  return mainApi.post<MealResponse>('/foods', data)
}


export const updateMealRequest = (id: string, values: FormSchema) => {
  return mainApi.put(`/foods/${id}`, values)
}
