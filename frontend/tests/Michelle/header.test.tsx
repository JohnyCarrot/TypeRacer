import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Header from '../../src/components/Header'

describe('Header komponent', () => {
    const buttonAndTitle = { 
        buttonText: 'ButtonText',
        buttonDestination: '/',
        heading: 'HeadingText'
    }

    test('zobrazí nadpis', () => {
        render(<Header 
            buttonText={buttonAndTitle.buttonText}
            buttonDestination={buttonAndTitle.buttonDestination}
            heading={buttonAndTitle.heading} />)

        expect(screen.getByText('HeadingText')).toBeInTheDocument()
    })

    test('tlačidlo "ButtonText" existuje', () => {
        render(<Header 
            buttonText={buttonAndTitle.buttonText}
            buttonDestination={buttonAndTitle.buttonDestination}
            heading={buttonAndTitle.heading} />)

        const generatedButton = screen.getByRole('button', { name: /ButtonText/i })
        expect(generatedButton).toBeInTheDocument()
    })

    test('tlačidlo "ButtonText" neexistuje ak nie je meno', async () => {
        render(<Header 
            buttonDestination={buttonAndTitle.buttonDestination}
            heading={buttonAndTitle.heading} />)

        expect(screen.queryByText('ButtonText')).not.toBeInTheDocument()
    })

    test('tlačidlo "ButtonText" neexistuje ak nie je destinácia', async () => {
        render(<Header 
            buttonText={buttonAndTitle.buttonText}
            heading={buttonAndTitle.heading} />)

        expect(screen.queryByText('ButtonText')).not.toBeInTheDocument()
    })
})
