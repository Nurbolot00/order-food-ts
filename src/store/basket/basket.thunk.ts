import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import {
  addToBasketRequest,
  deleteBasketItemRequest,
  getBasketRequest,
  updateBasketItemRequest,
} from '../../api/basketService'
import { BasketData } from '../../common/types'

export const getBasket = createAsyncThunk(
  'basket/getBasket',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getBasketRequest()
      return data.data.items
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

export const addToBasket = createAsyncThunk(
  'basket/addToBasket',
  async (newItem: BasketData, { rejectWithValue, dispatch }) => {
    try {
      await addToBasketRequest(newItem)
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

export interface BasketDatas {
  id: string
  amount: number
}

export const updateBasketItem = createAsyncThunk(
  'basket/updateBasket',
  async ({ id, amount }: BasketDatas, { rejectWithValue, dispatch }) => {
    try {
      await updateBasketItemRequest(id, amount)
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

export const deleteBasketItem = createAsyncThunk(
  'basket/deleteBasket',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await deleteBasketItemRequest(id)
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
