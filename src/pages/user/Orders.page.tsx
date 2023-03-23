import Grid from "@mui/material/Grid/Grid";
import { format } from "date-fns";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Column, MealType } from "../../common/types";
import AppTable from "../../components/UI/Table";
import useAppDispatch from "../../hooks/useAppDispatch";
import { getUserOrders } from "../../store/orders/orders.thunk";
import { RootState } from "../../store/store";

const UserOrders = () => {

    const date = (day:string) => {
        const formatDate = format(new Date(day), 'dd MMM yyyy , hh:mm:ss a')
        return formatDate
    }
  const dispatch = useAppDispatch()
  const items = useSelector((state: RootState) => state.orders.allOrder)
  console.log(items)

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  const columns: Column<MealType>[] = [
    {
      header: '№',
      key: '_id',
      index: true,
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
};

export default UserOrders;