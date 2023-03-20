import { createSlice } from "@reduxjs/toolkit"
import { Meal } from "../../common/types"
import { getAllOrders, getOrders, submitOrder } from "./orders.thunk"


type MealsState = {
    items: Meal[]
  }
  
  const initialState: MealsState = {
    items: [],
  }

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(submitOrder.fulfilled, () => {
        //sdsadadsasd
    })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.items = action.payload

        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.items = action.payload
        })
    },
})

export const orderActions = orderSlice.actions