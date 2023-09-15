import { useEffect, useRef, useState } from 'react'

interface Props {
  codeLength: number
}

export const useVerifyCode = ({ codeLength = 0 }: Props) => {
  const [codeValue, setCodeValue] = useState<string[]>(() => Array(codeLength).fill(''))
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChangeInput = (value: string | number) => {
    if (value !== '' && !isNaN(Number(value)) && currentIndex <= codeLength - 1 && codeValue[currentIndex] === '') {
      const stringValue = value?.toString()

      setCodeValue(
        (prevCodeValue) =>
          prevCodeValue?.map((currentValue, idx) => (idx === currentIndex ? stringValue : currentValue)),
      )

      setCurrentIndex((prevCurrentIndex) => (currentIndex !== codeLength - 1 ? prevCurrentIndex + 1 : currentIndex))
    }
  }

  const handleKeyboardActions = (event: any) => {
    const value = event.key

    if (value === 'ArrowLeft' && currentIndex > 0) {
      setCurrentIndex((prevCurrentIndex) => prevCurrentIndex - 1)
    } else if (value === 'ArrowRight' && currentIndex < codeLength - 1) {
      setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1)
    } else if (value === 'Delete' || value === 'Backspace') {
      if (currentIndex >= 0) {
        setCodeValue(
          (prevCodeValue) => prevCodeValue?.map((currentValue, idx) => (idx === currentIndex ? '' : currentValue)),
        )
        setCurrentIndex((prevCurrentIndex) => (currentIndex !== 0 ? prevCurrentIndex - 1 : 0))
      }
    }
  }

  const handleOnClick = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()

    window.addEventListener('keyup', handleKeyboardActions, false)
    return () => {
      window.removeEventListener('keyup', handleKeyboardActions)
    }
  }, [inputRef?.current])

  return {
    handleKeyboardActions,
    inputValue: codeValue?.join(''),
    codeValue,
    setCodeValue,
    handleChangeInput,
    currentIndex,
    setCurrentIndex,
    inputRef,
    handleOnClick,
  }
}
