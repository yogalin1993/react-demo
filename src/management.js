import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Card, Form, Row, Col, Input, Button, Select, Table, DatePicker } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class Management extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
      sku_list: [],
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      sku_list: nextProps.inventory.sku_list,
      loading: false,
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      const { sku_id, created_at } = values
      if (sku_id) {
        values.sku_id = Number(sku_id.key)
      }
      if (created_at) {
        values.created_at = created_at.map(item => parseInt(+item._d / 1000, 10))
      }
      this.props.dispatch({
        type: 'inventory/search',
        payload: values,
      })
    })
  }

  add = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/inventory/add',
    }))
  }

  disabledDate = (current) => {
    return current && current.valueOf() > Date.now();
  }

  viewDetails = (record) => {
    this.props.dispatch(routerRedux.push({
      pathname: `/inventory/detail/${record.id}`,
      query: {
        trade_no: record.trade_no,
      },
    }))
  }

  add = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/inventory/add',
    }))
  }

  disabledDate = (current) => {
    return current && current.valueOf() > Date.now()
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const dataSource = this.props.inventory.list
    const { sku_list, loading } = this.state
    const options = sku_list.map(d => (
      <Option key={d.id} value={d.id.toString()}>{d.name}</Option>
    ))

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    const columns = [{
      title: '提货单号',
      dataIndex: 'trade_no',
    }, {
      title: '出库仓',
    }, {
      title: '入库仓',
      dataIndex: 'destination',
    }, {
      title: 'SKU',
      dataIndex: 'name',
      render: (text, record) => {
        return {
          children: record.skus.map((item, index) => (
            <p key={index} style={{ paddingTop: index > 0 ? '15px' : '' }}>{item.name}</p>
          )),
        }
      },
    }, {
      title: '数量',
      dataIndex: 'amount',
      render: (text, record) => {
        return {
          children: record.skus.map((item, index) => (
            <p key={index} style={{ paddingTop: index > 0 ? '15px' : '' }}>{item.amount}</p>
          )),
        }
      },
    }, {
      title: '下单时间',
      dataIndex: 'created_at',
    }, {
      title: '提货单状态',
      dataIndex: 'current_status.name',
    }, {
		  title: '操作',
		  render: (text, record) => < a onClick = { this.viewDetails.bind(null, record) } > 查看详情 < /a>,
		}]

    return (
      <Card>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={40}>
            <Col span={8}>
              <FormItem {...formItemLayout} label="提货单号">
                {getFieldDecorator("trade_no")(
                  <Input placeholder="请输入提货单号" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="SKU">
                {getFieldDecorator("sku_id")(
                  <Select labelInValue placeholder="请选择SKU">
                    {options}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="下单时间">
                {getFieldDecorator("created_at")(
                  <RangePicker disabledDate={this.disabledDate} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button type="primary" style={{ marginLeft: 20 }} onClick={this.add.bind(this)}>新增</Button>
            </Col>
          </Row>
        </Form>
        <Table
          style={{ marginTop: 24 + 'px' }}
          bordered
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey="id"
        />
      </Card>
    )
  }
}

Management.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  inventory: PropTypes.object,
}

export default connect(({ inventory }) => ({ inventory }))(Form.create()(Management))
