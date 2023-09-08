import { ReactVerifyCodeInput } from '../../atoms'
import { v4 as uuidv4 } from 'uuid'

interface ReactVerifyCodeProps {
  inputLength: number
  wrapperClassName?: string
  inputClassName?: string
}

export const ReactVerifyCode = ({ inputLength, inputClassName = '', wrapperClassName = '' }: ReactVerifyCodeProps) => {
  return (
    <div className={wrapperClassName}>
      {Array.from({ length: inputLength })?.map((_, index) => (
        <ReactVerifyCodeInput
          key={uuidv4()}
          {...(index === 0 && { autoFocus: true })}
          inputClassName={inputClassName}
        />
      ))}
    </div>
  )
}
