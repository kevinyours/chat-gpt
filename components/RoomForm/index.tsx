'use client';

import { ChangeEventHandler, FC } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import { OnClickProps, useForm } from '@/hooks/useForm';

interface RoomFormProps {
  onClick?: OnClickProps;
}

const RoomForm: FC<RoomFormProps> = ({ onClick }) => {
  const { value, setValue, isValid, setIsValid } = useForm();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (!value.name || !value.capacity) {
      return setIsValid({
        name: !!value.name,
        capacity: !!value.capacity,
      });
    }

    return onClick?.({ type: 'create', value });
  };

  return (
    <div className="flex flex-col w-full h-full px-4 box-border">
      <section className="mt-auto">
        <TextInput
          label="Name"
          placeholder="Please enter a chat name to create."
          name="name"
          value={value.name}
          onChange={handleChange}
          inputStyle={!isValid.name ? 'input-error' : ''}
        />
      </section>
      <section className="h-6 pt-16">
        <Button onClick={handleClick}>Create</Button>
      </section>
    </div>
  );
};

export default RoomForm;
