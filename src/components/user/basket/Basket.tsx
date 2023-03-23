import { Box, Modal, styled } from '@mui/material'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../../hooks/useAppDispatch'
import {
  deleteBasketItem,
  getBasket,
  updateBasketItem,
} from '../../../store/basket/basket.thunk'
import { submitOrder } from '../../../store/orders/orders.thunk'
import { RootState } from '../../../store/store'
import BasketItem from './BasketItem'
import TotalAmount from './TotalAmount'

type Props = {
  onClose: () => void
  open: boolean
}

const Basket = ({ onClose, open }: Props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
  }

  const dispatch = useAppDispatch()
  const items = useSelector((state: RootState) => state.basket.items)

  const getTotalPrice = useCallback(() => {
    return items.reduce((sum, { amount, price }) => sum + amount * price, 0)
  }, [items])

  const decrementAmount = (id: string, amount: number) => {
    if (amount > 1) {
      dispatch(updateBasketItem({ amount: amount - 1, id }))
    } else {
      dispatch(deleteBasketItem(id))
    }
  }

  const incrementAmount = (id: string, amount: number) => {
    dispatch(updateBasketItem({ amount: amount + 1, id }))
  }

  const price = {
    totalPrice: getTotalPrice(),
  }

  const orderSubmitHandler = async () => {
    try {
      await dispatch(submitOrder(price)).unwrap()
      dispatch(getBasket())
      // dispatch(
      //     uiActions.showSnackbar({
      //         isOpen: true,
      //         severity: 'success',
      //         message: 'Order completed successfully',
      //     })
      // )
    } catch (error) {
      console.log(error)

      // dispatch(
      //     uiActions.showSnackbar({
      //         isOpen: true,
      //         severity: 'error',
      //         message: 'Failed try again later',
      //     })
      // )
    } finally {
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <StyledContainer>
          <FiwedHeightContainer>
            {items.map((item) => {
              return (
                <BasketItem
                  // eslint-disable-next-line no-underscore-dangle
                  key={item._id}
                  // eslint-disable-next-line no-underscore-dangle
                  incrementAmount={() => incrementAmount(item._id, item.amount)}
                  // eslint-disable-next-line no-underscore-dangle
                  decrementAmount={() => decrementAmount(item._id, item.amount)}
                  title={item.title}
                  price={item.price}
                  amount={item.amount}
                />
              )
            })}
          </FiwedHeightContainer>

          <TotalAmount
            price={getTotalPrice()}
            onClose={onClose}
            onOrder={orderSubmitHandler}
          />
        </StyledContainer>
      </Box>
    </Modal>
  )
}

export default Basket

const FiwedHeightContainer = styled('div')(() => ({
  maxHeight: '228px',
  overflowY: 'scroll',
}))

const StyledContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  width: '100%',
  height: '100%',
  padding: '1.5rem 2rem',
}))
