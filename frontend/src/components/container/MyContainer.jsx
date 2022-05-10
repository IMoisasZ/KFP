import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../button/MyButton'
import style from '../container/MyContainer.module.css'

function MyContainer({
	children,
	minHeight,
	maxHeight,
	height,
	marginTop,
	alignItems,
	justifyContent,
	backgroundColor = '#191970',
}) {
	if (backgroundColor === 'main') {
		backgroundColor = 'white'
	}

	return (
		<div
			className={style.container}
			style={{
				minHeight,
				maxHeight,
				height,
				marginTop,
				alignItems,
				justifyContent,
				backgroundColor,
			}}>
			{children}
		</div>
	)
}

export default MyContainer
