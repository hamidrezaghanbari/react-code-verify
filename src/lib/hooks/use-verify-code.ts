import { useState } from 'react'

interface Props {
  codeLength: number
}

type KeyProp = 'ArrowLeft' | 'ArrowRight' | 'Delete' | 'Backspace'

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

  const handleKeyboardActions = (value: KeyProp) => {
    if (value === 'ArrowLeft') {
    } else if (value === 'ArrowRight') {
    } else if (value === 'Delete' || value === 'Backspace') {
      if (currentIndex != 0) {
        setCodeValue(
          (prevCodeValue) => prevCodeValue?.map((currentValue, idx) => (idx === currentIndex - 1 ? '' : currentValue)),
        )
        setCurrentIndex((prevCurrentIndex) => prevCurrentIndex - 1)
      }
    }
  }

  return {
    handleKeyboardActions,
    inputValue: codeValue?.join(''),
    codeValue,
    setCodeValue,
    handleChangeInput,
    currentIndex,
  }
}
