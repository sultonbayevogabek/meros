import {selectOne, selectAll} from './_functions'

export default function () {
   try {
      const addToCartBtns = selectAll('[data-add-cart]')

      addToCartBtns.forEach(el => {
         el.addEventListener('click', async e => {
            let response = await fetch('/cart/add', {
               headers: {
                  'Content-Type': 'application/json; charset=utf-8',
                  'authorization': document.cookie.substring(6)
               },
               method: 'POST',
               body: JSON.stringify({
                  product_id: e.currentTarget.id
               })
            })

            response = await response.json()

            console.log(response)
         })
      })
   } catch (e) {
   }
}