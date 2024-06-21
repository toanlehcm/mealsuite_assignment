import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';
import styles from './ticket-details.module.css';
import ticketApi from 'client/src/api/ticketApi';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import UserForm from './UserForm';
import TicketDetailsTable from './ticketDetailsTable';
import TicketDetailsSkeleton from './ticketDetailsSkeleton';

/* eslint-disable-next-line */
export interface TicketDetailsProps {
  users: User[];
}

export function TicketDetails({ users }: TicketDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [assignee, setAssignee] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await ticketApi.get(Number(id));
        setTicket(response);
      } catch (error) {
        console.error('Failed to fetch ticket', error);
      }

      setLoading(false);
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
        setAssignee(assignee);
        await ticketApi.assignUserToTicket(ticket.id, assignee.id);
      } catch (error) {
        console.error('Failed to assign user to ticket', error);
      }
    }
  };

  const unassignUserFromTicket = async () => {
    if (ticket) {
      try {
        setAssignee(null);
        await ticketApi.unAssignUserFromTicket(ticket.id);
      } catch (error) {
        console.error('Failed to unassign user from ticket', error);
      }
    }
  };

  const makeComplete = async (ticketItem: Ticket) => {
    try {
      // Update the ticket's completed status.
      const updatedTicket: Ticket = { ...ticketItem, completed: true };

      // Update the state with the new ticket.
      setTicket(updatedTicket);

      await ticketApi.markTicketAsComplete(ticketItem.id);
    } catch (error) {
      console.error('Failed to mark ticket as complete', error);
    }
  };

  const makeIncomplete = async (ticketItem: Ticket) => {
    try {
      // Update the ticket's completed status.
      const updatedTicket: Ticket = { ...ticketItem, completed: false };

      // Update the state with the new ticket.
      setTicket(updatedTicket);

      await ticketApi.markTicketAsIncomplete(ticketItem.id);
    } catch (error) {
      console.error('Failed to mark ticket as incomplete', error);
    }
  };

  return (
    <div className={styles['container']}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link underline='hover' color='inherit' href='/'>
          Tickets List
        </Link>
        <Typography color='text.primary'>Ticket Details</Typography>
      </Breadcrumbs>

      <UserForm users={users} assignee={assignee} onSubmit={handleAssignFormSubmit} />

      {loading ? <TicketDetailsSkeleton /> : <TicketDetailsTable ticket={ticket} assignee={assignee} unassignUserFromTicket={unassignUserFromTicket} makeIncomplete={makeIncomplete} makeComplete={makeComplete} />}
    </div>
  );
}

export default TicketDetails;
