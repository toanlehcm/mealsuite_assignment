import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Ticket } from "@acme/shared-models";
import InputField from "client/src/components/form-controls/InputField";

interface ITicketForm {
  onSubmit: (ticket: Ticket) => void;
}

function TicketForm({ onSubmit }: ITicketForm) {
  const schema = yup.object().shape({
    title: yup.string().required("Please enter title").min(5, "Title is too short"),
  });

  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = (ticket: any) => {
    if (onSubmit) {
      onSubmit(ticket);
    }

    // Reset the form whether submitted successfully or not.
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onHandleSubmit)}>
      <InputField name="title" label="Ticket" form={form} disabled={false} />
    </form>
  );
}

export default TicketForm;
