export function arrayMoveItem<T>(arr: T[], src: number, dest: number) {
	const copy = [...arr]
	const [srcItem] = copy.splice(src, 1)
	copy.splice(dest, 0, srcItem)
	return copy
}
