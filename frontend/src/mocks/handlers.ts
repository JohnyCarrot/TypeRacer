import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('http://localhost:8000/texts/random/', () => {
        return HttpResponse.json({
            content: 'Creativity is not a single spark of brilliance but a small fire built over time. It must be fed with curiosity, patience, and bravery to try again. Eventually, that fire becomes a warm light guiding both you and others.'
        })
    }),

    http.get('http://localhost:8000/bots/random/', () => {
        return HttpResponse.json({
            id: 17,
            name: 'Dizzy Dan',
            base_wpm: 21
        })
    }),
]
