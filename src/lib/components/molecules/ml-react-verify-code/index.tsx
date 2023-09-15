import { ReactVerifyCodeInput } from '../../atoms'
import { v4 as uuidv4 } from 'uuid'

export interface ReactVerifyCodeProps {
  codeValue?: string[]
  wrapperClassName?: string
  inputClassName?: string
  handleKeyboardActions: (value: string) => void
  inputRef: React.RefObject<HTMLInputElement>
  handleChangeInput: (value: string | number) => void
  currentIndex?: number
  handleOnClick: (index: number) => void
}

export const ReactVerifyCode = ({
  codeValue = [],
  inputClassName = 'border-2',
  wrapperClassName = '',
  inputRef,
  currentIndex,
  handleChangeInput,
  handleOnClick,
}: ReactVerifyCodeProps) => {
  return (
    <div className={wrapperClassName}>
      {Array.from({ length: codeValue?.length })?.map((_, index) => (
        <input
          key={uuidv4()}
          maxLength={1}
          className={`${inputClassName} ${currentIndex === index ? 'focused' : ''}`}
          size={1}
          type="tel"
          min="0"
          max="9"
          // autoFocus={currentIndex === index ? true : undefined}
          data-testid={`verify-code-${index}`}
          name="verify-code"
          onChange={(event) => handleChangeInput(event.target.value)}
          onClick={() => handleOnClick(index)}
          ref={currentIndex === index ? inputRef : undefined}
          value={codeValue[index]}
        />
      ))}
      {codeValue}
    </div>
  )
}
