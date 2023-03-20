import { ChangeEvent, useState } from "react"

export const useClientSidePagination = () =>{
    const [page ,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(2)

    const handleChangePage = (newPage: number) =>{
        setPage(newPage)
      }
    
      const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setRowsPerPage(+event.target.value)
      }

      const paginate = <T>(rows: T[]) =>{
         return rows.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )}


      return {
        page,rowsPerPage, handleChangePage, handleChangeRowsPerPage, paginate
      }
}

