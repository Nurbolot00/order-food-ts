import { Button } from '@mui/material'
import {  useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store/store'
import { signOut } from '../../store/auth/auth.thunk'
import BasketButton from '../../components/user/BasketButton'
import { getBasket } from '../../store/basket/basket.thunk'


type Props = {
  onShowBasket: () => void
}

const Header = ({ onShowBasket }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized
  )
    const items = useSelector((state: RootState) => state.basket.items)
  const [animationClass, setAnimationClass] = useState('')

  //   const themeMode = useSelector((state) => state.ui.themeMode)

    useEffect(() => {
      dispatch(getBasket())
    }, [dispatch])

    const calculateTotalAmount = useCallback(() => {
      const sum = items.reduce((s, item) => {
        return s + item.amount
      }, 0)
      return sum
    }, [items])

    useEffect(() => {
      setAnimationClass('bump')

      const id = setTimeout(() => {
        setAnimationClass('')

        return () => {
          clearTimeout(id)
        }
      }, 600)
    }, [items])

  //   const theme = themeMode === 'light' ? 'dark' : 'light'
  //   const themeChangeHandler = () => {
  //     dispatch(uiActions.changeTheme(theme))
  //   }

  const signOutHandler = () => {
    dispatch(signOut())
    navigate('/signin')
  }

  const signInHandler = () => {
    navigate('/signin')
  }

  const showBasketHandler = () => {
    onShowBasket()
    getBasket()
  }

  const goToOrdersPageHandler = () => {
    navigate('/myOrders')
  }

  return (
    <StyledHeaderContainer>
      <Link style={{textDecoration: 'none'}} to="/">
        <Logo>ReactMeals</Logo>
      </Link>

      <StyledInnerContrainer>
        <BasketButton
          onClick={showBasketHandler}
          className={animationClass}
          count={calculateTotalAmount()}
        />

        <Button
          variant="contained"
          sx={{ color: '#fff', background: '#481805' }}
          onClick={goToOrdersPageHandler}
        >
          My Orders
        </Button>
        {/* <MuiButton onClick={goToOrdersPageHandler} variant='outlined'>My Orders</MuiButton> */}

        {isAuthorized ? (
          <Button
            variant="contained"
            sx={{ color: '#fff', background: '#481805' }}
            onClick={signOutHandler}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ color: '#fff', background: '#481805' }}
            onClick={signInHandler}
          >
            Sign In
          </Button>
        )}
      </StyledInnerContrainer>
    </StyledHeaderContainer>
  )
}

export default Header

const StyledHeaderContainer = styled('nav')(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  top: '0',
  zIndex: '1',
  height: '101px',
  backgroundColor: '#8a2b06',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '120px',
  paddingRight: '120px',
}))

const StyledInnerContrainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
}))

// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.dark,
//   marginLeft: '3rem',
// }))

const Logo = styled('div')(() => ({
  margin: '0',
  fontWeight: '600',
  fontSize: '38px',
  lineHeight: ' 57px',
  color: '#ffffff',
  fontFamily: 'Poppins, sans-serif',
}))

// const Logo = styledComponents.p`
//   margin: 0;
//   font-weight: 600;
//   font-size: 38px;
//   line-height: 57px;
//   color: #ffffff;
//   font-family: Poppins, sans-serif;
// `
