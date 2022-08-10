import React from 'react'
import { InputNumber, Space, Input } from 'antd'

const SaleChargeRate = ({
  onChange,
  isShowInput,
  showInputValue,
  inputNumberValue,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onInputNumberChange,
  onStepChange,
  onInputNumberBlur,
}) => {
  const onHandleInputChange = (event) => {
    onInputChange(event)
    onChange?.(event)
  }

  const onHandleNumberChange = (event) => {
    onInputNumberChange(event)
    onChange?.(event)
  }

  return (
    <>
      <Space>
        <span>供应商承担比例</span>
        {isShowInput ? (
          <Input
            style={{ width: 100 }}
            disabled={showInputValue === 0}
            value={showInputValue}
            addonAfter="%"
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onChange={onHandleInputChange}
          />
        ) : (
          <InputNumber
            max={1}
            min={0}
            step={0.01}
            style={{ width: 100 }}
            value={inputNumberValue}
            onChange={onHandleNumberChange}
            onStep={onStepChange}
            onBlur={onInputNumberBlur}
          />
        )}
      </Space>
    </>
  )
}

export default SaleChargeRate
