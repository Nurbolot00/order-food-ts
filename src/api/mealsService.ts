import { Meal } from "../common/types"
import { mainApi } from "./instances"




type AllMealsResponse = {
    data:  Meal[]
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
