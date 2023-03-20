/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import style from '@emotion/styled'
import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'


const UserLayout = () => {
  const [isBasketVisible, setBasketVisible] = useState(false)

  const showBasketHandler = useCallback(() => {
    setBasketVisible((prevState) => !prevState)
  }, [])

  return (
    <>
      <Header onShowBasket={showBasketHandler} />
      
      <Content>
        <Outlet/>
      </Content>
    </>
  )
}

export default UserLayout


const Content = style('div')(() => ({
    '&': {
      marginTop: '101px',
    },
  }))
  
  // const StyledSelect = style(Select)(({ theme }) => ({
  //   '&': {
  //     backgroundColor: theme.palette.primary.light,
  //     color: theme.palette.primary.contrasText,
  //   },
  // }))