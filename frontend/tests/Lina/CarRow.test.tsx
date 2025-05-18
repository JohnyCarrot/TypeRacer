import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import CarRow from '../../src/components/CarRow'

describe('CarRow komponent', () => {
    test('zobrazí meno hráča', () => {
        render(<CarRow name="Speedster42" totalChars={100} typedChars={50} />)
        expect(screen.getByText('Speedster42')).toBeInTheDocument()
    })

    test('zobrazí indikátor "(you)", ak je isYou true', () => {
        render(<CarRow name="Speedster42" isYou totalChars={100} typedChars={50} />)
        expect(screen.getByText('(you)')).toBeInTheDocument()
    })

    test('nezobrazí indikátor "(you)", ak isYou nie je zadané', () => {
        render(<CarRow name="FastFingers" totalChars={100} typedChars={50} />)
        expect(screen.queryByText('(you)')).not.toBeInTheDocument()
    })

    test('zobrazí správne WPM', () => {
        render(<CarRow name="TypeNinja" totalChars={100} typedChars={50} wpm={95} />)
        expect(screen.getByText('95 wpm')).toBeInTheDocument()
    })

    test('zobrazí defaultné WPM = 0, ak nie je zadané', () => {
        render(<CarRow name="TypeNinja" totalChars={100} typedChars={50} />)
        expect(screen.getByText('0 wpm')).toBeInTheDocument()
    })

    test('má správny progres (auto sa posúva)', () => {
        const { container } = render(
            <CarRow name="Speedster42" totalChars={100} typedChars={50} />
        )
        const carDiv = container.querySelector('div[style]')
        expect(carDiv?.getAttribute('style')).toContain('left: calc(50% - 1.25rem)')
    })

    test('progres nepresiahne 100%', () => {
        const { container } = render(
            <CarRow name="FastFingers" totalChars={100} typedChars={200} />
        )
        const carDiv = container.querySelector('div[style]')
        expect(carDiv?.getAttribute('style')).toContain('left: calc(100% - 1.25rem)')
    })
})
