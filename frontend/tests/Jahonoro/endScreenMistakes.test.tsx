import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import EndScreen from '../../src/components/EndScreen'

describe('EndScreen - Mistakes Table', () => {
  test('displays the mistake table if player has mistakes', () => {
    const resultsWithMistakes = [
      {
        name: 'Alice',
        wpm: 80,
        isYou: true,
        position: 1,
        finishedAt: 12345,
        mistakes: ['apple', 'banana']
      },
      {
        name: 'Bob',
        wpm: 70,
        position: 2,
        finishedAt: 12350
      },
    ]

    render(<EndScreen results={resultsWithMistakes} />)

    expect(screen.getByText(/tvoje chyby/i)).toBeInTheDocument()

    expect(screen.getByText('apple')).toBeInTheDocument()
    expect(screen.getByText('banana')).toBeInTheDocument()
  })

  test('does not render mistake table if player has no mistakes', () => {
    const resultsWithoutMistakes = [
      {
        name: 'Alice',
        wpm: 80,
        isYou: true,
        position: 1,
        finishedAt: 12345,
        mistakes: []
      },
      {
        name: 'Bob',
        wpm: 70,
        position: 2,
        finishedAt: 12350
      },
    ]

    render(<EndScreen results={resultsWithoutMistakes} />)

    expect(screen.queryByText(/tvoje chyby/i)).not.toBeInTheDocument()
  })

  test('does not render mistake table if mistakes field is undefined', () => {
    const resultsWithUndefinedMistakes = [
      {
        name: 'Alice',
        wpm: 80,
        isYou: true,
        position: 1,
        finishedAt: 12345
        // no mistakes field at all
      },
      {
        name: 'Bob',
        wpm: 70,
        position: 2,
        finishedAt: 12350
      },
    ]

    render(<EndScreen results={resultsWithUndefinedMistakes as any} />)

    expect(screen.queryByText(/tvoje chyby/i)).not.toBeInTheDocument()
  })
})
