import { useEffect, useMemo, useState } from 'react';
import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';
import TicketForm from './TicketForm';
import { Box, Button, IconButton } from '@mui/material';
import queryString from 'query-string';
import { useLocation, useNavigate, useMatch } from 'react-router-dom';
import ticketApi from 'client/src/api/ticketApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';

const FILTER_STATUS = {
  all: 'all',
  completed: 'completed',
  incomplete: 'incomplete',
};

export interface TicketsProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

export function Tickets({ tickets, setTickets }: TicketsProps) {
  const location = useLocation(); // Get params after the ?
  const navigate = useNavigate();
  const match = useMatch('/'); // To get path, similar to nested routing.
  const [ticketList, setTicketList] = useState<Ticket[]>(tickets);
  const [filterStatus, setFilterStatus] = useState(() => {
    const params = queryString.parse(location.search);

    return params['status'] || FILTER_STATUS.all;
  });

  useEffect(() => {
    setTicketList(tickets);
  }, [tickets]);

  useEffect(() => {
    const params = queryString.parse(location.search);

    setFilterStatus(params['status'] || FILTER_STATUS.all);
  }, [location.search]);

  const handleTicketFormSubmit = async (ticket: Ticket) => {
    try {
      const newTicket = await ticketApi.add(ticket);
      setTickets([...tickets, newTicket]);
    } catch (error) {
      console.error('Failed to create ticket', error);
    }
  };

  const showAll = () => {
    const queryParams = { status: FILTER_STATUS.all };
    navigate({
      pathname: match?.pathname || '/',
      search: queryString.stringify(queryParams),
    });
  };

  const showComplete = () => {
    const queryParams = { status: FILTER_STATUS.completed };
    navigate({
      pathname: match?.pathname || '/',
      search: queryString.stringify(queryParams),
    });
  };

  const showIncomplete = () => {
    const queryParams = { status: FILTER_STATUS.incomplete };
    navigate({
      pathname: match?.pathname || '/',
      search: queryString.stringify(queryParams),
    });
  };

  // Rendered ticket list only change when ticket list and filter status change.
  const renderedTicketList = useMemo(() => {
    return ticketList.filter((ticket) => filterStatus === FILTER_STATUS.all || filterStatus === (ticket.completed ? FILTER_STATUS.completed : FILTER_STATUS.incomplete));
  }, [ticketList, filterStatus]);

  const makeComplete = async (ticket: Ticket) => {
    try {
      await ticketApi.markTicketAsComplete(ticket.id);
      const newTicketList = await ticketApi.getAll();
      setTicketList(newTicketList);
    } catch (error) {
      console.error('Failed to mark ticket as complete', error);
    }
  };

  const makeIncomplete = async (ticket: Ticket) => {
    try {
      await ticketApi.markTicketAsIncomplete(ticket.id);
      const newTicketList = await ticketApi.getAll();
      setTicketList(newTicketList);
    } catch (error) {
      console.error('Failed to mark ticket as incomplete', error);
    }
  };

  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>

      <TicketForm onSubmit={handleTicketFormSubmit} />

      <Box
        component={'div'}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button sx={{ color: filterStatus === FILTER_STATUS.all ? 'primary' : 'grey' }} onClick={() => showAll()}>
          Show All
        </Button>
        <Button sx={{ color: filterStatus === FILTER_STATUS.completed ? 'primary' : 'grey' }} onClick={() => showComplete()}>
          Show Completed
        </Button>
        <Button sx={{ color: filterStatus === FILTER_STATUS.incomplete ? 'primary' : 'grey' }} onClick={() => showIncomplete()}>
          Show Incomplete
        </Button>
      </Box>

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
                Detail
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
                    <Button
                      variant='outlined'
                      color={ticketItem.completed ? 'success' : 'error'}
                      onClick={() => {
                        ticketItem.completed ? makeIncomplete(ticketItem) : makeComplete(ticketItem);
                      }}
                    >
                      {ticketItem.completed ? 'Complete' : 'Incomplete'}
                    </Button>
                  </TableCell>
                  <TableCell align='center' sx={{ width: '10%' }}>
                    <IconButton>
                      <VisibilityIcon />
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
    </div>
  );
}

export default Tickets;
