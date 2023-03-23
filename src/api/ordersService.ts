import { mainApi } from "./instances"

  
  export const getUserOrdersRequest = () => {
    return mainApi.get('/orders')
  }
  
  export const getAllOrdersRequest = () => {
    return mainApi.get('/orders/all')
  }

 export const submitOrderRequest = (totalPrice: { totalPrice: number }) => {
    return mainApi.post('orders', totalPrice)
}