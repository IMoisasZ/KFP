import { format, addDays } from 'date-fns'

function formatDate(date) {
	return format(addDays(new Date(date), 1), 'dd-MM-yyyy')
}

export default formatDate
