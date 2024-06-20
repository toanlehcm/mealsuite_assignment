import { Ticket } from "@acme/shared-models";
import styles from "./tickets.module.css";
import TicketForm from "./TicketForm";
import axios from "axios";

export interface TicketsProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

export function Tickets({ tickets, setTickets }: TicketsProps) {
  const handleTicketFormSubmit = async (ticket: Ticket) => {
    try {
      const response = await axios.post<Ticket>("/api/tickets", ticket);
      const newTicket = response.data;
      setTickets([...tickets, newTicket]);
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  return (
    <div className={styles["tickets"]}>
      <h2>Tickets</h2>

      <TicketForm onSubmit={handleTicketFormSubmit} />

      {tickets ? (
        <ul>
          {tickets.map((t) => (
            <li key={t.id}>
              Ticket: {t.id}, {t.description}
            </li>
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
