import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled, TextField, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AppDispatch, RootState } from '../../../store/store'
import { addToBasket } from '../../../store/basket/basket.thunk'

type Props = {
    id: string
    title: string
    price: number
}

const MealItemForm = ({ id, title, price }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [amount, setAmount] = useState(1)
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    )

    const amountChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(+e.target.value)
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // if (!isAuthorized) {
        //     showAuthModal()
        // }

        const basketItem = {
            id,
            price,
            title,
            amount,
        }

        dispatch(addToBasket(basketItem))
    }

    return (
        <StyledForm onSubmit={submitHandler}>
            <Container>
                <StyledLabel htmlFor={id}>Amount</StyledLabel>
                <StyledText
                    id={id}
                    type="number"
                    size="small"
                    value={amount}
                    onChange={amountChangeHandler}
                />
            </Container>
            <Button variant="contained" sx={{background: '#8a2b06'}} type="submit">
                <AddIcon />
                Add
            </Button>
        </StyledForm>
    )
}

export default MealItemForm

const StyledText = styled(TextField)(() => ({
    width: '3.75rem',
    height: '2rem',
    outline: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '16px',
}))

const StyledForm = styled('form')(() => ({
    // display: ' flex',
    // flexDirection: ' column',
    // alignItems: 'flex-end',
}))

const Container = styled('div')(() => ({
    marginBottom: '15px',
}))

const StyledLabel = styled('label')(() => ({
    fontWeight: '600',
    fontSize: '1.125rem',
    lineHeight: '1.6875rem',
    margin: '0 1.25rem 0 0',
}))