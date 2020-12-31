export const filterData = (
	data: Object[],
	filter: string,
) => {
	const filteredData = data.filter((item) => {
		return Object.values(item)
			.map((value) => {
				return String(value)
			})
			.find((value) => {
				return value.toLowerCase().includes(filter)
			})
	})
	return filteredData
}

export const pad = (num: string, size: number) => {
	while (num.length < size) num = "0" + num;
	return num;
}