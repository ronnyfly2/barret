import React, { Fragment } from 'react';
import { connect } from 'react-redux';


function adminPage(){
	return (
		<div>
			<h2>Hobbies</h2>
			<div className="column is-half is-offset-one-quarter">
				<table className="table is-bordered">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>1</th>
							<th>1</th>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

function mapState(state){
	return {}
}


export default connect( mapState )(adminPage)
