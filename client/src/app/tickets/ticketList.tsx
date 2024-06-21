import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { Ticket } from '@acme/shared-models';
import { FILTER_STATUS } from './tickets';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface ITicketListProps {
  renderedTicketList: Ticket[];
}

export function TicketList({ renderedTicketList }: ITicketListProps) {
  const navigate = useNavigate();

  return (
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

        {renderedTicketList ? (
          <TableBody>
            {renderedTicketList.map((ticketItem) => (
              <TableRow key={ticketItem.id}>
                <TableCell align='center' sx={{ width: '10%' }}>
                  {ticketItem.id}
                </TableCell>
                <TableCell align='left' sx={{ width: '70%' }}>
                  {ticketItem.description}
                </TableCell>
                <TableCell align='center' sx={{ width: '10%' }}>
                  <Box component={'span'} sx={{ color: ticketItem.completed ? 'green' : 'red' }}>
                    {ticketItem.completed ? FILTER_STATUS.completed.toUpperCase() : FILTER_STATUS.incomplete.toUpperCase()}
                  </Box>
                </TableCell>
                <TableCell align='center' sx={{ width: '10%' }}>
                  <IconButton
                    onClick={() => {
                      navigate(`/${ticketItem.id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <span>...</span>
        )}
      </Table>
    </TableContainer>
  );
}
