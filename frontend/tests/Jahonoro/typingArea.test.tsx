import { describe, test, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TypingArea from '../../src/components/TypingArea'

describe('TypingArea component', () => {
  const sampleText = 'hello'

  test('logs input on each keystroke', async () => {
    const user = userEvent.setup()
    const onTyping = vi.fn((count) => {
      console.log('Characters typed:', count)
    })
  
    render(
      <TypingArea
        canType={true}
        text="hello world"
        onTyping={onTyping}
        onFinish={() => {}}
      />
    )
  
    const input = screen.getByPlaceholderText(/start typing here/i)
    await act(async () => {
      await user.type(input, 'hello ')
    })
  
    // Просто показать, что вызывался onTyping
    expect(onTyping).toHaveBeenCalled()
  })
  

  test('allows typing only when canType === true', async () => {
    const user = userEvent.setup()

    // Initially disabled
    render(
      <TypingArea
        canType={false}
        text={sampleText}
        onTyping={() => {}}
        onFinish={() => {}}
      />
    )

    const inputDisabled = screen.getByPlaceholderText(/wait for the green light/i)
    expect(inputDisabled).toBeDisabled()

    // Rerender with canType = true
    render(
      <TypingArea
        canType={true}
        text={sampleText}
        onTyping={() => {}}
        onFinish={() => {}}
      />
    )

    const inputEnabled = screen.getByPlaceholderText(/start typing here/i)
    expect(inputEnabled).toBeEnabled()
  })

  test('calls onTyping when typing', async () => {
    const onTypingMock = vi.fn()
    const user = userEvent.setup()

    render(
      <TypingArea
        canType={true}
        text={sampleText}
        onTyping={onTypingMock}
        onFinish={() => {}}
      />
    )

    const input = screen.getByPlaceholderText(/start typing here/i)
    await act(async () => {
      await user.type(input, 'hel')
    })

    expect(onTypingMock).toHaveBeenCalled()
  })
})
