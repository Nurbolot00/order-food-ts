import { Button, ButtonProps } from '@mui/material'
import { memo } from 'react'
import { styled } from '@mui/material/styles'
// import { ReactComponent as BasketIcon } from '../../assets/icons/cart.svg'


type Props = ButtonProps & {
    count: number
}  


const BasketButton = ({ count, ...restProps }:Props) => (
  <StyledBasketButton variant="contained" {...restProps}>
    {/* <BasketIcon />  */}
    <StyledTitle>Your cart</StyledTitle>
    <CountStyled id="counter">{count || 0}</CountStyled>
  </StyledBasketButton>
)

export default memo(BasketButton)

const StyledBasketButton = styled(Button)(({ theme }) => ({
  background: '#481805',
  padding: '10px 32px',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '24px',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  '&:hover': {
    background: '#a63508',
  },
  '&:active': {
    background: '#993108',
  },
  '&:disabled': {
    background: '#CAC6C4',
  },

  '&.bump': {
    animation: 'bump 300ms ease-out',
  },

  '@keyframes bump': {
    '0%': {
      transform: 'scale(1)',
    },
    '10%': {
      transform: 'scale(0.9)',
    },
    '30%': {
      transform: 'scale(1.1)',
    },
    '50%': {
      transform: 'scale(1.15)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}))

const StyledTitle = styled("span") (() => ({
        marginLeft: '12px',
        marginRight: '24px'
  }))
   


const CountStyled = styled("span") (() => ({
  background: '#8a2b06',
  borderRadius: '30px',
  padding: '4px 20px',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '27px',
  color: '#ffffff',
}))
