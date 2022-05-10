import React from 'react'
import {
	VscSave,
	VscEdit,
	VscDiffAdded,
	VscTable,
	VscHome,
	VscDebugStepBack,
	VscFile,
} from 'react-icons/vsc'
import { BsTrash } from 'react-icons/bs'
import { MdOutlineDisabledByDefault } from 'react-icons/md'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import style from './MyButton.module.css'

function MyButton({
	children = 'name button',
	type = 'button',
	value,
	disable = false,
	hide = false,
	handleOnClick = null,
	typeImage,
	fontSize = '2em',
	title = 'Digite o titulo do button',
	color = 'white',
	backgroundColor,
	width = '4em',
	height = '3em',
	margin,
}) {
	return (
		<div className={style.container_button}>
			{typeImage === 'save' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title='Salvar'>
					<VscSave style={{ fontSize, color }} />
				</button>
			)}
			{typeImage === 'add' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					<VscDiffAdded style={{ fontSize, color }} />
				</button>
			)}
			{typeImage === 'edit' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					<VscEdit style={{ fontSize, color }} />
				</button>
			)}
			{typeImage === 'del' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					<BsTrash style={{ fontSize, color }} />
				</button>
			)}
			{typeImage === 'disable' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					<MdOutlineDisabledByDefault style={{ fontSize, color }} />
				</button>
			)}
			{typeImage === 'enable' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					<BsFillCheckCircleFill style={{ fontSize, color }} />
				</button>
			)}
			{typeImage === 'text' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					{children}
				</button>
			)}
			{typeImage === 'list' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					<VscTable style={{ fontSize, color }} />
				</button>
			)}
			{typeImage === 'home' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					<VscHome style={{ fontSize, color }} />
				</button>
			)}
			{typeImage === 'back' && (
				<button
					style={{ backgroundColor, width, height, margin }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					<VscDebugStepBack style={{ fontSize, color }} />
				</button>
			)}
			{typeImage === 'new' && (
				<button
					style={{ backgroundColor, width, height }}
					type={type}
					value={value}
					disabled={disable}
					hidden={hide}
					onClick={handleOnClick}
					title={title}>
					<VscFile style={{ fontSize, color }} />
				</button>
			)}
		</div>
	)
}

export default MyButton
