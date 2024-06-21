import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Breadcrumbs, Button, IconButton, Link, Typography } from '@mui/material';
import UserForm from './UserForm';
import CancelIcon from '@mui/icons-material/Cancel';
import { Ticket, User } from '@acme/shared-models';

export interface ITicketDetailsTableProps {
  ticket: Ticket | null;
  assignee: User | null;
  unassignUserFromTicket: () => void;
  makeIncomplete: (ticket: Ticket) => void;
  makeComplete: (ticket: Ticket) => void;
}

export default function TicketDetailsTable({ ticket, assignee, unassignUserFromTicket, makeIncomplete, makeComplete }: ITicketDetailsTableProps) {
  return (
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

        {ticket && (
          <TableBody>
            <TableRow key={ticket.id}>
              <TableCell align='center' sx={{ width: '10%' }}>
                {ticket.id}
              </TableCell>
              <TableCell align='left' sx={{ width: '50%' }}>
                {ticket.description}
              </TableCell>
              <TableCell align='center' sx={{ width: '20%' }}>
                {assignee ? (
                  <Box
                    component={'span'}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    {assignee.name}

                    <IconButton onClick={unassignUserFromTicket}>
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  ''
                )}
              </TableCell>
              <TableCell align='center' sx={{ width: '20%' }}>
                <Button
                  variant='outlined'
                  color={ticket.completed ? 'success' : 'error'}
                  onClick={() => {
                    ticket.completed ? makeIncomplete(ticket) : makeComplete(ticket);
                  }}
                >
                  {ticket.completed ? 'Complete' : 'Incomplete'}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
