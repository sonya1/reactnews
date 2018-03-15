import React from "react";
import ReactDOM from "react-dom";
import { Tabs,Carousel } from 'antd';
const TabPane = Tabs.TabPane;
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import MobileList from './mobile_list';

export default class MobileIndex extends React.Component{
	render(){

		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		};

		return(
			<div>
				<MobileHeader/>

				<Tabs defaultActiveKey="top">
				    <TabPane tab="头条" key="top">
				    	<div class="carousel">
							<Carousel {...settings}>
								<div><img src="./src/images/carousel_1.jpg"/></div>
								<div><img src="./src/images/carousel_2.jpg"/></div>
								<div><img src="./src/images/carousel_3.jpg"/></div>
								<div><img src="./src/images/carousel_4.jpg"/></div>
							</Carousel>
						</div>
						<MobileList count={20} type="top"/>

				    </TabPane>
				    <TabPane tab="社会" key="shehui">
						<MobileList count={20} type="shehui"/>

				    </TabPane>
				    <TabPane tab="国内" key="guonei">
						<MobileList count={20} type="guonei"/>

				    </TabPane>
				    <TabPane tab="国际" key="guoji">
						<MobileList count={20} type="guoji"/>

				    </TabPane>
				    <TabPane tab="娱乐" key="yule">
						<MobileList count={20} type="yule"/>

				    </TabPane>
				    <TabPane tab="体育" key="tiyu">
						<MobileList count={20} type="tiyu"/>

				    </TabPane>
				    <TabPane tab="科技" key="keji">
						<MobileList count={20} type="keji"/>

				    </TabPane>
				    <TabPane tab="时尚" key="shishang">
						<MobileList count={20} type="shishang"/>

				    </TabPane>
				</Tabs>
				
				<MobileFooter/>
			</div>
		);
	}
}
