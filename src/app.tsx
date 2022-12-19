import { useReducer } from 'react'

interface Todo {
	id: number
	title: string
	status: 'complete' | 'incomplete'
}

function App() {
	const [todo, updateTodo] = useReducer(
		(state: Todo, update: Partial<Todo>) => {
			return {
				...state,
				...update,
			}
		},
		{ id: 1, title: 'something todo', status: 'incomplete' }
	)

	return (
		<div className="h-full w-full grid place-items-center">
			<div className="border border-gray-300 rounded shadow p-6">
				<div
					id="todo"
					className="p-2 border border-gray-300 rounded flex items-center"
				>
					<input
						type="checkbox"
						className="mr-2"
						onChange={(e) =>
							updateTodo({
								status: e.target.checked
									? 'complete'
									: 'incomplete',
							})
						}
					></input>
					<input
						type="text"
						value={todo.title}
						className="focus:outline-none"
						onChange={(e) => updateTodo({ title: e.target.value })}
					/>
				</div>
			</div>
		</div>
	)
}

export default App
