import { format } from 'date-fns'

function today() {
	return format(new Date(), 'dd-MM-yyyy')
}

export default today
