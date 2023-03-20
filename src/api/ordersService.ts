import { mainApi } from "./instances"

export const addOrderRequest = (totalPrice: number) => {
    return mainApi.post('/orders', totalPrice)
  }
  
  export const getUserOrdersRequest = () => {
    return mainApi.get('/orders')
  }
  
  export const getAllOrdersRequest = () => {
    return mainApi.get('/orders/all')
  }