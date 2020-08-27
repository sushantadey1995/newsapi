import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';

function Header(props) {
	const { Header } = Layout;
	const { SubMenu } = Menu;
	
	return (
		<Header className="fixed-header">
			<div className="logo"><NavLink to="/">DailyNews</NavLink></div>
			<Menu theme="dark" mode="horizontal" >
				<Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>
				<SubMenu title="News Category" >
					<Menu.Item key="2"><NavLink to="/business">Business</NavLink></Menu.Item>
					<Menu.Divider />
					<Menu.Item key="3"><NavLink to="/entertainment">Entertainment</NavLink></Menu.Item>
					<Menu.Divider />
					<Menu.Item key="4"><NavLink to="/general">General</NavLink></Menu.Item>
					<Menu.Divider />
					<Menu.Item key="5"><NavLink to="/health">Health</NavLink></Menu.Item>
					<Menu.Divider />
					<Menu.Item key="6"><NavLink to="/science">Science</NavLink></Menu.Item>
					<Menu.Divider />
					<Menu.Item key="7"><NavLink to="/sports">Sports</NavLink></Menu.Item>
					<Menu.Divider />
					<Menu.Item key="8"><NavLink to="/technology">Technology</NavLink></Menu.Item>
				</SubMenu>
				<Menu.Item key="9"><NavLink to="/search">Search</NavLink></Menu.Item>
			</Menu>
		</Header>
	);
}

export default Header;