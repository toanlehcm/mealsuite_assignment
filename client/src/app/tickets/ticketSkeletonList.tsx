import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Skeleton } from '@mui/material';

export interface ITicketSkeletonListProps {}

export default function TicketSkeletonList(props: ITicketSkeletonListProps) {
  return (
    <Box>
      <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ width: '10%' }}>
                ID
              </TableCell>
              <TableCell align='center' sx={{ width: '70%' }}>
                Ticket
              </TableCell>
              <TableCell align='center' sx={{ width: '10%' }}>
                Status
              </TableCell>
              <TableCell align='center' sx={{ width: '10%' }}>
                Edit
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell align='center' sx={{ width: '10%' }}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              </TableCell>

              <TableCell align='left' sx={{ width: '70%' }}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              </TableCell>

              <TableCell align='center' sx={{ width: '10%' }}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              </TableCell>
              <TableCell align='center' sx={{ width: '10%' }}>
                <Skeleton variant='circular' width={40} height={40} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
