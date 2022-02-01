import React from 'react'
import {Collapse, Table} from 'antd'
import {useTranslation} from 'react-i18next'

type TAccordionProps = {
  data: TPanel[]
}

type TPanel = {
  name: string,
  id: string,
  tableRows: TRow[]
}

type TRow = {
  date: string | number
  transactionId: string
  amount: string
}

const Accordion = ({data}: TAccordionProps) => {
  const {t} = useTranslation('translation', {keyPrefix: 'reports.accordion'})

  const columns = [
    {
      title: t('table.columns.date'),
      dataIndex: 'date',
      key: 'date',
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
    },
  ]

  return (
    <Collapse accordion>
      {data.map((panel) => (
        <Collapse.Panel
          header={panel.name}
          key={panel.id}
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
          }}
          showArrow={false}
        >
          <Table columns={columns} dataSource={data} pagination={false} />
        </Collapse.Panel>
      ))}
    </Collapse>
  )
}

export default Accordion