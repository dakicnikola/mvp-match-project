import {Card, PageHeader} from 'antd'
import type {Moment} from 'moment'
import {Fragment, useState} from 'react'
import {useTranslation} from 'react-i18next'

import Accordion from '../../components/Accordion'
import type {TPostReportFilter} from '../../services/api/report'
import ReportFilters from './ReportFilters'


export type TFilter = Omit<Omit<TPostReportFilter, 'from'>, 'to'> & {
  from?: Moment
  to?: Moment
}

const Reports = () => {
  const {t} = useTranslation()


  const [filter, setFilter] = useState<TFilter>({})


  return (
    <Fragment>
      <PageHeader
        title={t('reports.title')}
        subTitle={t('reports.subtitle')}
        ghost={true}
        extra={<ReportFilters filter={filter} setFilter={setFilter} />}
      />
      <Card bordered={false}
            style={{
              borderRadius: 10,
              background: '#F1FAFE',
            }}
      >
        <Accordion data={[]} />
      </Card>
    </Fragment>
  )
}

export default Reports