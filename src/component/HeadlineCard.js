import React from 'react';
import { Card, Col, Row, Drawer, Button } from 'antd';
import moment from 'moment';

function HeadlineCard(props) {
	const { Meta } = Card;
	const [readMore, setReadMore] = React.useState(false);
	const [selectedRow, setSelectedRow] = React.useState(null);
	
	function showDrawer(item){
		setSelectedRow(item);
		setReadMore(true);
	}

	function onClose(){
		setReadMore(false);
		setSelectedRow(null);
	}
	
	return (
		<React.Fragment>
			<div className="site-card-wrapper">
				<Row gutter={16}>
					{ props.articleList.map((item, index) => 
						<Col key={index} style={{ marginTop: 30 }} >
							<Card
								hoverable
								style={{ width: 300 }}
								cover={<img alt={item.title} src={item.urlToImage} />}
								extra={<Button type="primary" onClick={() => showDrawer(item)}>More</Button>}
								title={item.author}
							>
								<Meta title={item.title} description={item.content} />
							</Card>
						</Col>
					)}
				</Row>
			</div>
			{ selectedRow != null && (
				<Drawer
					title={moment(selectedRow.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}
					width={720}
					onClose={onClose}
					visible={readMore}
				>
					<Card
						style={{ width: '100%' }}
						cover={<img alt={selectedRow.title} src={selectedRow.urlToImage} />}
						title={selectedRow.author}
					>
						<Meta title={selectedRow.title} description={selectedRow.description} />
						<label>For More Information : </label><br/><a href={selectedRow.url} target="_blank" rel="noopener noreferrer">{selectedRow.url}</a>
					</Card>
				</Drawer>
			)}
		</React.Fragment>
	);
}

export default HeadlineCard;