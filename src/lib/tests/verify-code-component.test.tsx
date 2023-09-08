import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReactVerifyCode } from '../components'
import { useVerifyCode } from '../hooks'

describe('Component verify-code Tests', () => {
  const randomLength = Math.floor(Math.random() * 100)

  describe('Initial component to the dom', () => {
    it('Scenario - When component render in page, Expectation - Then cursor should focus on first digit', () => {
      // Arrange
      render(<ReactVerifyCode inputLength={randomLength} />)

      // Assert
      expect(screen.getAllByRole('verify-code')[0]).toHaveFocus()
    })
  })

  describe('Keyboard (Arrow keys, CTRL+V) Actions', () => {
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

    describe('CTRL+V Key', () => {
      it('Scenario - When user press CTRL+V, Expectation - Then the value should replace to entire result code', () => {
        // Arrange
        // Act
        // Assert
      })
    })
  })
})
