import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { Column } from '../../common/types'
import { useClientSidePagination } from '../../hooks/useClientSidePagination'

type Props<T> = {
  columns: Column<T>[]
  rows: T[]
  getUniqueId: (val: T) => string
  withPagination?: boolean
}

const AppTable = <T,>({
  columns,
  rows,
  getUniqueId,
  withPagination = true,
}: Props<T>) => {
  const {
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
    page,
    paginate,
  } = useClientSidePagination()

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align || 'left'}
                  style={
                    column.minWidth
                      ? {
                          minWidth: column.minWidth,
                        }
                      : {}
                  }
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginate(rows).map((meal: T, rowIndex: number) => {
              return (
                <TableRow
                  hover
                  // role="checkbox"
                  tabIndex={-1}
                  key={getUniqueId(meal)}
                >
                  {columns.map((column) => {
                    if (column.render) {
                      return <TableCell key={column.key}>{column.render(meal)}</TableCell>
                    }

                    const value = column.index
                      ? rowIndex + 1
                      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        meal[column.key]
                    return (
                      <TableCell key={column.key} align={column.align}>
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {withPagination && (
        <TablePagination
          rowsPerPageOptions={[2, 4]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => handleChangePage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  )
}

export default AppTable
