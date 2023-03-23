import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { AppDispatch, RootState } from '../../../store/store'
import MealItem from './MealItem'
import { getAllMeals } from '../../../store/meals/meals.thunk'

const Meals = () => {
    const { items } = useSelector((state: RootState) => state.meals)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAllMeals())
    }, [dispatch])

    return (
        <Card>
            <StyledUl>
                {items.map((item) => (
                    <MealItem key={item._id} item={item} />
                ))}
            </StyledUl>
        </Card>
    )
}

export default memo(Meals)

const Card = styled('div')(() => ({
    background: '#8a2b06',
    borderRadius: '1rem',
    width: '64.9375rem',
    margin: ' 160px auto',

}))

const StyledUl = styled('ul')(() => ({
    listStyle: ' none',
    padding: '20px 40px',
    borderRadius: '1rem',
    background: '#fff',
    color: '#000',
}))