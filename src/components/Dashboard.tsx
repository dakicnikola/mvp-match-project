import Icon from '@ant-design/icons'
import {ReactElement, useState} from 'react'
import {Layout, Menu, Space} from 'antd'
import {useTranslation} from 'react-i18next'
import {Link, Outlet, useLocation} from 'react-router-dom'

import {
  pathname_board,
  pathname_payment,
  pathname_reports,
  pathname_settings,
  pathname_transaction,
} from '../config/routes'

import CardSvg from './logos/CardSvg'
import BoardSvg from './logos/BoardSvg'
import TransactionSvg from './logos/TransactionSvg'
import ReportsSvg from './logos/ReportsSvg'
import SettingsSvg from './logos/SettingsSvg'
import CompanyLogoSvg from './logos/CompanyLogoSvg'
import MenuFoldSvg from './logos/MenuFoldSvg'


type MenuLink = {
  path: string
  icon: ReactElement | any
  i18n: string
  disabled: boolean
}


const menuLinks: MenuLink[] = [
  {
    path: pathname_payment,
    icon: <Icon component={CardSvg} />,
    i18n: 'dashboard.nav.payment',
    disabled: true,
  },
  {
    path: pathname_board,
    icon: <Icon component={BoardSvg} />,
    i18n: 'dashboard.nav.board',
    disabled: true,
  },
  {
    path: pathname_transaction,
    icon: <Icon component={TransactionSvg} />,
    i18n: 'dashboard.nav.transaction',
    disabled: true,
  },
  {
    path: pathname_reports,
    icon: <Icon component={ReportsSvg} />,
    i18n: 'dashboard.nav.reports',
    disabled: false,
  },
  {
    path: pathname_settings,
    icon: <Icon component={SettingsSvg} />,
    i18n: 'dashboard.nav.settings',
    disabled: true,
  },
]

function Dashboard() {
  const [collapsed, setCollapsed] = useState(true)

  const location = useLocation()
  const {t} = useTranslation()

  const toggle = () => setCollapsed(prevState => !prevState)

  const selectedKeys = menuLinks.find(menuLink =>
    location.pathname.startsWith(menuLink.path),
  )


  return (
    <Layout id='pms-dashboard'>
      <Layout.Header className='site-layout-background' style={{zIndex: 1, width: '100%', display: 'flex'}}>
        <Space className='logo' style={{height: '100%'}} align={'center'}>
          <Icon component={CompanyLogoSvg} />
        </Space>
        <Space>
          <Icon component={MenuFoldSvg} style={{display: 'flex'}} onClick={toggle} />
        </Space>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>

        </div>
      </Layout.Header>
      <Layout className={collapsed ? 'site-layout site-layout-collapsed' : 'site-layout'}>
        <Layout.Sider
          theme='light'
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={100}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <Menu
            theme='light'
            mode='inline'
            defaultSelectedKeys={[pathname_reports]}
            selectedKeys={[selectedKeys?.path ?? '']}
          >
            {menuLinks.map(link => (
              <Menu.Item key={link.path} icon={link.icon}
                         disabled={link.disabled}
                         style={{
                           paddingLeft: 35,
                           paddingRight: 35,
                         }}>
                <Link
                  to={link.path}
                >
                  {t(link.i18n)}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout.Content style={{minHeight: 'calc(100vh - 64px)'}}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
