import React from "react";
import ReactDOM from "react-dom";

import PCHeader from "./pc_header";
import PCNewsContainer from "./pc_newscontainer";
import PCFooter from "./pc_footer";
export default class PCIndex extends React.Component{
	render(){
		return(
			<div>
				<PCHeader/>
				<PCNewsContainer/>
				<PCFooter/>
			</div>
		);
	}
}
