import { useState } from 'react'

interface Props {
  codeLength: number
}

export const useVerifyCode = ({ codeLength = 0 }: Props) => {
  const [codeValue, setCodeValue] = useState<string[]>(() => Array(codeLength).fill(''))
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleChangeInput = (value: string | number) => {
    if (value !== '' && !isNaN(Number(value)) && currentIndex < codeLength - 1) {
      const stringValue = value?.toString()

      setCodeValue(
        (prevCodeValue) =>
          prevCodeValue?.map((currentValue, idx) => (idx === currentIndex ? stringValue : currentValue)),
      )
      setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1)
    }
  }

  return { inputValue: codeValue?.join(''), codeValue, setCodeValue, handleChangeInput, currentIndex }
}
