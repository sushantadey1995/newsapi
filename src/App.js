import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import "antd/dist/antd.css";
import "./css/styles.css";
import Headlines from './component/Headlines';
import HeadlinesCategoryWise from './component/HeadlinesCategoryWise';
import HeadlinesSearch from './component/HeadlinesSearch';

function App(props) {
	return (
		<BrowserRouter>
			<div>
				<Route exact path="/" render={ (props) => <Headlines {...props} />} />
				<Route exact path="/business" render={ (props) => <HeadlinesCategoryWise stype="business" />} />
				<Route exact path="/entertainment" render={ (props) => <HeadlinesCategoryWise stype="entertainment" />} />
				<Route exact path="/general" render={ (props) => <HeadlinesCategoryWise stype="general" />} />
				<Route exact path="/health" render={ (props) => <HeadlinesCategoryWise stype="health" />} />
				<Route exact path="/science" render={ (props) => <HeadlinesCategoryWise stype="science" />} />
				<Route exact path="/sports" render={ (props) => <HeadlinesCategoryWise stype="sports" />} />
				<Route exact path="/technology" render={ (props) => <HeadlinesCategoryWise stype="technology" />} />
				<Route exact path="/search" render={ (props) => <HeadlinesSearch />} />
			</div>
		</BrowserRouter>
	);
}

export default App;