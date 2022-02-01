import {Fragment} from 'react'
import {useTranslation} from 'react-i18next'
import {Card, PageHeader, Space} from 'antd'

import Accordion from '../../components/Accordion'

const Reports = () => {
  const {t} = useTranslation()

  return (
    <Fragment>
      <PageHeader
        title={t('reports.title')}
        subTitle={t('reports.subtitle')}
        ghost={true}
        extra={
          <Space size='large'>
          </Space>
        }
      />
      <Card bordered={false}
            style={{
              borderRadius: 10,
              background: '#F1FAFE',
            }}>
        <Accordion />

      </Card>
    </Fragment>
  )
}

export default Reports