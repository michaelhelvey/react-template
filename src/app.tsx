import { DndProvider } from 'react-dnd'
import { Grid } from './components/Grid'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

function App() {
	// Question: is this a reliable way of determining which backend should be
	// used?  React-DND doesn't have great examples on their website.
	const isTouchDevice =
		'ontouchstart' in window || window.navigator.maxTouchPoints

	return (
		<div className="h-full w-full flex items-center justify-center flex-col">
			<h1 className="my-2 text-xl">React-DND Grid Example</h1>
			<DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
				<Grid />
			</DndProvider>
		</div>
	)
}

export default App
