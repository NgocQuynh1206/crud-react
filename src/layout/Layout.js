import React from 'react';
import Card from '../components/Card.js';
import Modal from '../components/Modal';

import {List, Button} from 'antd';

class Layout extends React.Component {
	constructor() {
		super();
		this.state = {
			endpoint: 'https://crud-01.herokuapp.com/api/celebrities',
			listItem: [],
			visible: false,
		};
	}

	componentDidMount() {
		fetch(this.state.endpoint)
		.then(response => response.json())
		.then(item => this.setState({listItem: item}))
		.catch(err => console.log(err));
	}


	showModal = () => {
		this.setState({
			visible: true,
		});
	}
	handleOk = () => {
		const form = this.formRef.props.form;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			fetch(this.state.endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})
			.then(response => response.json())
			.then(data => {
				fetch(`${this.state.endpoint}/${data.insertId}`, {
					method: 'GET'
				})
				.then(res => res.json())
				.then(item => this.setState({listItem: [...this.state.listItem, item[0]], visible: false}))
				.catch(err => console.log(err))
			})
			.catch(err => console.log(err));
			form.resetFields();
		});
	}
	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
			visible: false,
		});
	}

	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	render() {
		return (
			<div>
			<div style={{
				textAlign: 'center',
				padding: '100px 0px',
				backgroundColor: '#fff',
			}}>

			<Button type="primary" onClick={this.showModal}>Open</Button>


			<Modal
			wrappedComponentRef={this.saveFormRef}
			visible={this.state.visible}
			onOk={this.handleOk}
			onCancel={this.handleCancel}
			titleModal="Create"
			/>
			</div>
			<List
			style={{
				padding: 24,
				backgroundColor: '#f8f9fa',
			}}
			grid={{
				gutter: 16,
				xs: 1,
				sm: 2,
				md: 2,
				lg: 2,
				xl: 4,
				xxl: 4,
			}}
			dataSource={this.state.listItem}
			renderItem={(card, index) => (
				<List.Item>
				<Card
				index={index}
				infoCard={card}
				deleteCard={this.props.deleteCard}
				editCard={this.props.editCard}
				/>
				</List.Item>
				)}
			/>
			</div>
			)
	}
}

export default Layout