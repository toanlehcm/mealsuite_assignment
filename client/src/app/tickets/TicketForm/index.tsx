import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Ticket } from "@acme/shared-models";
import InputField from "client/src/components/form-controls/InputField";
import { Button } from "@mui/material";

interface ITicketForm {
  onSubmit: (ticket: Ticket) => void; // Excluding id since it's typically generated.
}

function TicketForm({ onSubmit }: ITicketForm) {
  const schema = yup.object().shape({
    description: yup.string().required("Please enter ticket description").min(5, "Ticket description is too short"),
    assigneeId: yup.number().nullable(),
    completed: yup.boolean(),
  });

  const form = useForm<Ticket>({
    defaultValues: {
      description: "",
      assigneeId: null,
      completed: false,
    },
    resolver: yupResolver(schema) as any,
  });

  const onHandleSubmit = (ticket: Ticket) => {
    if (onSubmit) {
      onSubmit(ticket);
    }

    // Reset the form whether submitted successfully or not.
    form.reset();
  };

  return (
    <form
      style={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
      onSubmit={form.handleSubmit(onHandleSubmit)}
    >
      <InputField name="description" label="Ticket" form={form} disabled={false} />

      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
}

export default TicketForm;
