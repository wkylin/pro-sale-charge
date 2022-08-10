import React from 'react'
import SaleCharge from './components/saleCharge'
const App = () => {
  return (
    <>
      <SaleCharge
        disabledPurchaseGap
        wrapperCol={{ span: 15, offset: 5 }}
        saleCharge={{ saleschargetype: 2, salechargerate: 1 }}
        purchaseGapTips="禁用状态"
        saleChargeExtra="供应商承担比例显示提示文案"
      />
      <SaleCharge
        isDisabled
        forceZero={false}
        wrapperCol={{ span: 15, offset: 5 }}
        saleCharge={{ saleschargetype: 2, salechargerate: 1 }}
        chargeTypeExtra="商品按照分类、品牌、供应商维度调价时，促销扣款只能是售价差，否则不会生效"
        saleChargeExtra="输入0-1小数（不含0），批量导入商品没有配置促销扣款时，会取该配置项"
      />
    </>
  )
}

export default App
