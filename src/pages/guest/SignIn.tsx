import { Grid, TextField, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from '../../store/auth/auth.thunk'
import { AppDispatch } from '../../store/store'


const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')

  const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
  })

  type FormSchema = (typeof schema)['_output']

  const { getValues, handleSubmit, register, formState } = useForm({
      defaultValues: {
          email: '',
          password: '',
      },
      mode: 'onBlur',
      resolver: zodResolver(schema),
  })

  const submitHandler = (values: FormSchema) => {
      console.log(values)

      dispatch(signIn(values))
          .unwrap()
          .then(() => navigate('/'))
          .catch((e: string) => setLoginError(e))
  }

  return (
      <MainGrid>
          <GridContainer>
              <form onSubmit={handleSubmit(submitHandler)}>
                  <FormGrid>
                      <TextField
                          error={!!formState.errors.email}
                          {...register('email', {
                              required: 'Please enter your email address',
                          })}
                          label="Email"
                      />
                      {formState.errors.email && (
                          <Error>{formState.errors.email.message}</Error>
                      )}
                      <TextField
                          error={!!formState.errors.password}
                          {...register('password', {
                              required: 'Please enter your password',
                          })}
                          label="Password"
                      />
                      {formState.errors.password && (
                          <Error>{formState.errors.password.message}</Error>
                      )}
                      <Button type="submit">Sign In</Button>
                      <Link to="/signup">{`Don't have account`}</Link>
                  </FormGrid>
              </form>
          </GridContainer>
      </MainGrid>
  )
}

export default SignIn

const MainGrid = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '200px',
}))

const GridContainer = styled(Grid)(() => ({
  background: '#fff',
  width: '500px',
  padding: '20px',
}))

const FormGrid = styled(Grid)(() => ({
  display: 'grid',
  flexDirection: 'column',
  gap: '20px',
}))

const Error = styled(Typography)(({ theme }) => ({
  color: '#f00',
  textAlign: 'center',
}))