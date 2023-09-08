interface ReactVerifyCodeInputProps {
  inputClassName?: string
  autoFocus?: boolean
}

export const ReactVerifyCodeInput = ({ inputClassName = '', autoFocus = false }: ReactVerifyCodeInputProps) => {
  return (
    <input
      maxLength={1}
      className={inputClassName}
      size={1}
      type="tel"
      {...(autoFocus && { autoFocus: true })}
      min="0"
      max="9"
      role="verify-code"
    />
  )
}
