import { DynamicFormArrayModel, DynamicFormGroupModel, DynamicInputModel, } from '@ng-dynamic-forms/core';


export const OrderForm = [


  new DynamicFormGroupModel({

    id: 'retailer', legend: 'Retailer', group: [ new DynamicInputModel({
      id: 'businessName', label: 'Business Name'
    }),                                          new DynamicInputModel({
      id: 'rid', label: 'Retailer ID'
    }),                                          new DynamicInputModel({
      id: 'total', inputType: 'number', placeholder: 'OrderTotal', hint: ''
    }) ],
  }), new DynamicFormArrayModel({
    id: 'products', initialCount: 2, groupFactory: () => {
      return [ new DynamicInputModel({
        id: 'id', label: 'Product ID'
      }),      new DynamicInputModel({
        id: 'name', label: 'Product Name'
      }),      new DynamicInputModel({
        id: 'producer', label: 'Producer Name'
      }),      new DynamicInputModel({
        id: 'pid', label: 'Producer ID'
      }),      new DynamicInputModel({
        id: 'price', label: 'Carton Price'
      }),      new DynamicInputModel({
        id: 'qty', label: 'Quantity'
      }),      new DynamicInputModel({
        id: 'subtotal', label: 'Subtotal'
      }) ];
    }
  }) ];
