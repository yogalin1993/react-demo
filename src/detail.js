import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Card, Col, Row, Table } from 'antd'

class inventoryDetail extends React.Component{
	render() {
    const { list } = this.props.inventoryDetail
    const person = list.delivery_person
    const dataSource = list.skus
    const columns = [{
      title: '编号',
      render: (text, record, index) => <span>{index + 1}</span>
    }, {
      title: 'SKU',
      dataIndex: 'name',
    }, {
      title: 'SKU-ID',
      dataIndex: 'id',
    }, {
      title: '数量',
      dataIndex: 'amount',
    }]
		return(
      <div>
        <Card>
          <Row style={{lineHeight: 3}}>
            <Col span={8}>提货单编号：{list.trade_no}</Col>
            <Col span={8}>创建时间：{list.created_at}</Col>
            <Col span={8}>最后编辑时间：</Col>
          </Row>
          <Row style={{lineHeight: 3}}>
            <Col span={8}>提货单状态：{list.current_status.name}</Col>
            <Col span={8}>审核时间：{list.current_status.time}</Col>
          </Row>
          <Row style={{lineHeight: 3}}>
            <Col span={8}>审核备注：</Col>
          </Row>
        </Card>
        <Card style={{marginTop: 20}}>
          <Row style={{lineHeight: 3}}>
            <Col span={8}>出货仓：</Col>
            <Col span={8}>入货仓：{list.destination}</Col>
            <Col span={8}>提货时间：</Col>
          </Row>
          <Row style={{lineHeight: 3}}>
            <Col span={8}>提货人：{person.name}</Col>
            <Col span={8}>电话：{person.phone}</Col>
            <Col span={8}>身份证：{person.id_card_num}</Col>
          </Row>
          <Row style={{lineHeight: 3}}>
            <Col span={8}>车牌：{person.plate_num}</Col>
          </Row>
        </Card>
        <Card style={{marginTop: 20}}>
          <Table 
            key='id' 
            columns={columns} 
            dataSource={dataSource}
            pagination={false}
            bordered={true}
          />
        </Card>
      </div>
		)
	}
}

export default connect(({ inventoryDetail }) => ({ inventoryDetail }))(inventoryDetail)
