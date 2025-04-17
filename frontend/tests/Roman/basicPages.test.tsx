import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../src/App'
import { describe, test, expect } from 'vitest'


describe('Router testy', () => {
    test('Cesta "/" existuje a nespustí 404', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        // overíme, že sa nezobrazil fallback komponent (404)
        const fallback = screen.queryByText(/404 - stránka neexistuje/i)
        expect(fallback).not.toBeInTheDocument()
    })

    test('Cesta "/singleplayer" existuje a nespustí 404', () => {
        render(
            <MemoryRouter initialEntries={['/singleplayer']}>
                <App />
            </MemoryRouter>
        )

        const fallback = screen.queryByText(/404 - stránka neexistuje/i)
        expect(fallback).not.toBeInTheDocument()
    })

    test('Neznáma cesta zobrazí 404', () => {
        render(
            <MemoryRouter initialEntries={['/nieco-neexistuje']}>
                <App />
            </MemoryRouter>
        )

        const fallback = screen.queryByText(/404 - stránka neexistuje/i)
        expect(fallback).toBeInTheDocument()
    })
})
