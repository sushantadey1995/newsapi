
const initialState = {
	topHeadlines: [],
	businessHeadlines: [],
	entertainmentHeadlines: [],
	generalHeadlines: [],
	healthHeadlines: [],
	scienceHeadlines: [],
	sportsHeadlines: [],
	technologyHeadlines: [],
	searchHeadlines: [],
	searchWithText: ""
};

const headlinesReducer = (state = initialState, action) => {
	if(action.type === "TOPHEADLINES"){
		return {
				...state,
				topHeadlines: action.payload
			};
	} else if(action.type === "BUSINESSS"){
		return {
				...state,
				businessHeadlines: action.payload
			};
	} else if(action.type === "ENTERTAINMENT"){
		return {
				...state,
				entertainmentHeadlines: action.payload
			};
	} else if(action.type === "GENERAL"){
		return {
				...state,
				generalHeadlines: action.payload
			};
	} else if(action.type === "HEALTH"){
		return {
				...state,
				healthHeadlines: action.payload
			};
	} else if(action.type === "SCIENCE"){
		return {
				...state,
				scienceHeadlines: action.payload
			};
	} else if(action.type === "SPORTS"){
		return {
				...state,
				sportsHeadlines: action.payload
			};
	} else if(action.type === "TECHNOLOGY"){
		return {
				...state,
				technologyHeadlines: action.payload
			};
	} else if(action.type === "SEARCHHEADLINES"){
		return {
				...state,
				searchHeadlines: action.payload
			};
	} else if(action.type === "SEARCHTEXT"){
		return {
				...state,
				searchWithText: action.payload
			};
	}
	
	return state;
};

export default headlinesReducer;
