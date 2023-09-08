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

    it('Scenario - When hook calls, Expectation - Then cursor should focus on first digit', () => {
      // Arrange
      // Act
      // Assert
    })
  })

  describe('Keyboard (Characters, Digits) Actions', () => {
    it('Scenario - When user press digit, Expectation and there is space for adding another digit - Then add one digit to the result input code', () => {
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

    it('Scenario - When user press digit and there is no space for adding another digit, Expectation - Ensure no digit added to result input code', () => {
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

    it('Scenario - When user press non digit, Expectation - Ensure no character added to the result input code', () => {
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

    it('Scenario - user press digit and there is space for adding another digit, Expectation - Ensure cursor focus on next digit', () => {
      // Arrange
      // Act
      // Assert
    })
  })

  describe('Keyboard (Arrow keys, Backspace, Enter, CTRL+V) Actions', () => {
    describe('Arrow Left Key', () => {
      it('Scenario - When user press Arrow left And There is other digits on left side, Expectation - Then cursor should go one digit left', () => {
        // Arrange
        // Act
        // Assert
      })

      it('Scenario - When user press Arrow left And There isn no other digits on left side, Expectation - Ensure cursor should stay on its position', () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('Arrow Right Key', () => {
      it('Scenario - When user press Arrow right And There is other digits on right side, Expectation - Then cursor should go one digit right', () => {
        // Arrange
        // Act
        // Assert
      })

      it('Scenario - When user press Arrow right And There is no other digits on right side, Expectation - Ensure cursor should stay on its position', () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('Backspace key', () => {
      it('Scenario - When user press Backspace And There is other digits on left side, Expectation - Then one digit should clean from result input code', () => {
        // Arrange
        const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

        // Act
        const { inputValue: beforeActionInputValue } = result.current
        const oneDigit = Math.floor(Math.random() * 9)

        act(() => {
          result.current.handleChangeInput(oneDigit)
        })

        act(() => {
          result.current.handleKeyboardActions('Backspace')
        })

        // Assert
        expect(result.current.inputValue).toBe(beforeActionInputValue.slice(0, -1))
      })

      it('Scenario - When user press Backspace And There is no other digits on left side, Expectation - Ensure no digit should clean from result input code', () => {
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

    describe('Enter Key', () => {
      it('Scenario - When user press Enter And Then result input code is full, Expectation - Then submit function should call', () => {
        // Arrange
        // Act
        // Assert
      })

      it('Scenario - When user press Enter And Then result input code is not full, Expectation - Then submit function should not call', () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('CTRL+V Key', () => {
      it('Scenario - When user press CTRL+V, Expectation - Then the value should replace to entire result code', () => {
        // Arrange
        // Act
        // Assert
      })
    })
  })
})
