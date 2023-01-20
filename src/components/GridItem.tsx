import clsx from 'clsx'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import invariant from 'tiny-invariant'
import { isMouseInsideRect } from '../utils'

type DraggableGridItem = { id: number }
type GridItemProps = DraggableGridItem & {
	value: string
	moveItem: (dragId: number, hoverId: number) => void
}

export function GridItem({ id, value, moveItem }: GridItemProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [{ isDragging }, drag] = useDrag(() => {
		return {
			type: 'GRID_ITEM',
			item: { id },
			collect(monitor) {
				return {
					isDragging: monitor.isDragging(),
				}
			},
		}
	})

	const [, drop] = useDrop(() => ({
		accept: 'GRID_ITEM',
		hover(item: DraggableGridItem, monitor) {
			if (!ref.current) {
				return
			}

			// Dragging over yourself is a noop:
			if (item.id === id) {
				return
			}

			// if the mouse crosses into the drop rect, drop the item
			const mousePosition = monitor.getClientOffset()
			invariant(
				mousePosition,
				'getClientOffset must exist if an element is currently being dragged'
			)

			if (
				isMouseInsideRect(
					mousePosition,
					ref.current.getBoundingClientRect()
				)
			) {
				moveItem(item.id, id)
			}
		},
	}))

	drag(drop(ref))

	return (
		<div
			className={clsx(
				'h-64 w-64 m-1 bg-blue-300 text-sm text-white grid place-items-center',
				{ 'opacity-0': isDragging }
			)}
			ref={ref}
		>
			<pre>{JSON.stringify({ value, id })}</pre>
		</div>
	)
}
