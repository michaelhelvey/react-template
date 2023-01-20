import { useCallback, useRef, useState } from 'react'
import invariant from 'tiny-invariant'
import { arrayMoveItem } from '../utils'
import { GridItem } from './GridItem'

const ITEMS = [
	{ id: 1, value: 'Tom' },
	{ id: 2, value: 'Dick' },
	{ id: 3, value: 'Harry' },
	{ id: 4, value: 'Bob' },
	{ id: 5, value: 'John' },
	{ id: 6, value: 'Michael' },
	{ id: 7, value: 'Steve' },
	{ id: 8, value: 'Timothy' },
]

export function Grid() {
	const [items, setItems] = useState(ITEMS)
	// For the sake of performance, keep a record of what item is at what index
	// for cheaper lookups in our `moveItems` function:
	const indexMap = useRef(
		new Map<number, number>(items.map((item, index) => [item.id, index]))
	)

	const moveItems = useCallback((dragId: number, hoverId: number) => {
		setItems((prevItems) => {
			const indexOfDragId = indexMap.current.get(dragId)
			const indexOfHoverId = indexMap.current.get(hoverId)

			invariant(
				typeof indexOfDragId !== 'undefined',
				`Expected item with id ${dragId} to exist in the index map`
			)
			invariant(
				typeof indexOfHoverId !== 'undefined',
				`Expected item with id ${hoverId} to exist in the index map`
			)

			const newItems = arrayMoveItem(
				prevItems,
				indexOfDragId,
				indexOfHoverId
			)

			// While this isn't terribly efficient, it does save us one
			// iteration.  A more efficient algorithm for calculating array
			// "re-flow" can be easily created, I'm sure, but we're not dealing
			// with large sets here.
			newItems.forEach((item, i) => {
				indexMap.current.set(item.id, i)
			})

			return newItems
		})
	}, [])

	return (
		<div className="grid place-items-center">
			<div className="border border-gray-300 rounded shadow p-6 grid grid-flow-row grid-cols-4 transition-all">
				{items.map((item) => (
					<GridItem
						key={item.id}
						value={item.value}
						id={item.id}
						moveItem={moveItems}
					/>
				))}
			</div>
		</div>
	)
}
