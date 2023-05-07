import {
  FormEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { BsSend } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';

interface FormProps {
  isLoading?: boolean;
  handleClick: (e: MouseEvent<SVGElement> & FormEvent<HTMLFormElement>) => void;
  handleEnter: (
    e: KeyboardEvent<HTMLTextAreaElement> & FormEvent<HTMLFormElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const Form = (
  { handleClick, handleSubmit, handleEnter, isLoading = false }: FormProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(
    ref,
    () => textareaRef.current as HTMLTextAreaElement,
    []
  );

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md">
      <textarea
        ref={textareaRef}
        disabled={isLoading}
        name="Message"
        placeholder="질문을 입력하세요."
        className="textarea textarea-bordered textarea-xs w-[calc(100%_-_4rem)]"
        onKeyDown={handleEnter}
      />
      <BsSend
        className={twMerge(
          'w-7 h-7 ml-2 align-bottom',
          isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
        )}
        onClick={handleClick}
      />
    </form>
  );
};

export default forwardRef<HTMLTextAreaElement, FormProps>(Form);
