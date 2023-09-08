import { renderHook, act } from '@testing-library/react'
import { useVerifyCode } from '../hooks'

describe('Hook use-verify-code Logic Tests', () => {
  const randomLength = Math.floor(Math.random() * 100)

  describe('Arguments And Return hooks Properties', () => {
    it('Scenario - When hook calls with length of input code, Expectation - Then hook should return input state with same length', () => {
      // Arrange And Act
      const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

      // Assert
      expect(result.current.codeValue).toHaveLength(randomLength)
    })
  })

  describe('Add Character Action', () => {
    it('Scenario - When add digit action fired, Expectation and there is space for adding another digit - Then add one digit to the result input code', () => {
      let randomDigit = ''

      // Arrange
      const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

      // Act
      for (let index = 0; index < randomLength - 1; index++) {
        const currentDigit = Math.floor(Math.random() * 9)

        act(() => {
          result.current.handleChangeInput(currentDigit)
        })

        randomDigit = randomDigit + currentDigit?.toString()

        // Assert
        expect(result.current.inputValue).toBe(randomDigit)
      }
    })

    it('Scenario - When add digit action fired and there is no space for adding another digit, Expectation - Ensure no digit added to result input code', () => {
      let randomDigit = ''

      // Arrange
      const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

      for (let index = 0; index < randomLength - 1; index++) {
        const currentDigit = Math.floor(Math.random() * 9)

        act(() => {
          result.current.handleChangeInput(currentDigit)
        })

        randomDigit = randomDigit + currentDigit?.toString()
      }

      // Act
      const oneExtraDigit = Math.floor(Math.random() * 9)
      act(() => {
        result.current.handleChangeInput(oneExtraDigit)
      })

      // Assert
      expect(result.current.inputValue).toBe(randomDigit)
    })

    it('Scenario - When add non digit action fired, Expectation - Ensure no character added to the result input code', () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      const randomCounts = Math.floor(Math.random() * 100)

      // Arrange
      const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

      // Act
      const { inputValue: beforeActionInputValue } = result.current

      for (let index = 0; index < randomCounts; index++) {
        act(() => {
          result.current.handleChangeInput(characters?.charAt(Math.floor(Math.random() * characters?.length)))
        })
      }

      // Assert
      expect(result.current.inputValue).toBe(beforeActionInputValue)
    })
  })

  describe('Remove Character Action', () => {
    it('Scenario - When remove action fired And There is other digits on left side, Expectation - Then one digit should remove from result input code', () => {
      // Arrange
      const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

      // Act
      const oneDigit = Math.floor(Math.random() * 9)

      act(() => {
        result.current.handleChangeInput(oneDigit)
      })

      act(() => {
        result.current.handleKeyboardActions('Backspace')
      })

      // Assert
      expect(result.current.inputValue).toBe('')
    })

    it('Scenario - When remove action fired And There is no other digits on left side, Expectation - Ensure no digit should remove from result input code', () => {
      // Arrange
      const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

      // Act
      act(() => {
        result.current.handleKeyboardActions('Backspace')
      })

      // Assert
      expect(result.current.inputValue).toBe('')
    })
  })
})
