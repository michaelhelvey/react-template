import { render, screen } from '@testing-library/react'
import App from './app'

test('it renders using vitests & happy-dom', () => {
	render(<App />)
	expect(screen.getByText(/hello, world/i)).toBeInTheDocument()
})
