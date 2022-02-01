import {Select} from 'antd'

type TSelectFieldProps = {
  options: TOption[],
  loading?: boolean,
  placeholder: string,
  onChange: (value: string, option: TOption | TOption[]) => void
  value?: string
}

type TOption = {
  title: string,
  value: string
}

const SelectField = ({value, options, loading, placeholder, onChange}: TSelectFieldProps) => {
  return (
    <Select
      placeholder={placeholder}
      onChange={onChange}
      loading={loading}
      value={value}
      allowClear
    >
      {options.map((option, index) => (
        <Select.Option key={`${option.value}-${index}`} value={option.value}>
          {option.title}
        </Select.Option>
      ))}
    </Select>
  )
}

export default SelectField