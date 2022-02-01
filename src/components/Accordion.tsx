import React from 'react'
import {Collapse, Table} from 'antd'
import {useTranslation} from 'react-i18next'

const Accordion = () => {
  // const {t} = useTranslation()
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
          key={panel.projectId}
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


const data = [
  {
    'projectId': 'bgYhx',
    'userIds': [
      'rahej',
    ],
    'rule': 'Manual Selection',
    'gatewayIds': [
      'gDJ2s',
    ],
    'structure': 'Sole proprietorship',
    'industry': 'IT',
    'website': 'https://mvpmatch.co/',
    'description': 'Sit amet luctus venenatis lectus magna fringilla urna porttitor.',
    'image': 'https://mvpmatch.co/images/logo.svg',
    'name': 'Project 1',
  },
  {
    'projectId': 'ERdPQ',
    'userIds': [
      'rahej',
    ],
    'rule': 'Manual Selection',
    'gatewayIds': [
      'WU50G',
    ],
    'structure': 'Partnership',
    'industry': 'IT',
    'website': 'https://mvpmatch.co/',
    'description': 'Sit amet luctus venenatis lectus magna fringilla urna porttitor.',
    'image': 'https://mvpmatch.co/images/logo.svg',
    'name': 'Project 2',
  },
]


export default Accordion