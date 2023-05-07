'use client';

import Button from '../Button';
import TextInput from '../TextInput';
import { FC, memo, useEffect } from 'react';
import {
  FormProps,
  ModeType,
  OnClickProps,
  fallback,
  initialValidState,
  useForm,
} from '@/hooks/useForm';

interface ModalProps {
  initialValue?: FormProps;
  mode?: Omit<ModeType, 'delete'>;
  isOpen?: boolean;
  onClick: OnClickProps;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = ({
  initialValue = fallback,
  mode = 'create',
  isOpen = false,
  onClick,
  onClose,
}) => {
  const { value, setValue, isValid, setIsValid, handleChange } = useForm();

  const handleClick = (type: ModeType) => {
    switch (type) {
      case 'create':
      case 'edit':
        if (!value.name || !value.capacity) {
          return setIsValid({
            name: !!value.name,
            capacity: !!value.capacity,
          });
        }

        return onClick?.({ type, value });

      case 'delete':
      default:
        return onClick?.({ type, value });
    }
  };

  useEffect(() => {
    setIsValid(initialValidState);
    setValue(initialValue);
  }, [isOpen, initialValue, setIsValid, setValue]);

  return (
    <>
      <input
        type="checkbox"
        checked={isOpen}
        readOnly={true}
        id="my-modal-3"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative max-w-[414px]">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </label>
          <TextInput
            label="Name"
            placeholder="Please enter a room name to create."
            name="name"
            value={value.name}
            onChange={handleChange}
            inputStyle={!isValid.name ? 'input-error' : ''}
          />
          <div className="flex mt-4">
            {mode === 'create' ? (
              <Button onClick={() => handleClick('create')}>Create</Button>
            ) : (
              <>
                <Button
                  style="btn-error btn-sm w-max ml-auto"
                  onClick={() => handleClick('delete')}
                >
                  Delete
                </Button>
                <Button style="btn-sm w-max ml-2 btn-success">
                  <label
                    htmlFor="my-modal-3"
                    onClick={() => handleClick('edit')}
                  >
                    Update
                  </label>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Modal);
