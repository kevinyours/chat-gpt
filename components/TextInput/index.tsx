import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';

export type OnChangeProps = ChangeEventHandler<HTMLInputElement>;

interface TextInputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'style'
  > {
  label?: string;
  placeholder?: string;
  style?: string;
  inputStyle?: string;
}

const TextInput: FC<TextInputProps> = ({
  label,
  placeholder,
  style,
  inputStyle,
  ...props
}) => {
  return (
    <div className={twMerge('form-control w-full max-w-md', style)}>
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={twMerge(
          'input input-bordered input-info input-md max-w-md',
          inputStyle
        )}
        {...props}
      />
    </div>
  );
};

export default TextInput;
