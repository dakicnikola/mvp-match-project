import {Space, Typography} from 'antd'
import Icon from '@ant-design/icons'

type TUserIconProps = {
  firstName?: string, lastName?: string
}
const UserIcon = ({firstName = '', lastName = ''}: TUserIconProps) => {
  const initials =
    `${firstName.substring(0, 1)}${lastName?.substring(0, 1)}`
  return (
    <Space>
      {Boolean(initials) &&
        <div style={{display: 'flex', position: 'relative'}}>
          <Icon component={BackgroundSquareSvg} />
          <Typography.Title level={3} style={{
            color: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}>
            {initials}
          </Typography.Title>
        </div>
      }
      <Typography.Link style={{fontWeight: 'bold'}}>
        {`${firstName} ${lastName}`}
      </Typography.Link>
    </Space>
  )
}

const BackgroundSquareSvg = () => (
  <svg width='43' height='43' viewBox='0 0 43 43' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='43' height='43' rx='5' fill='#F6CA65' />
  </svg>
)


export default UserIcon