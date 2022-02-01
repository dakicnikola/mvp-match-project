import {DatePicker, Space} from 'antd'
import type {Moment} from 'moment'
import moment from 'moment'
import type {Dispatch, SetStateAction} from 'react'
import {useTranslation} from 'react-i18next'

import SelectField from '../../components/SelectField'
import {TFilter} from './Reports'
import {TProject} from '../../services/api/projects'
import {TGateway} from '../../services/api/gateways'

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

  const handleSelectChange = (fieldName: 'projectId' | 'gatewayId') => (value: string) => {
    setFilter(prevState => ({...prevState, [fieldName]: value}))
  }

  const handleDateChange = (fieldName: 'from' | 'to') => (value: Moment | null) => {
    setFilter(prevState => ({
      ...prevState,
      [fieldName]: fieldName === 'from' ? value?.startOf('day') : value?.endOf('day'),
    }))
  }

  const selectProjectOptions = projects.map((project) => ({title: project.name, value: project.projectId}))

  const selectGatewayOptions = gateways.map((gateway) => ({title: gateway.name, value: gateway.gatewayId}))


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
      />
      <DatePicker
        onChange={handleDateChange('to')}
        picker={'date'}
        value={filter.to}
        disabledDate={d => !d || (filter.from && d.isBefore(filter.from)) || d.isAfter(moment().endOf('day'))}
        placeholder={t('reports.actions.dateTo')}
      />
    </Space>
  )
}

export default ReportFilters