import React from 'react';
import { Layout, Pagination, Input, Typography, Divider } from 'antd';
import { connect } from 'react-redux';
import Callapi from '../api/Callapi';
import * as Actions from '../store/actions';
import AppHeader from './Header';
import AppFooter from './Footer';
import HeadlineCard from './HeadlineCard';
import Loader from './Loader';

function HeadlinesSearch(props) {
	const { dispatch, headlines } = props;
	const { Content } = Layout;
	const { Search } = Input;
	const { Title } = Typography;
	const newsresponse = headlines.searchHeadlines;
	const [page, setPage] = React.useState(1);
	const [rowsPerPage, setRowsPerPage] = React.useState(8);
	const [searchText, setSearchText] = React.useState(headlines.searchWithText);
	const [isLoading, setIsLoading] = React.useState(false);
	const [articleFound, setArticleFound] = React.useState(false);
	const [timeOut, setTimeOut] = React.useState(0);
	
	function searchHeadlines(str) {
		setIsLoading(true);
		setSearchText(str);
		dispatch(Actions.searchedText(str));
		if(timeOut) clearTimeout(timeOut);
		setTimeOut(
			setTimeout(function(){
				Callapi.get(`/v2/top-headlines?q=${str}`).then(response => {
										dispatch(Actions.searchedHeadlines(response.data.articles));
										setIsLoading(false);
										if(response.data.articles.length > 0 ){
											setArticleFound(false);
										}else{
											setArticleFound(true);
										}
									}
								);
			}, 500)
		)
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
						<Search
							placeholder="input search text"
							enterButton="Search"
							size="large"
							value={searchText}
							onSearch={event => searchHeadlines(event)}
							onChange={event => searchHeadlines(event.target.value)}
						/>
						{ searchText.length > 0 && (<Title level={5}>{newsresponse.length} results found for {searchText}</Title> )}
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

export default connect(getList)(HeadlinesSearch);