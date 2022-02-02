import React, {Fragment, useEffect, useState} from 'react'
import {Card, Col, Collapse, Layout, Row, Space, Table, Typography} from 'antd'
import {useTranslation} from 'react-i18next'
import moment from 'moment'

import {TReport} from './ReportsLayout'
import {PieChart} from 'react-minimal-pie-chart'

type TAccordionProps = {
  data: TReport
  oneProject: boolean
  oneGateway: boolean
  loading: boolean
}

type TPanel = {
  name: string,
  id: string,
  totalAmount: number,
  tableRows: TRow[]
}

type TRow = {
  date: string | number
  transactionId: string
  amount: number
}

type TColumn = {
  title: string,
  dataIndex: string
  key: string
}

const defaultPieChartColors = ['#A259FF', '#F24E1E', '#FFC107', '#6497B1']


const formatPrice = (price: number, decimals = 0) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    currencyDisplay: 'code',
  })
  const priceParts = formatter.formatToParts(price).map(({value}) => value)
  priceParts.push(priceParts[1], priceParts[0])
  priceParts.splice(0, 2)
  return priceParts.join('')
}

const Report = ({data, oneProject, oneGateway, loading}: TAccordionProps) => {
  const {t} = useTranslation('translation', {keyPrefix: 'reports.accordion'})

  const [columns, setColumns] = useState<TColumn[]>([])

  useEffect(() => {
    const defaultColumns = [
      {
        title: t('table.columns.date'),
        dataIndex: 'date',
        key: 'date',
        render: (date: string) => <Typography>{moment(date).format('MM/DD/yyyy')}</Typography>,
      },
      {
        title: t('table.columns.transactionId'),
        dataIndex: 'transactionId',
        key: 'transactionId',
      },
      {
        title: t('table.columns.amount'),
        dataIndex: 'amount',
        key: 'amount',
        render: (amount: number) =>
          <Space style={{justifyContent: 'right', width: '100%'}}>
            <Typography>{formatPrice(amount)}</Typography>
          </Space>,
      },
    ]
    const gatewayNameColumn = {
      title: t('table.columns.gatewayName'),
      dataIndex: 'gatewayName',
      key: 'gatewayName',
    }
    if (!oneProject && !oneGateway) {
      defaultColumns.splice(1, 0, gatewayNameColumn)
    }
    setColumns(defaultColumns)
  }, [oneProject, oneGateway, t])

  let totalPrice = 0
  const dataSource: TPanel[] = (!oneProject || oneGateway) ?
    Object.keys(data.paymentsByProject).map((projectId) => {
      const project = data.paymentsByProject[projectId]
      totalPrice += project.totalAmount
      return {
        name: project.name,
        id: projectId,
        totalAmount: project.totalAmount,
        tableRows: project.payments,
      }
    }) :
    Object.keys(data.paymentsByGateway).map((gatewayId) => {
      const gateway = data.paymentsByGateway[gatewayId]
      totalPrice += gateway.totalAmount
      return {
        name: gateway.name,
        id: gatewayId,
        totalAmount: gateway.totalAmount,
        tableRows: gateway.payments,
      }
    })

  const pieChartData = dataSource.map((panel, index) => ({
    title: panel.name, value: panel.totalAmount, color: defaultPieChartColors[index],
  }))

  const displayChart = (oneProject && !oneGateway) || (oneGateway && !oneProject)

  return (
    <Card bordered={false} style={{background: 'white', height: '100%'}}
          loading={loading}
          bodyStyle={{height: '100%'}}
    >
      {Boolean(dataSource.length) &&
        <Fragment>
          <Row>
            <Col span={displayChart ? 16 : 24}>
              <Card style={{background: '#F1FAFE', borderRadius: 10}} bordered={false}>
                {oneProject && oneGateway && (
                  <Table columns={columns} dataSource={dataSource[0]?.tableRows.map((row, key) => ({...row, key}))}
                         pagination={false} />
                )}
                {!(oneProject && oneGateway) &&
                  <Collapse accordion>
                    {dataSource.map((panel) => (
                      <Collapse.Panel
                        header={<Space style={{justifyContent: 'space-between', width: '100%'}}>
                          <Typography.Title level={5}>{panel.name}</Typography.Title>
                          <Typography.Title
                            level={5}>{t('table.totalAmount', {amount: formatPrice(panel.totalAmount, 0)})}</Typography.Title>
                        </Space>}
                        key={panel.id}
                        style={{background: 'transparent', borderRadius: '10px'}}
                        showArrow={false}
                      >
                        <Table columns={columns} dataSource={panel.tableRows.map((row, key) => ({...row, key}))}
                               pagination={false} />
                      </Collapse.Panel>
                    ))}
                  </Collapse>}
              </Card>
            </Col>
            {displayChart &&
              <Col span={8}>
                <Card style={{borderRadius: 10}} bordered={false} bodyStyle={{padding: '0 0 0 30px'}}>
                  <Space style={{background: '#F1FAFE', borderRadius: 10, padding: 20, height: 53, width: '100%'}}
                         size={'large'}>
                    {pieChartData.map((panel, index) => (
                      <Space size={'small'} key={`pie-chart-${index}`}>
                        <div style={{width: 15, height: 15, backgroundColor: panel.color}} />
                        <Typography.Text>{panel.title}</Typography.Text>
                      </Space>
                    ))}
                  </Space>
                  <Space direction={'vertical'} align={'center'} style={{width: '100%'}}>
                    <PieChart
                      radius={45}
                      lineWidth={50}
                      paddingAngle={1}
                      label={({dataEntry}) => Math.round(dataEntry.percentage) + '%'}
                      labelPosition={100 - 50 / 2}
                      labelStyle={{fill: '#ffffff', pointerEvents: 'none', fontSize: 4}}
                      data={pieChartData}
                    />
                  </Space>
                  <Space style={{background: '#F1FAFE', borderRadius: 10, padding: 20, height: 53, width: '100%'}}
                         size={'large'}>

                    <Typography.Title level={5}>
                      {oneProject ?
                        t('table.totalProjectAmount', {amount: formatPrice(totalPrice, 0)}) :
                        t('table.totalGatewayAmount', {amount: formatPrice(totalPrice, 0)})
                      }
                    </Typography.Title>
                  </Space>
                </Card>
              </Col>
            }
          </Row>
          {((!oneProject && !oneGateway) || (oneProject && oneGateway)) && (
            <Layout style={{background: '#F1FAFE', borderRadius: 10, padding: 20, marginTop: 30, height: 53}}>
              <Space align={'center'} style={{height: '100%'}}>
                <Typography.Title level={5}>
                  {t('table.totalAmount', {amount: formatPrice(totalPrice, 0)})}
                </Typography.Title>
              </Space>
            </Layout>
          )}
        </Fragment>
      }
    </Card>
  )
}

export default Report