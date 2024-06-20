import { useEffect, useState } from "react";
import { Ticket } from "@acme/shared-models";
import styles from "./tickets.module.css";
import TicketForm from "./TicketForm";
import axios from "axios";
import { Box, Button } from "@mui/material";
import queryString from "query-string";
import { useLocation, useNavigate, useMatch } from "react-router-dom";

export interface TicketsProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

export function Tickets({ tickets, setTickets }: TicketsProps) {
  const location = useLocation(); // Get params after the ?
  const navigate = useNavigate();
  const match = useMatch("/"); // To get path, similar to nested routing.

  const [filterStatus, setFilterStatus] = useState(() => {
    const params = queryString.parse(location.search);

    return params["status"] || "all";
  });

  useEffect(() => {
    const params = queryString.parse(location.search);

    setFilterStatus(params["status"] || "all");
  }, [location.search]);

  const handleTicketFormSubmit = async (ticket: Ticket) => {
    try {
      const response = await axios.post<Ticket>("/api/tickets", ticket);
      const newTicket = response.data;
      setTickets([...tickets, newTicket]);
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  const showAll = () => {
    const queryParams = { status: "all" };
    navigate({
      pathname: match?.pathname || "/",
      search: queryString.stringify(queryParams),
    });
  };

  const showComplete = () => {
    const queryParams = { status: "completed" };
    navigate({
      pathname: match?.pathname || "/",
      search: queryString.stringify(queryParams),
    });
  };

  const showIncomplete = () => {
    const queryParams = { status: "incomplete" };
    navigate({
      pathname: match?.pathname || "/",
      search: queryString.stringify(queryParams),
    });
  };

  return (
    <div className={styles["tickets"]}>
      <h2>Tickets</h2>

      <TicketForm onSubmit={handleTicketFormSubmit} />

      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button onClick={() => showAll()}>Show All</Button>
        <Button onClick={() => showComplete()}>Show Completed</Button>
        <Button onClick={() => showIncomplete()}>Show Incomplete</Button>
      </Box>

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
