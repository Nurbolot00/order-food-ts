import React from 'react'
import { Meal } from '../../../common/types'
import MealItemForm from './MealItemForm'
import { styled } from '@mui/material'

type Props = {
  item: Meal
}

const MealItem = ({ item }: Props) => {
  return (
    <StyledLi>
      <StyledInfoCard>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
        <Price>${item.price}</Price>
      </StyledInfoCard>
      {/* eslint-disable-next-line no-underscore-dangle */}
      <MealItemForm id={item._id} title={item.title} price={item.price} />
    </StyledLi>
  )
}

export default MealItem

const Title = styled('h4')(() => ({
  fontWeight: '600',
  fontSize: '1.125rem',
  lineHeight: '1.6875rem',
  marginBottom: '0',
}))

const Description = styled('p')(() => ({
  fontStyle: 'italic',
  fontWeight: '400',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  margin: '0',
}))

const Price = styled('span')(() => ({
  fontWeight: '700',
  fontSize: '1.25rem',
  lineHeight: '1.875rem',
  color: '#8a2b06',
}))

const StyledLi = styled('li')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  bordeBottom: '1rem solid #c1bebe',

  '&:last-child': {
    borderBottom: 'none',
  },
}))

const StyledInfoCard = styled('div')(() => ({
  marginBottom: '1.25rem',
}))
