import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import { signInRequest, signUpRequest } from '../../api/authService'
import { STORAGE_KEYS } from '../../common/constants'
import { SignUpUser } from '../../common/types'

export const signOut = createAsyncThunk('auth/signOut', async () => {
  return localStorage.removeItem(STORAGE_KEYS.AUTH)
})

type UserType = {
  email: string
  password: string
}

export const signIn = createAsyncThunk(
  'auth/signin',
  async (payload: UserType, { rejectWithValue }) => {
    try {
      const { data } = await signInRequest(payload)
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.data))
      return data.data
    } catch (e) {
      if (isAxiosError(e)) {
        const error = e as AxiosError<{ status: number; message: string }>
        return rejectWithValue(error.response?.data.message)
      }
      return rejectWithValue('Something went wrong')
    }
  }
)

// type UserType = UserType & name: string
export const signUp = createAsyncThunk(
  'auth/signup',
  async (payload: SignUpUser, { rejectWithValue }) => {
    try {
      const { data } = await signUpRequest(payload)
      const userData = data.data

      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userData))

      return userData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
