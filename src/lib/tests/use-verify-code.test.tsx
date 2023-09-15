import { renderHook, act, render } from '@testing-library/react'
import { useVerifyCode } from '../hooks'
import { ReactVerifyCode } from '../components'

describe('Hook use-verify-code Logic Tests', () => {
  const randomLength = Math.floor(Math.random() * 100)
  const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

  describe.skip('Arguments And Return hooks Properties', () => {
    it('Scenario - When hook calls with length of input code, Expectation - Then hook should return input state with same length', () => {
      // Arrange And Act
      const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

      // Assert
      expect(result.current.codeValue).toHaveLength(randomLength)
    })
  })

  describe.skip('Add Character Action', () => {
    it('Scenario - When add digit action fired, Expectation and there is space for adding another digit - Then add one digit to the result input code', () => {
      let randomDigit = ''

      // Arrange
      const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

      // Act
      for (let index = 0; index < randomLength; index++) {
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

      for (let index = 0; index < randomLength; index++) {
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
      
        result.current.handleKeyboardActions({ key: 'Backspace' })
      })

      // Assert
      expect(result.current.inputValue).toBe('')
    })

    it.skip('Scenario - When remove action fired And There is no other digits on left side, Expectation - Ensure no digit should remove from result input code', () => {
      // Arrange
      const { result } = renderHook(() => useVerifyCode({ codeLength: randomLength }))

      // Act
      act(() => {
        result.current.handleKeyboardActions({ key: 'Backspace' })
      })

      // Assert
      expect(result.current.inputValue).toBe('')
    })
  })

  describe.skip('Keyboard (Arrow keys, CTRL+V) Actions', () => {
    describe('Arrow Right Key', () => {
      it('Scenario - When user press Arrow right And There is other input on right side, Expectation - Then cursor should go one digit right', async () => {
        // Arrange
        render(<ReactVerifyCode {...result.current} />)

        // Act
        // Assert
      })

      it.skip('Scenario - When user press Arrow right And There is no other input on right side, Expectation - Ensure cursor should stay on its position', async () => {
        // Arrange
        render(<ReactVerifyCode {...result.current} />)

        // Act
        // Assert
      })
    })

    describe.skip('Arrow Left Key', () => {
      it('Scenario - When user press Arrow left And There is other input on left side, Expectation - Then cursor should go one digit left', async () => {
        // Arrange
        render(<ReactVerifyCode {...result.current} />)

        // Act
        // Assert
      })

      it('Scenario - When user press Arrow left And There is no other input on left side, Expectation - Ensure cursor should stay on its position', async () => {
        // Arrange
        render(<ReactVerifyCode {...result.current} />)

        // Act
        // Assert
      })
    })

    describe.skip('CTRL+V Key', () => {
      it('Scenario - When user press CTRL+V, Expectation - Then the value should replace to entire result code', () => {
        // Arrange
        // Act
        // Assert
      })
    })
  })
})
