import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Box, Modal, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { getMealById } from '../../../../api/mealsService'
import { addMeals } from '../../../../store/meals/meals.thunk'
import { AppDispatch } from '../../../../store/store'

const schema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().min(1),
})

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (id: string, values: FormSchema) => void
}

const styledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export type SendData = {
  id: string
  values: FormSchema
}

export type FormSchema = (typeof schema)['_output']

export type AddFormSchema = {
  _id: string
  title: string
  description: string
  price: number
}

const MealModal = ({ open, onClose, onSubmit }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch<AppDispatch>()

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      price: 0,
      title: '',
      description: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  
  const id = searchParams.get('mealId') || '1'

  const submitHandler = (values: FormSchema) => {
    open && searchParams.get('modal') === 'edit'
      ? onSubmit(id, values)
      : dispatch(addMeals(values))
  }

  useEffect(() => {
    const mealId = searchParams.get('mealId')
    if (open && searchParams.get('modal') === 'edit' && mealId) {
      getMealById(mealId).then(({ data }) => {
        reset(data.data)
      })
    }
  }, [open])

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styledModal}>
        <form action="" onSubmit={handleSubmit(submitHandler)}>
          <TextField
            id="title"
            error={!!formState.errors.title}
            {...register('title')}
            label="title"
          />
          <TextField
            id="description"
            error={!!formState.errors.description}
            {...register('description')}
            label="description"
          />
          <TextField
            id="price"
            error={!!formState.errors.price}
            {...register('price', { valueAsNumber: true })}
            label="price"
          />
          <Button variant="outlined" color="info" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="primary" type="submit">
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default MealModal
