import { useState } from 'react'

export const useVerifyCode = ({ codeLength = 0 }) => {
  const [codeValue, setCodeValue] = useState<string[]>(() => Array(codeLength).fill(''))

  return { inputValue: codeValue?.join(''), codeValue, setCodeValue }
}
