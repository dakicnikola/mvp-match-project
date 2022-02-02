import {Button, Layout, PageHeader, Space} from 'antd'
import type {Moment} from 'moment'
import React, {Fragment, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import type {TPostReportFilter} from '../../services/api/report'
import ReportFilters from './ReportFilters'
import {usePostReportFilter} from '../../hooks/queries/report'
import {useGetProjects} from '../../hooks/queries/projects'
import {useGetGateways} from '../../hooks/queries/gateways'
import NoReports from '../../components/NoReports'
import Report from './Report'


export type TFilter = Omit<Omit<TPostReportFilter, 'from'>, 'to'> & {
  from?: Moment
  to?: Moment
}

type TPaymentsByEntity = Record<string, {
  totalAmount: number,
  name: string
  payments: {
    date: string
    gatewayName?: string
    transactionId: string
    amount: number
  }[]
}>
export type TReport = {
  paymentsByProject: TPaymentsByEntity
  gatewayTotalAmount: number
  paymentsByGateway: TPaymentsByEntity
}

const defaultReport: TReport = {
  paymentsByProject: {},
  paymentsByGateway: {},
  gatewayTotalAmount: 0,
}

interface TPayment {
  projectId: string,
  amount: number,
  created: string,
  gatewayId: string,
  paymentId: string
}

const ReportsLayout = () => {
  const {t} = useTranslation()
  const [filter, setFilter] = useState<TFilter>({})


  const projects = useGetProjects()
  const gateways = useGetGateways()

  const filteredBy = useRef({
    oneProject: Boolean(filter.projectId),
    oneGateway: Boolean(filter.gatewayId),
  })

  const allProjectsOrOneGatewayReducer = (acc: TReport, payment: TPayment) => {
    if (!acc.paymentsByProject[payment.projectId]) {
      acc.paymentsByProject[payment.projectId] = {
        totalAmount: 0,
        payments: [],
        name: projects.data?.projectsById[payment.projectId]?.name || '',
      }
    }
    const project = acc.paymentsByProject[payment.projectId]
    project.totalAmount += payment.amount
    project.payments.push({
      date: payment.created,
      gatewayName: gateways.data?.gatewaysById[payment.gatewayId].name,
      transactionId: payment.paymentId,
      amount: payment.amount,
    })
    if (filteredBy.current.oneGateway) {
      acc.gatewayTotalAmount += payment.amount
    }
    return acc
  }

  const oneProjectAndAllGatewaysReducer = (acc: TReport, payment: TPayment) => {
    if (!acc.paymentsByGateway[payment.gatewayId]) {
      acc.paymentsByGateway[payment.gatewayId] = {
        totalAmount: 0, payments: [],
        name: gateways.data?.gatewaysById[payment.gatewayId]?.name || '',
      }
    }
    const gateway = acc.paymentsByGateway[payment.gatewayId]
    gateway.totalAmount += payment.amount
    gateway.payments.push({
      date: payment.created,
      transactionId: payment.paymentId,
      amount: payment.amount,
    })
    return acc
  }


  const postReport = usePostReportFilter({
    onSuccess: data => {
      if (data.code !== '200') {
        setReport(defaultReport)
      }
      if (!filteredBy.current.oneProject || filteredBy.current.oneGateway) {
        setReport(
          data.data.reduce(allProjectsOrOneGatewayReducer, {
            paymentsByProject: {},
            paymentsByGateway: {},
            gatewayTotalAmount: 0,
          }))
      } else {
        setReport((data.data.reduce(oneProjectAndAllGatewaysReducer, {
          paymentsByProject: {},
          paymentsByGateway: {},
          gatewayTotalAmount: 0,
        })))
      }
    },
  })

  const [report, setReport] = useState<TReport>(defaultReport)

  const generateReport = async () => {
    filteredBy.current.oneProject = Boolean(filter.projectId)
    filteredBy.current.oneGateway = Boolean(filter.gatewayId)

    await postReport.mutateAsync({
      projectId: filter.projectId,
      gatewayId: filter.gatewayId,
      from: filter.from?.format('yyyy-MM-DD'),
      to: filter.to?.format('yyyy-MM-DD'),
    })
  }

  return (
    <Fragment>
      <PageHeader
        title={t('reports.title')}
        subTitle={t('reports.subtitle')}
        ghost={true}
        extra={
          <Space size={'large'}>
            <ReportFilters filter={filter} setFilter={setFilter}
                           projects={projects.isSuccess && projects.data.code === '200' ? projects.data.data : []}
                           projectsLoading={projects.isLoading}
                           gateways={gateways.isSuccess && gateways.data.code === '200' ? gateways.data.data : []}
                           gatewaysLoading={gateways.isLoading}
            />
            <Button type={'primary'} onClick={generateReport} loading={postReport.isLoading} style={{
              borderRadius: 5
            }}>
              {t('reports.actions.generateReport')}
            </Button>
          </Space>}
      />
      <Layout style={{height: '100%'}}>
        {!postReport.data?.data.length && <NoReports />}
        {Boolean(postReport.data?.data.length) &&
          <Report
            data={report}
            loading={postReport.isLoading}
            oneGateway={filteredBy.current.oneGateway}
            oneProject={filteredBy.current.oneProject}
          />
        }
      </Layout>
    </Fragment>
  )
}

export default ReportsLayout