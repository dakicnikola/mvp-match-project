import {DatePicker, Space} from 'antd'
import type {Moment} from 'moment'
import moment from 'moment'
import type {Dispatch, SetStateAction} from 'react'
import {useTranslation} from 'react-i18next'

import SelectField from '../../components/SelectField'
import {TFilter} from './ReportsLayout'
import {TProject} from '../../services/api/projects'
import {TGateway} from '../../services/api/gateways'
import Icon from '@ant-design/icons'

type TReportsFilterProps = {
  filter: TFilter,
  setFilter: Dispatch<SetStateAction<TFilter>>
  projects: TProject[]
  projectsLoading: boolean
  gateways: TGateway[]
  gatewaysLoading: boolean
}
const ReportFilters = ({
                         filter,
                         setFilter,
                         projects,
                         gateways,
                         projectsLoading,
                         gatewaysLoading,
                       }: TReportsFilterProps) => {
  const {t} = useTranslation()

  const handleSelectChange = (fieldName: 'projectId' | 'gatewayId') => (value: string | null) => {
    setFilter(prevState => ({...prevState, [fieldName]: value ?? undefined}))
  }

  const handleDateChange = (fieldName: 'from' | 'to') => (value: Moment | null) => {
    setFilter(prevState => ({
      ...prevState,
      [fieldName]: fieldName === 'from' ? value?.startOf('day') : value?.endOf('day'),
    }))
  }

  const selectProjectOptions =
    [
      {title: t('reports.allProjects'), value: null},
      ...projects.map((project) => ({title: project.name, value: project.projectId})),
    ]

  const selectGatewayOptions =
    [
      {title: t('reports.allGateways'), value: null},
      ...gateways.map((gateway) => ({title: gateway.name, value: gateway.gatewayId})),
    ]


  return (
    <Space size='large'>
      <SelectField
        loading={projectsLoading}
        placeholder={t('reports.actions.projects')}
        options={selectProjectOptions}
        value={filter.projectId}
        onChange={handleSelectChange('projectId')}
      />
      <SelectField
        loading={gatewaysLoading}
        placeholder={t('reports.actions.gateways')}
        options={selectGatewayOptions}
        value={filter.gatewayId}
        onChange={handleSelectChange('gatewayId')}
      />
      <DatePicker
        onChange={handleDateChange('from')}
        picker={'date'}
        value={filter.from}
        disabledDate={d => !d || d.isSameOrAfter(filter.to)}
        placeholder={t('reports.actions.dateFrom')}
        suffixIcon={<Icon component={FilledCalendarSvg} />}
      />
      <DatePicker
        onChange={handleDateChange('to')}
        picker={'date'}
        value={filter.to}
        disabledDate={d => !d || (filter.from && d.isBefore(filter.from)) || d.isAfter(moment().endOf('day'))}
        placeholder={t('reports.actions.dateTo')}
        suffixIcon={<Icon component={FilledCalendarSvg} />}
      />
    </Space>
  )
}

const FilledCalendarSvg = () => (
  <svg width='11' height='12' viewBox='0 0 11 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11 11.52C11 11.7855 10.8034 12 10.56 12H0.440001C0.196625 12 0 11.7855 0 11.52V5.22H11V11.52ZM0.440001 1.08H2.75V0.12C2.75 0.054 2.7995 0 2.86 0H3.63C3.6905 0 3.74 0.054 3.74 0.12V1.08H7.26V0.12C7.26 0.054 7.3095 0 7.37 0H8.14C8.2005 0 8.25 0.054 8.25 0.12V1.08H10.56C10.8034 1.08 11 1.2945 11 1.56V4.2H0V1.56C0 1.2945 0.196625 1.08 0.440001 1.08Z'
      fill='white' />
  </svg>
)

export default ReportFilters