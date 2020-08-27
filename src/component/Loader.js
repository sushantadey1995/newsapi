import React from 'react';
import { Spin } from 'antd';

function Loader(props) {
	return (
		<React.Fragment>
			<Spin tip="Loading..." />
		</React.Fragment>
	);
}

export default Loader;