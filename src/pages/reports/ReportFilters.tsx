import {Button, DatePicker, Space} from 'antd'
import type {Moment} from 'moment'
import moment from 'moment'
import type {Dispatch, SetStateAction} from 'react'
import {useTranslation} from 'react-i18next'

import SelectField from '../../components/SelectField'
import {useGetGateways} from '../../hooks/queries/gateways'
import {useGetProjects} from '../../hooks/queries/projects'
import {TFilter} from './Reports'

type TReportsFilterProps = {
  filter: TFilter,
  setFilter: Dispatch<SetStateAction<TFilter>>
}
const ReportFilters = ({filter, setFilter}: TReportsFilterProps) => {
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

  const projects = useGetProjects()
  const selectProjectOptions = projects.isSuccess && projects.data.code === '200' ? projects.data.data.map((project) => ({
    title: project.name,
    value: project.projectId,
  })) : []

  const gateways = useGetGateways()
  const selectGatewayOptions = gateways.isSuccess && gateways.data.code === '200' ? gateways.data.data.map((gateway) => ({
    title: gateway.name,
    value: gateway.gatewayId,
  })) : []


  return (
    <Space size='large'>
      <SelectField
        loading={projects.isLoading}
        placeholder={t('reports.actions.projects')}
        options={selectProjectOptions}
        value={filter.projectId}
        onChange={handleSelectChange('projectId')}
      />
      <SelectField
        loading={gateways.isLoading}
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
      <Button type={'primary'}>
        {t('reports.actions.generateReport')}
      </Button>
    </Space>
  )
}

export default ReportFilters