import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError, isAxiosError } from "axios"
import { getAllOrdersRequest, getUserOrdersRequest, submitOrderRequest } from "../../api/ordersService"
import { getBasket } from "../basket/basket.thunk"


export const getUserOrders = createAsyncThunk(
    'basket/getorder',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getUserOrdersRequest()
            return data.data
        } catch (error) {
            return rejectWithValue('Some thing wen wrong')
        }
    }
)
export const getAllOrders = createAsyncThunk(
    'basket/getallorders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getAllOrdersRequest()
            return data.data
        } catch (error) {
            return rejectWithValue('Some thing wen wrong')
        }
    }
)

export const submitOrder = createAsyncThunk(
    'order/postOrder',
    async (
        totalPrice: { totalPrice: number },
        { rejectWithValue, dispatch }
    ) => {
        try {
            await submitOrderRequest(totalPrice)
            dispatch(getBasket())
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