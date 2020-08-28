
export function getTopHeadlines(data) {
	return	{
				type: "TOPHEADLINES",
				payload: data
			}
}

export function getCategoryWiseHeadlines(data,type) {
	return	{
				type: type,
				payload: data
			}
}

export function getHeadlinesFromSources(data) {
	return	{
				type: "SOURCES",
				payload: data
			}
}

export function searchedHeadlines(data) {
	return	{
				type: "SEARCHHEADLINES",
				payload: data
			}
}

export function searchedText(data) {
	return	{
				type: "SEARCHTEXT",
				payload: data
			}
}
