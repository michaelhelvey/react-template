import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import clsx from 'clsx'

function GridItem({ index }: { index: number }) {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'GRID_ITEM',
		collect(monitor) {
			return {
				isDragging: monitor.isDragging(),
			}
		},
	}))

	return (
		<div
			className={clsx(
				'h-64 w-64 m-1 grid place-items-center',
				isDragging
					? 'bg-none'
					: 'bg-blue-300 font-bold text-2xl text-white'
			)}
			ref={drag}
		>
			{isDragging ? null : index}
		</div>
	)
}

const ITEMS = Array.from({ length: 8 }, (_, i) => i + 1)

function Grid() {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="border border-gray-300 rounded shadow p-6 grid grid-flow-row grid-cols-4">
				{ITEMS.map((num) => (
					<GridItem key={num} index={num} />
				))}
			</div>
		</DndProvider>
	)
}

function App() {
	return (
		<div className="h-full w-full grid place-items-center">
			<Grid />
		</div>
	)
}

export default App
