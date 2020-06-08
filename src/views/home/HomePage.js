import React, { Fragment } from 'react';
import { connect } from 'react-redux';


function homePage(){
	return (
		<div>
			<span>Home</span>
		</div>
	)
}

function mapState(state){
	return {}
}


export default connect( mapState)(homePage)
