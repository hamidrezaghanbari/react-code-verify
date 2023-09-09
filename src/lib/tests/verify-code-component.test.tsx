import { render, renderHook, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReactVerifyCode } from '../components'
import { useVerifyCode } from '../hooks'
import userEvent from '@testing-library/user-event'

describe('Component verify-code Tests', () => {
  const randomLength = Math.floor(Math.random() * 10)
  const user = userEvent.setup()

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
      it('Scenario - When user press Arrow left And There is other digits on left side, Expectation - Then cursor should go one digit left', async () => {
        // Arrange
        render(<ReactVerifyCode inputLength={randomLength} />)

        for (let index = 0; index < randomLength; index++) {
          await user.keyboard('[ArrowRight]')
        }

        for (let index = randomLength - 1; index >= 0; index--) {
          // Act
          await user.keyboard('[ArrowLeft]')

          // Assert
          expect(screen.getAllByRole('verify-code')[index - 1]).toHaveFocus()
        }
      })

      it('Scenario - When user press Arrow left And There isn no other digits on left side, Expectation - Ensure cursor should stay on its position', async () => {
        // Arrange
        render(<ReactVerifyCode inputLength={randomLength} />)

        for (let index = 0; index < randomLength; index++) {
          await user.keyboard('[ArrowRight]')
        }

        for (let index = randomLength - 1; index >= 0; index--) {
          // Act
          await user.keyboard('[ArrowLeft]')
        }

        const oneExtraArrowLeftPress = await user.keyboard('[ArrowLeft]')

        // Assert
        expect(screen.getAllByRole('verify-code')[0]).toHaveFocus()
      })
    })

    describe('Arrow Right Key', () => {
      it('Scenario - When user press Arrow right And There is other digits on right side, Expectation - Then cursor should go one digit right', async () => {
        // Arrange
        render(<ReactVerifyCode inputLength={randomLength} />)

        for (let index = 0; index < randomLength; index++) {
          // Act
          await user.keyboard('[ArrowRight]')

          // Assert
          expect(screen.getAllByRole('verify-code')[index + 1]).toHaveFocus()
        }
      })

      it('Scenario - When user press Arrow right And There is no other digits on right side, Expectation - Ensure cursor should stay on its position', async () => {
        // Arrange
        render(<ReactVerifyCode inputLength={randomLength} />)

        for (let index = 0; index < randomLength; index++) {
          // Act
          await user.keyboard('[ArrowRight]')
        }

        const oneExtraArrowRightPress = await user.keyboard('[ArrowRight]')

        // Assert
        expect(screen.getAllByRole('verify-code')[randomLength - 1]).toHaveFocus()
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
