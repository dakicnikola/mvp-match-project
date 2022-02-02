import React from 'react'
import {Space, Spin} from 'antd'

type TSpinnerProps = {
  spinning?: boolean
}

const Spinner = ({spinning = true}: TSpinnerProps) => (
  <Space
    direction='vertical'
    align='center'
    style={{
      zIndex: 100,
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Spin spinning={spinning} />
  </Space>
)


export default Spinner