import React, { useEffect } from 'react';
import { Layout, Typography } from 'antd';
import { connect } from 'react-redux';
import Callapi from '../api/Callapi';
import * as Actions from '../store/actions';
import AppHeader from './Header';
import AppFooter from './Footer';
import HeadlinesRelevent from './HeadlinesRelevent';
import Loader from './Loader';

function Headlines(props) {
	const { dispatch, headlines } = props;
	const { Content } = Layout;
	const { Title } = Typography;
	const sourceresponse = headlines.sourcesHeadlines;
	const [isLoading, setIsLoading] = React.useState(true);
	const [articleFound, setArticleFound] = React.useState(false);
	
	useEffect(() => {
		Callapi.get('/v2/sources?country=us').then(response => {
								dispatch(Actions.getHeadlinesFromSources(response.data.sources));
								setIsLoading(false);
								if(response.data.sources.length > 0 ){
									setArticleFound(false);
								}else{
									setArticleFound(true);
								}
							}
						);
	},[dispatch]);
	
	return (
		<React.Fragment>
			<Layout className="layout">
				<AppHeader />
					<Content className="site-layout-content">
						{ isLoading ? (<Loader />) : (
							<>
								{	sourceresponse.map((item, index) => <HeadlinesRelevent stype={item.id} key={index}/> )}
							</>
						)}
						{ articleFound && (<Title level={6}>articles not found</Title> )}
					</Content>
				<AppFooter />
			</Layout>
		</React.Fragment>
	);
}

const getList =(state) => {
	return state;
}

export default connect(getList)(Headlines);