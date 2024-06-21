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

export default function TicketDetailsSkeleton(props: ITicketSkeletonListProps) {
  return (
    <Box>
      <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ width: '10%' }}>
                ID
              </TableCell>
              <TableCell align='center' sx={{ width: '50%' }}>
                Ticket
              </TableCell>
              <TableCell align='center' sx={{ width: '20%' }}>
                Assign to
              </TableCell>
              <TableCell align='center' sx={{ width: '20%' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell align='center' sx={{ width: '10%' }}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              </TableCell>

              <TableCell align='left' sx={{ width: '50%' }}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              </TableCell>

              <TableCell align='center' sx={{ width: '20%' }}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              </TableCell>
              <TableCell align='center' sx={{ width: '20%' }}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
