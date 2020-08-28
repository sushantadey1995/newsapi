import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from 'antd';
import { connect } from 'react-redux';
import Callapi from '../api/Callapi';
import * as Actions from '../store/actions';
import {
  MenuOutlined
} from '@ant-design/icons';

function Header(props) {
	const { Header } = Layout;
	const { SubMenu } = Menu;
	const { dispatch } = props;
	const [sourceresponse, setSourceresponse] = React.useState([]);
	const [visible, setVisible] = React.useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};
	
	useEffect(() => {
		Callapi.get('/v2/sources?country=us').then(response => {
								setSourceresponse(response.data.sources);
								dispatch(Actions.getHeadlinesFromSources(response.data.sources));
							}
						);
	},[dispatch]);
	
	function renderMenu(mode){
		return (
			<Menu theme="dark" mode={mode} >
				<Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>
				<SubMenu title="News Category" >
					<Menu.Item key="2"><NavLink to="/business">Business</NavLink></Menu.Item>
					<Menu.Item key="3"><NavLink to="/entertainment">Entertainment</NavLink></Menu.Item>
					<Menu.Item key="4"><NavLink to="/general">General</NavLink></Menu.Item>
					<Menu.Item key="5"><NavLink to="/health">Health</NavLink></Menu.Item>
					<Menu.Item key="6"><NavLink to="/science">Science</NavLink></Menu.Item>
					<Menu.Item key="7"><NavLink to="/sports">Sports</NavLink></Menu.Item>
					<Menu.Item key="8"><NavLink to="/technology">Technology</NavLink></Menu.Item>
				</SubMenu>
				<Menu.Item key="9"><NavLink to="/search">Search</NavLink></Menu.Item>
				<SubMenu title="Sources" >
				{	sourceresponse.map((item, index) => <Menu.Item key={9+index}><NavLink to={`/sources/${item.id}`}>{item.id}</NavLink></Menu.Item> )}
				</SubMenu>
			</Menu>
		)
	}
	
	return (
		<Header className="fixed-header">
			<div className="logo"><NavLink to="/">DailyNews</NavLink></div>
			<div className="horizontalMenu">{ renderMenu('horizontal') }</div>
			<Button type="secondary" onClick={showDrawer} className="inlineMenu">
				<MenuOutlined />
			</Button>
			<Drawer
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				{ renderMenu('inline')}
			</Drawer>
		</Header>
	);
}

const getList =(state) => {
	return state;
}

export default connect(getList)(Header);