interface ReactVerifyCodeInputProps {
  inputClassName?: string
  autoFocus?: boolean
  handleKeyboardActions: (value: string) => void
  inputRef: React.RefObject<HTMLInputElement>
  inputValue: string
 handleChangeInput: (value: string | number) => void
}

export const ReactVerifyCodeInput = ({
  inputClassName = '',
  autoFocus = false,
  handleKeyboardActions,
  inputRef,
  inputValue,
  handleChangeInput
}: ReactVerifyCodeInputProps) => {
  return (
    <input
      maxLength={1}
      // className={inputClassName}
      size={1}
      type="tel"
      // {...(autoFocus && { autoFocus: true })}
      min="0"
      max="9"
      role="verify-code"
      name="verify-code"
      // onKeyDown={(event) => handleKeyboardActions(event?.key)}
      onChange={(event) => handleChangeInput(event.target.value)}
      ref={inputRef}
      value={inputValue}
      className=" border-2"
    />
  )
}
