import { Button, Grid, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../hooks/useAppDispatch'
import {
  addMeals,
  deleteMeal,
  getAllMeals,
  updateMeal,
} from '../../store/meals/meals.thunk'
import { RootState } from '../../store/store'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AppTable from '../../components/UI/Table'
import { Column, Meal } from '../../common/types'
import { useEffect } from 'react'
import MealModal, {
  FormSchema,
} from '../../components/admin/pages/meals/MealModal'
import { useSearchParams } from 'react-router-dom'

const Meals = () => {
  const dispatch = useAppDispatch()

  const [params, setParams] = useSearchParams()

  const meals = useSelector((state: RootState) => state.meals.items)

  console.log(meals)

  useEffect(() => {
    dispatch(getAllMeals())
  }, [])

  const deleteMealHandler = (id: string) => {
    dispatch(deleteMeal(id))
  }

  const editMealHandler = (id: string) => {
    showModalHandler('edit')
    console.log('edit btn was clicked')

    params.set('mealId', id)
    setParams(params)
    console.log(params)
    // dispatch(deleteMeal(id))
  }

  const columns: Column<Meal>[] = [
    {
      header: '№',
      key: '_id',
      index: true,
    },
    {
      header: 'Title',
      key: 'title',
    },
    {
      header: 'Price',
      key: 'price',
    },
    {
      header: 'Description',
      key: 'description',
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (meal: Meal) => (
        <Grid>
          <IconButton onClick={() => editMealHandler(meal._id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteMealHandler(meal._id)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      ),
    },
  ]

  const showModalHandler = (mode: 'add' | 'edit') => {
    params.set('modal', mode)
    setParams(params)
    console.log(params)
  }

  const closeModalHandler = () => {
    params.delete('modal')
    setParams(params)
  }

  const saveHandler = (id: string, values: FormSchema) => {
    console.log(id,values)
    // dispatch(updateMeal(id,values))
  }

  const isModalOpen = !!params.get('modal')

  return (
    <Grid>
      <Button onClick={() => showModalHandler('add')}>Add new meal</Button>

      <MealModal
        open={isModalOpen}
        onClose={closeModalHandler}
        onSubmit={saveHandler}
      />
      <Grid>
        <AppTable
          withPagination={true}
          columns={columns}
          rows={meals}
          getUniqueId={(val) => val._id}
        />
      </Grid>
    </Grid>
  )
}

export default Meals
