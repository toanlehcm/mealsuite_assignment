import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';
import styles from './ticket-details.module.css';
import ticketApi from 'client/src/api/ticketApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FILTER_STATUS } from '../tickets/tickets';
import { Box, Button, IconButton } from '@mui/material';
import UserForm from './UserForm';
import CancelIcon from '@mui/icons-material/Cancel';

/* eslint-disable-next-line */
export interface TicketDetailsProps {
  users: User[];
}

export function TicketDetails({ users }: TicketDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [assignee, setAssignee] = useState<User | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await ticketApi.get(Number(id));
        setTicket(response);
      } catch (error) {
        console.error('Failed to fetch ticket', error);
      }
    };

    fetchTicket();
  }, [id]);

  // Get assignee.
  useEffect(() => {
    if (ticket && users) {
      const user = users.find((user) => user.id === ticket.assigneeId) || null;

      if (user) {
        setAssignee(user);
      }
    }
  }, [ticket, users]);

  const handleAssignFormSubmit = async (assignee: User | null) => {
    if (ticket && assignee) {
      try {
        await ticketApi.assignUserToTicket(ticket.id, assignee.id);
        setAssignee(assignee);
      } catch (error) {
        console.error('Failed to assign user to ticket', error);
      }
    }
  };

  const unassignUserFromTicket = async () => {
    if (ticket) {
      try {
        await ticketApi.unAssignUserFromTicket(ticket.id);
        setAssignee(null);
      } catch (error) {
        console.error('Failed to unassign user from ticket', error);
      }
    }
  };

  const makeComplete = async (ticket: Ticket) => {
    try {
      await ticketApi.markTicketAsComplete(ticket.id);
      const ticketUpdated = await ticketApi.get(ticket.id);
      setTicket(ticketUpdated);
    } catch (error) {
      console.error('Failed to mark ticket as complete', error);
    }
  };

  const makeIncomplete = async (ticket: Ticket) => {
    try {
      await ticketApi.markTicketAsIncomplete(ticket.id);
      const ticketUpdated = await ticketApi.get(ticket.id);
      setTicket(ticketUpdated);
    } catch (error) {
      console.error('Failed to mark ticket as incomplete', error);
    }
  };

  return (
    <div className={styles['container']}>
      <h1>Welcome to TicketDetails!</h1>

      <UserForm users={users} assignee={assignee} onSubmit={handleAssignFormSubmit} />

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
    </div>
  );
}

export default TicketDetails;
