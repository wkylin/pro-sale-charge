# Pro Sale Charge

## 安装

   ```base
     npm install pro-sale-charge --location=global --save
   ```

## 引用

   ```base
     <SaleCharge
        isDisabled
        forceZero={false}
        wrapperCol={{ span: 15, offset: 5 }}
        saleCharge={{ saleschargetype: 2, salechargerate: 1 }}
        chargeTypeExtra="商品按照分类、品牌、供应商维度调价时，促销扣款只能是售价差，否则不会生效"
        saleChargeExtra="输入0-1小数（不含0），批量导入商品没有配置促销扣款时，会取该配置项"
      />
   ```

## 磨难

1. 经历37个版本，不断的查找资料，解决一个又一个问题，终于可以渲染页，一个小的里程碑。

## Todo

1. 文档完善及文档部署
