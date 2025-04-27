import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import EndScreen from '../../src/components/EndScreen'

describe('EndScreen komponent', () => {
    const mockResults = [
        { name: 'Alice', wpm: 80, isYou: true, position: 1, finishedAt: 12345 },
        { name: 'Bob', wpm: 70, position: 2, finishedAt: 12350 },
        { name: 'Charlie', wpm: 0, position: undefined, finishedAt: null },
    ]

    test('zobrazí nadpis', () => {
        render(<EndScreen results={mockResults} />)

        expect(screen.getByText('Výsledky pretekov')).toBeInTheDocument()
    })

    test('zobrazí všetkých hráčov', () => {
        render(<EndScreen results={mockResults} />)

        expect(screen.getByText('1. Alice (You)')).toBeInTheDocument()
        expect(screen.getByText('2. Bob')).toBeInTheDocument()
        expect(screen.getByText('— Charlie')).toBeInTheDocument()
    })

    test('zobrazí správne info pre hráča čo ešte nedokončil', () => {
        render(<EndScreen results={mockResults} />)

        expect(screen.getByText('Still racing...')).toBeInTheDocument()
    })

    test('tlačidlo "Späť na úvod" existuje', () => {
        render(<EndScreen results={mockResults} />)

        const backButton = screen.getByRole('button', { name: /späť na úvod/i })
        expect(backButton).toBeInTheDocument()
    })

    test('tlačidlo "Hrať znova" existuje', () => {
        render(<EndScreen results={mockResults} />)

        const retryButton = screen.getByRole('button', { name: /hrať znova/i })
        expect(retryButton).toBeInTheDocument()
    })
})
