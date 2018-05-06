import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;

class CardComponent extends React.Component {
	render () {
		return (
			<Card
			hoverable
			style={{ width: 240 }}
			cover={<img alt= {this.props.infoCard.name} src= {this.props.infoCard.image_url} height="225"
						width="348"/>}
			>
			<Meta
			title={this.props.infoCard.name}
			description= {this.props.infoCard.description}
			/>
			</Card>
			)
	}
	
}

export default CardComponent