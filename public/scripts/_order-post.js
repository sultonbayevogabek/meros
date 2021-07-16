import {selectOne} from './_functions'

export default function () {
   try {
      const orderForm = selectOne('#order-form'),
         orderRegion = orderForm.querySelector('#order-region'),
         orderAddress = orderForm.querySelector('#order-address'),
         orderOwnerName = orderForm.querySelector('#order-owner-name'),
         orderOwnerPhone = orderForm.querySelector('#order-owner-phone'),
         orderOwnerComment = orderForm.querySelector('#order-owner-comment'),
         orderSubmitBtn = selectOne('#order-form-submit')

      console.log(
         orderForm,
         orderRegion,
         orderAddress,
         orderOwnerName,
         orderOwnerPhone,
         orderOwnerComment,
         orderSubmitBtn
      )

      orderForm.addEventListener('submit', async e => {
         e.preventDefault()

         const formData = new FormData()

         // formData.append('shipping_region', orderRegion.value)
         // formData.append('shipping_address', orderAddress.value)
         // formData.append('phone_number', orderOwnerPhone.value)
         // formData.append('full_name', orderOwnerName.value)
         // formData.append('is_shipped', 'false')
         // formData.append('is_payed', 'false')
         // formData.append('payment_method', 'card')
         // formData.append('description', orderOwnerComment.value)

         let response = await fetch('/order/bulk/', {
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
               shipping_region: orderRegion.value,
               shipping_address: orderAddress.value,
               phone_number: orderOwnerPhone.value,
               full_name: orderOwnerName.value,
               is_shipped: false,
               is_payed: false,
               payment_method: 'card',
               description: orderOwnerComment.value
            })
         })

         response = await response.json()

         if (response.result.link) {
            window.location.href = response.result.link
         }
      })
   } catch (e) {
      console.log(e)
   }
}