import { XYCoord } from 'react-dnd'

export function isMouseInsideRect(mousePosition: XYCoord, rect: DOMRect) {
	// If the mouse position's X value is not between the left and right sides
	// of the rectangle, then logically it cannot be inside the rect:
	if (mousePosition.x < rect.left || mousePosition.x > rect.right) {
		return false
	}

	// The same logic applies to the Y position with respect to the rect's top
	// and bottom:
	if (mousePosition.y < rect.top || mousePosition.y > rect.bottom) {
		return false
	}

	return true
}
