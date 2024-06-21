import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@acme/shared-models';
import { Button } from '@mui/material';
import ComboBoxField from 'client/src/components/form-controls/comboBoxField';

interface IUserForm {
  users: User[];
  assignee: User | null;
  onSubmit: (user: User) => void; // Excluding id since it's typically generated.
}

function UserForm({ users, assignee, onSubmit }: IUserForm) {
  const [value, setValue] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState('');
  const form = useForm();

  const onHandleSubmit = () => {
    const user = users.find((user) => user.id === value?.id) || null;
    if (user && onSubmit) {
      onSubmit(user);
    }

    form.reset();
    setValue(null);
    setInputValue('');
  };

  return (
    <>
      <form
        style={{
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
        onSubmit={form.handleSubmit(onHandleSubmit)}
      >
        <ComboBoxField form={form} name='assigneeId' label='Assignee' value={value} setValue={setValue} inputValue={inputValue} setInputValue={setInputValue} options={users} />

        <Button type='submit' variant='contained'>
          Assign
        </Button>
      </form>
    </>
  );
}

export default UserForm;
