import { useEffect, useMemo, useState } from 'react';
import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';
import TicketForm from './TicketForm';
import { Box, Button } from '@mui/material';
import queryString from 'query-string';
import { useLocation, useNavigate, useMatch } from 'react-router-dom';
import ticketApi from 'client/src/api/ticketApi';
import { TicketList } from './ticketList';
import TicketSkeletonList from './ticketSkeletonList';

export const FILTER_STATUS = {
  all: 'all',
  completed: 'completed',
  incomplete: 'incomplete',
};

export interface TicketsProps {
  tickets: Ticket[];
  loading: boolean;
  setTickets: (tickets: Ticket[]) => void;
}

export function Tickets({ tickets, loading, setTickets }: TicketsProps) {
  const location = useLocation(); // Get params after the ?
  const navigate = useNavigate();
  const match = useMatch('/');
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

  // Create new ticket.
  const handleTicketFormSubmit = async (ticket: Ticket) => {
    try {
      const newTicket = await ticketApi.add(ticket);
      setTickets([...tickets, newTicket]);
    } catch (error) {
      console.error('Failed to create ticket', error);
    }
  };

  // Filter all status.
  const showAll = () => {
    const queryParams = { status: FILTER_STATUS.all };
    navigate({
      pathname: match?.pathname || '/',
      search: queryString.stringify(queryParams),
    });
  };

  // Filter complete status.
  const showComplete = () => {
    const queryParams = { status: FILTER_STATUS.completed };
    navigate({
      pathname: match?.pathname || '/',
      search: queryString.stringify(queryParams),
    });
  };

  // Filter incomplete status.
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

  return (
    <div className={styles['tickets']}>
      <h2>Tickets List</h2>

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

      {loading ? <TicketSkeletonList /> : <TicketList renderedTicketList={renderedTicketList} />}
    </div>
  );
}

export default Tickets;
