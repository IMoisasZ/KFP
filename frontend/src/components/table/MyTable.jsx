import React from 'react'

function MyTable({ children, caption, headTable, colSpan = 3 }) {
	return (
		<table>
			<caption>{caption}</caption>
			<thead>
				<tr>
					{headTable.map((head, index) => {
						return head === 'Ações' ? (
							<th key={index} colSpan={colSpan}>
								{head}
							</th>
						) : (
							<th key={index}>{head}</th>
						)
					})}
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	)
}

export default MyTable
