import React, { useEffect } from 'react';
import { Layout, Pagination, Typography, Divider } from 'antd';
import { connect } from 'react-redux';
import Callapi from '../api/Callapi';
import * as Actions from '../store/actions';
import AppHeader from './Header';
import AppFooter from './Footer';
import HeadlineCard from './HeadlineCard';
import Loader from './Loader';

function HeadlinesCategoryWise(props) {
	const { dispatch, headlines } = props;
	const { Content } = Layout;
	const { Title } = Typography;
	const [newsresponse, setNewsresponse] = React.useState(getArticleList());
	const [page, setPage] = React.useState(1);
	const [rowsPerPage, setRowsPerPage] = React.useState(8);
	const [isLoading, setIsLoading] = React.useState(true);
	const [articleFound, setArticleFound] = React.useState(false);
	
	useEffect(() => {
		Callapi.get(`/v2/top-headlines?category=${props.stype}`).then(response => {
								setNewsresponse(response.data.articles);
								dispatch(Actions.getCategoryWiseHeadlines(response.data.articles,(props.stype).toUpperCase()));
								setIsLoading(false);
								if(response.data.articles.length > 0 ){
									setArticleFound(false);
								}else{
									setArticleFound(true);
								}
							}
						);
	},[dispatch, props.stype]);
	
	function getArticleList(){
		if(props.stype === "business"){
			return headlines.businessHeadlines;
		} else if(props.stype === "entertainment"){
			return headlines.entertainmentHeadlines;
		} else if(props.stype === "general"){
			return headlines.generalHeadlines;
		} else if(props.stype === "health"){
			return headlines.healthHeadlines;
		} else if(props.stype === "science"){
			return headlines.scienceHeadlines;
		} else if(props.stype === "sports"){
			return headlines.sportsHeadlines;
		} else if(props.stype === "technology"){
			return headlines.technologyHeadlines;
		} else {
			return [];
		}
	}
	
	function onShowSizeChange(current, pageSize) {
		setRowsPerPage(pageSize);
	}
	
	function onPaginationChange(pageNumber) {
		setPage(pageNumber);
	}
	
	return (
		<React.Fragment>
			<Layout className="layout">
				<AppHeader />
					<Content className="site-layout-content">
						<Title level={3}>{props.stype} Headlines</Title>
						<Divider />
						{ isLoading ? (<Loader />) : (<>
							<Pagination 
								showSizeChanger
								onShowSizeChange={onShowSizeChange}
								onChange={onPaginationChange}
								defaultCurrent={page}
								current={page}
								total={newsresponse.length} 
								pageSize={rowsPerPage}
								pageSizeOptions={[8,20]}
								disabled={newsresponse.length <= 0}
								showTotal={total => `Showing ${newsresponse.slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage).length} of Total ${total} items`}
							/>
							{ newsresponse && (<HeadlineCard articleList={ newsresponse.slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage) } />) }
						</>)}
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

export default connect(getList)(HeadlinesCategoryWise);