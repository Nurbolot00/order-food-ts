import { Grid, IconButton } from '@mui/material'
import {format} from 'date-fns'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Column, MealType } from '../../common/types'
import AppTable from '../../components/UI/Table'
import { getAllOrders } from '../../store/orders/orders.thunk'
import { AppDispatch, RootState } from '../../store/store'

const Orders = () => {

    const date = (day:string) => {
        const formatDate = format(new Date(day), 'dd MMM yyyy , hh:mm:ss a')
        return formatDate
    }
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.orders.allOrder)
  console.log(items)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const columns: Column<MealType>[] = [
    {
      header: '№',
      key: '_id',
      index: true,
    },
    {
      header: 'Author',
      key: 'name',
      render: (meal: MealType) => <Grid>{meal.user.name}</Grid>,
    },
    {
      header: 'Meals/amount',
      key: 'title',
      render: (meal: MealType) => (
        <Grid>
          {meal.items.map((item) => (
            <p key={item._id}>{item.title}   /   {item.amount}</p>
          ))}
        </Grid>
      ),
    },

    {
        header: 'Total Price',
        key: 'totalPrice',
        render: (meal: MealType) => <Grid>${meal.totalPrice}</Grid>,
      },
    {
        header: 'Date',
        key: 'createdAt',
        render: (meal: MealType) => <Grid>{date(meal.createdAt)}</Grid>,
      },
  ]

  return (
    <div>
      <AppTable columns={columns} rows={items} getUniqueId={(val) => val._id} />
    </div>
  )
}

export default Orders
