import { BasketData } from '../common/types'
import { mainApi } from './instances'

export const getBasketRequest = () => {
  return mainApi.get('basket')
}

export const addToBasketRequest = (newItem: BasketData) => {
  return mainApi.post(`foods/${newItem.id}/addToBasket`, {
    amount: newItem.amount,
  })
}

export const updateBasketItemRequest = (id: string, amount: number) => {
  return mainApi.put(`basketItem/${id}/update`, { amount })
}

export const deleteBasketItemRequest = (id: string) => {
  return mainApi.delete(`/basketItem/${id}/delete`)
}
