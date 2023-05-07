import { ChangeEventHandler, useState } from 'react';
import { useRoom } from './useRoom';
import { Nullable } from '@/interfaces/shared';

export interface FormProps {
  id?: number;
  name: string;
  capacity: number;
}

export type ModeType = 'create' | 'edit' | 'delete';

export type OnClickProps = (args: {
  type: ModeType;
  value: Nullable<FormProps>;
}) => void;

export const fallback: FormProps = {
  id: undefined,
  name: '',
  capacity: 1,
};

export const initialValidState: Record<keyof Omit<FormProps, 'id'>, boolean> = {
  name: true,
  capacity: true,
};

export function useForm(initialValue = fallback) {
  const { createRoom, updateRoom, deleteRoom } = useRoom();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(initialValidState);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick: OnClickProps = async ({ type, value }) => {
    switch (type) {
      case 'create':
        await createRoom(value!);
        break;

      case 'edit':
        await updateRoom(value!);
        break;

      case 'delete':
        await deleteRoom(value!.id!);
        break;

      default:
        break;
    }

    setIsOpen(false);
  };

  const handleOpen = (value: FormProps) => {
    setIsOpen(true);
    setValue(value!);
  };

  return {
    isOpen,
    setIsOpen,
    isValid,
    setIsValid,
    value,
    setValue,
    handleOpen,
    handleClick,
    handleChange,
  };
}
