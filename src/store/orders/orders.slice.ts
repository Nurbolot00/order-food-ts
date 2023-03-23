import { createSlice } from "@reduxjs/toolkit"
import { MealType } from "../../common/types"
import { getAllOrders, getUserOrders, submitOrder } from "./orders.thunk"


type MealsState = {
    allOrder: MealType[]
  }
  
  const initialState: MealsState = {
    allOrder: [],
  }

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(submitOrder.fulfilled, () => {
        //sdsadadsasd
    })
        builder.addCase(getUserOrders.fulfilled, (state, action) => {
            state.allOrder = action.payload

        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.allOrder = action.payload
        })
    },
})

export const orderActions = orderSlice.actions