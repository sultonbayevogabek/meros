import {selectOne, addClass, removeClass} from './_functions'

export default function searchInput() {
   try {
      const data = [
         'Erkaklar kiyimi', 'Erkaklar oyoq kiyimi', 'Erkaklar paypoqlari', 'Erkaklar uchun aksesuarlar', 'Erkaklar uchun ko`zoynaklar'
      ]

      const searchInput = selectOne('.search-form__input'),
         searchingResultList = selectOne('.searching-result__ul'),
         categoriesModalOpenBtn = selectOne('.category-btn')

      function searchingResultRender(arr) {
         if (arr.length === 0) {
            searchingResultList.innerHTML = ''
            searchInput.style.cssText = `
               border-bottom-left-radius: 5px;
            `
            return addClass(searchingResultList, 'd-none')
         }
         removeClass(searchingResultList, 'd-none')
         searchInput.style.cssText = `
            border-bottom-left-radius: 0;
         `
         searchingResultList.innerHTML = ''
         arr.forEach(item => {
            searchingResultList.innerHTML += `
               <li class="searching-result__li">
                  <a class="searching-result__link" href="#">
                      ${item}
                  </a>
               </li>
            `
         })
      }

      searchInput.addEventListener('input', e => {
         const searchingProductName = e.target.value.trim().toLowerCase()

         let filteredProductList = data.filter(productName => {
            return productName.toLowerCase().includes(searchingProductName) && searchingProductName.trim().length > 0
         })

         filteredProductList = filteredProductList.map(item => {
            const index = item.toLowerCase().indexOf(searchingProductName)
            return item.substring(0, index) + '<strong>' + item.substr(index, searchingProductName.length) + '</strong>' + item.substring(index + searchingProductName.length)
         })

         searchingResultRender(filteredProductList)
      })
   } catch (e) {
   }
}