import React, { useState, useEffect } from 'react'
import { Form, Radio, Tooltip, Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import SaleChargeRate from './saleChargeRate'

const SaleCharge = ({
  saleCharge,
  disabledPurchaseGap,
  purchaseGapTips,
  wrapperCol,
  saleChargeExtra,
  saleChargeForm,
  forceZero,
}) => {
  const [chargeType, setChargeType] = useState(forceZero ? 0 : saleCharge?.saleschargetype ?? 2)
  const [isShowInput, setIsShowInput] = useState(true)
  const [showInputValue, setShowInputValue] = useState(
    forceZero || saleCharge?.saleschargetype === 0
      ? 0
      : Math.trunc((saleCharge?.salechargerate * 100).toFixed(1)) ?? 100
  )
  const [inputNumberValue, setInputNumberValue] = useState(
    forceZero || saleCharge?.saleschargetype === 0 ? 0 : saleCharge?.salechargerate ?? 1
  )

  useEffect(() => {
    setChargeType(forceZero ? 0 : saleCharge?.saleschargetype ?? 2)
    setShowInputValue(
      forceZero || saleCharge?.saleschargetype === 0
        ? 0
        : Math.trunc((saleCharge?.salechargerate * 100).toFixed(1)) ?? 100
    )
    setInputNumberValue(forceZero || saleCharge?.saleschargetype === 0 ? 0 : saleCharge?.salechargerate ?? 1)
  }, [saleCharge, forceZero])

  const onGroupChange = (event) => {
    const value = event.target.value
    setShowInputValue(value === 0 ? 0 : 100)
    setInputNumberValue(value === 0 ? 0 : 1)
    saleChargeForm?.setFieldsValue({
      saleChargeRate: value === 0 ? 0 : 1,
      salesChargeType: value
    })
    setIsShowInput(true)
    setChargeType(value)
  }

  const onInputChange = (event) => {
    const value = event.target.value
    setShowInputValue(value)
  }
  const onInputFocus = () => {
    setIsShowInput(false)
  }

  const onInputBlur = () => {
    setInputNumberValue(inputNumberValue)
    setShowInputValue(showInputValue)
    setIsShowInput(true)
  }

  const onInputNumberChange = (value) => {
    setShowInputValue(value * 100)
    setInputNumberValue(value)
  }

  const onStepChange = (value) => {
    setShowInputValue(value * 100)
    setInputNumberValue(value)
  }

  const onInputNumberBlur = () => {
    setShowInputValue(showInputValue)
    setInputNumberValue(inputNumberValue)
    setIsShowInput(true)
  }
  return (
    <Form name="basic">
      <Form.Item
        name="salesChargeType"
        label="促销扣款"
        initialValue={chargeType}
        rules={[
          {
            required: true,
            message: '请选择促销扣款',
          },
        ]}
      >
        <Radio.Group onChange={onGroupChange}>
          <Radio value={0}>不参加</Radio>
          <Radio disabled={disabledPurchaseGap} value={1}>
            <Space>
              进价差
              {disabledPurchaseGap ? (
                <Tooltip title={purchaseGapTips}>
                  <QuestionCircleOutlined />
                </Tooltip>
              ) : null}
            </Space>
          </Radio>
          <Radio disabled={forceZero} value={2}>
            售价差
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="saleChargeRate"
        label=""
        labelCol={{ span: 0 }}
        wrapperCol={wrapperCol}
        initialValue={inputNumberValue}
        rules={[
          {
            required: false,
            message: '请输入供应商承担比例',
          },
        ]}
        extra={saleChargeExtra}
      >
        <SaleChargeRate
          isShowInput={isShowInput}
          showInputValue={showInputValue}
          inputNumberValue={inputNumberValue}
          onInputChange={onInputChange}
          onInputFocus={onInputFocus}
          onInputBlur={onInputBlur}
          onInputNumberChange={onInputNumberChange}
          onStepChange={onStepChange}
          onInputNumberBlur={onInputNumberBlur}
        />
      </Form.Item>
    </Form>
  )
}

export default SaleCharge
