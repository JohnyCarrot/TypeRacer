import { render, screen, act } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import GameScreen from '../../src/components/GameScreen'
import EndScreen from '../../src/components/EndScreen'

describe('GameScreen timer', () => {
    test('nezobrazi casovac pred zaciatkom hry', () => {
        render(<GameScreen />)

        expect(screen.queryByText(/Time left:/i)).not.toBeInTheDocument()
    })
})

describe('EndScreen cas a vysledky', () => {
    test('zobrazi vysledok hraca s ukoncenym casom', () => {
        const results = [
            { name: 'You', wpm: 75, isYou: true, position: 1, finishedAt: 120000 },
        ]

        render(<EndScreen results={results} />)

        expect(screen.getByText('1. You (You)')).toBeInTheDocument()
        expect(screen.queryByText('Still racing...')).not.toBeInTheDocument()
    })

    test('zobrazi "Still racing..." ak hrac nema finishedAt', () => {
        const results = [
            { name: 'PlayerX', wpm: 0, position: undefined, finishedAt: null },
        ]

        render(<EndScreen results={results} />)

        expect(screen.getByText('Still racing...')).toBeInTheDocument()
    })
})


