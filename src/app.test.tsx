import { render, screen } from '@testing-library/react'
import App from './app'
import { arrayMoveItem } from './utils'

test('it renders using vitests & happy-dom', () => {
	render(<App />)
	expect(screen.getByText(/react-dnd/i)).toBeInTheDocument()
})

test('move', () => {
	const arr = ['Bob', 'Dick', 'Harry', 'John']
	const result = arrayMoveItem(arr, 0, 1)

	expect(result).toEqual(['Dick', 'Bob', 'Harry', 'John'])

	const result2 = arrayMoveItem(result, 1, 0)
	expect(result2).toEqual(['Bob', 'Dick', 'Harry', 'John'])
})
