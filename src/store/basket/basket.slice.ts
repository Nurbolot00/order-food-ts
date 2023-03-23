import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../../common/types'
import { getBasket } from './basket.thunk'


type BasketState = {
    items: Meal[]
}
const initialState: BasketState = {
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBasket.fulfilled, (state, action) => {
            state.items = action.payload
        })
    },
})