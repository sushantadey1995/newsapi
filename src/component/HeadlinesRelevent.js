import React, { useEffect } from 'react';
import { Pagination, Typography, Divider } from 'antd';
import Callapi from '../api/Callapi';
import HeadlineCard from './HeadlineCard';
import Loader from './Loader';

function HeadlinesRelevent(props) {
	const { Title } = Typography;
	const [newsresponse, setNewsresponse] = React.useState([]);
	const [page, setPage] = React.useState(1);
	const [rowsPerPage, setRowsPerPage] = React.useState(4);
	const [isLoading, setIsLoading] = React.useState(true);
	const [articleFound, setArticleFound] = React.useState(false);
	
	useEffect(() => {
		Callapi.get(`/v2/top-headlines?sources=${props.stype}`).then(response => {
								setNewsresponse(response.data.articles);
								setIsLoading(false);
								if(response.data.articles.length > 0 ){
									setArticleFound(false);
								}else{
									setArticleFound(true);
								}
							}
						);
	},[props.stype]);
	
	function onShowSizeChange(current, pageSize) {
		setRowsPerPage(pageSize);
	}
	
	function onPaginationChange(pageNumber) {
		setPage(pageNumber);
	}
	
	return (
		<React.Fragment>
			<Title level={3}>{props.stype} Headlines</Title>
			<Divider />
			{ isLoading ? (<Loader />) : (<>
				<Pagination 
					onShowSizeChange={onShowSizeChange}
					onChange={onPaginationChange}
					defaultCurrent={page}
					current={page}
					total={newsresponse.length} 
					pageSize={rowsPerPage}
					pageSizeOptions={[4,8]}
					disabled={newsresponse.length <= 0}
					showTotal={total => `Showing ${newsresponse.slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage).length} of Total ${total} items`}
				/>
					{ newsresponse && (<HeadlineCard articleList={ newsresponse.slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage) } />) }
			</>)}
			{ articleFound && (<Title level={6}>articles not found</Title> )}
			<br/>
		</React.Fragment>
	);
}

export default HeadlinesRelevent;