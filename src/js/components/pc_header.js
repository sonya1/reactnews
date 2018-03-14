import React from "react";
import ReactDOM from "react-dom";
import { Row,Col,Menu,Icon,Button,Modal,Tabs,Form,Input,message} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
const FormItem  = Form.Item;
const TabPane = Tabs.TabPane;
class PCHeader extends React.Component{
	constructor(){
		super();
		this.state = {
			current:"top",
			modalVisible:false,
			action:"login",
			hasLogined:false,
			userid:0,
			userNickName:""
		};
	}

	componentWillMount(){
		console.log("willMount..",localStorage,localStorage.userid);
		if(localStorage.userid){
			this.setState({
				hasLogined:true,
				userid:localStorage.userid,
				userNickName:localStorage.userNickName
			});
		}
	}

	handleClick(e){
		console.log("menu click...",e);
		if(e.key == "register"){
			this.setState({current:"register"});
			this.setState({modalVisible:true});
		}else{
			this.setState({current:e.key});
		}
	}

	handleSubmit(e){
		e.preventDefault();
		var myFetchOptions = {
			method:"GET"
		};
		var formData = this.props.form.getFieldsValue();
		console.log("submit...",formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			console.log("json...",json);
			this.setState({userNickName:json.NickUserName,userid:json.UserId});
			localStorage.userid = json.UserId;
			localStorage.userNickName = json.NickUserName;
			/*this.setState({
				userNickName:localStorage.userNickName,
				userid:localStorage.userid
			});*/

		});
		if(this.state.action == "login"){
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setState({modalVisible:false});
	}

	callback(key){
		if(key == 1){
			this.setState({action:"login"});
		}else if(key==2){
			this.setState({action:"register"});
		}
	}
	logout(){
		localStorage.userid = 0;
		localStorage.userNickName = "";
		this.setState({
			hasLogined:false,
			userid:0,
			userNickName:""
		});
	}

	render(){
		let {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined ?
			 <Menu.Item key="logout" class="register">
	            <Button type="primary">{this.state.userNickName}</Button>
			    &nbsp;&nbsp;
			    <Link target="_blank">
			    	<Button type="ghost">个人中心</Button>
			    </Link>
			    &nbsp;&nbsp;
			    <Button type="dashed" onClick={this.logout.bind(this)}>退出</Button>
	         </Menu.Item>
	         :
	          <Menu.Item key="register" class="register" onClick={this.login}>
	           <Icon type="appstore" />注册/登录
	         </Menu.Item>
		return(
			<header>
				<Row>
			      <Col span={2}></Col>
			      <Col span={4}>
			      	<a href="/" class="logo">
			      		<img src="./src/images/logo.png" alt="logo"/>
			      		<span>ReactNews</span>
			      	</a>
			      </Col>
			      <Col span={16}>
			      		<Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
					        <Menu.Item key="top">
					          <Icon type="appstore" />头条
					        </Menu.Item>
					        <Menu.Item key="shehui">
					          <Icon type="appstore" />社会
					        </Menu.Item>
					        <Menu.Item key="guinei">
					          <Icon type="appstore" />国内
					        </Menu.Item>
					        <Menu.Item key="guoji">
					          <Icon type="appstore" />国际
					        </Menu.Item>
					        <Menu.Item key="yule">
					          <Icon type="appstore" />娱乐
					        </Menu.Item>
					        <Menu.Item key="tiyu">
					          <Icon type="appstore" />体育
					        </Menu.Item>
					        <Menu.Item key="keji">
					          <Icon type="appstore" />科技
					        </Menu.Item>
					        <Menu.Item key="shishang">
					          <Icon type="appstore" />时尚
					        </Menu.Item>
					        {userShow}
					    </Menu>
			      </Col>
			      <Col span={2}></Col>
			    </Row>

			    <Modal title="用户中心" 
			    	//wrapClassName="vertical-center-modal" 
			    	visible={this.state.modalVisible}
			    	onCancel = {()=>this.setState({modalVisible:false})}
			    	onOk = {()=>this.setModalVisible(false)} 
			    	okText="关闭"
			    >
			    	<Tabs type="card" onChange={this.callback.bind(this)}>
			    		<TabPane tab="登陆" key="1">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									<Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
								</FormItem>
								<FormItem label="密码">
									<Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
								</FormItem>
								<Button type="primary" htmlType="submit">登录</Button>
							</Form>
			    		</TabPane>

			    		<TabPane tab="注册" key="2">
			    			<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
						        <FormItem
						          label="账户"
						        >
						          <Input  {...getFieldProps('r_userName', { initialValue: '' })} placeholder="请输入账号" />
        						</FormItem>

						        <FormItem
						          label="密码"
						        >
						        	<Input type="password" {...getFieldProps('r_password', { initialValue: '' })} placeholder="请输入密码" />
        						</FormItem>

        						<FormItem
						          label="确认密码"
						        >
						        	<Input type="password" {...getFieldProps('r_confirmPassword', { initialValue: '' })} placeholder="请再次输入密码" />
        						</FormItem>

        						<FormItem>
						          <Button type="primary" htmlType="submit">注册</Button>
						        </FormItem>
						    </Form>
			    		</TabPane>
			    		
			    	</Tabs>

			    </Modal>



			</header>
		);
	}
}

PCHeader = Form.create()(PCHeader);
export default PCHeader;