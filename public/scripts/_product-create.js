import {selectAll, selectOne, clearText} from './_functions'
import {openModal, modalClosing} from './_modal'

export default function () {
   try {
      const productCreateForm = selectOne('#product-create-form'),
         productImagesWrapper = productCreateForm.querySelector('.product-images'),
         productImagesFileInput = productCreateForm.querySelector('#product-images-file-input'),
         productFeaturesWrapper = productCreateForm.querySelector('.product-features'),
         productFeatureAddBtn = productCreateForm.querySelector('#product-feature-add-btn'),
         productNameUzInput = productCreateForm.querySelector('#product-name-uz'),
         productNameRuInput = productCreateForm.querySelector('#product-name-ru'),
         productNameEnInput = productCreateForm.querySelector('#product-name-en'),
         productPriceInput = productCreateForm.querySelector('#product-price'),
         productPercentInput = productCreateForm.querySelector('#product-percent'),
         productCategorySelect = productCreateForm.querySelector('#product-category'),
         productBrandSelect = productCreateForm.querySelector('#product-brand'),
         productDescriptionUz = productCreateForm.querySelector('#product-description-uz'),
         productDescriptionRu = productCreateForm.querySelector('#product-description-ru'),
         productDescriptionEn = productCreateForm.querySelector('#product-description-en')

      productImagesFileInput.addEventListener('change', evt => {
         let files = evt.target.files;

         for (let i = 0, f; f = files[i]; i++) {

            if (!f.type.match('image.*')) {
               continue;
            }

            let reader = new FileReader();

            reader.onload = (function (theFile) {
               return function (e) {
                  productImagesWrapper.innerHTML += `
                     <div class="product-images__item">
                         <img src="${e.target.result}" alt="">
                         <div class="product-images__remove">
                             <i class="fa fa-trash"></i>
                         </div>
                     </div>
                  `

                  removeImageFromList()
               };
            })(f);

            reader.readAsDataURL(f);
         }
      })

      function removeImageFromList() {
         const removeImageElements = selectAll('.product-images__remove')

         removeImageElements.forEach((el, index) => {
            el.addEventListener('click', e => {

            })
         })
      }

      function addNewFeature() {
         let index = 0
         productFeatureAddBtn.addEventListener('click', e => {
            index++
            const optionRow = document.createElement('div')
            optionRow.classList.add('row', 'mb-3')
            optionRow.innerHTML += `
               <div class="col-md-3">
                 <p class="mb-1">Product feature - ${index}. (UZ)</p>
                 <input class="form-control mb-1" id="product-feature-name-uz-${index}" type="text" placeholder="Feature name" required minlength="3">
                 <input class="form-control mb-1" id="product-feature-value-uz-${index}" type="text" placeholder="Feature value" required minlength="3">
               </div>
               <div class="col-md-3">
                 <p class="mb-1">Product feature - ${index}. (RU)</p>
                 <input class="form-control mb-1" id="product-feature-name-ru-${index}" type="text" placeholder="Feature name" required minlength="3">
                 <input class="form-control mb-1" id="product-feature-value-ru-${index}" type="text" placeholder="Feature value" required minlength="3">
                </div>
               <div class="col-md-3">
                 <p class="mb-1">Product feature - ${index}. (EN)</p>
                 <input class="form-control mb-1" id="product-feature-name-en-${index}" type="text" placeholder="Feature name" required minlength="3">
                 <input class="form-control mb-1" id="product-feature-value-en-${index}" type="text" placeholder="Feature value" required minlength="3">
                </div>
                <div class="col-md-3 pt-4">
                   <button class="btn btn-danger w-100" data-remove-feature-row type="button">Remove</button>
                </div>
            `
            productFeaturesWrapper.append(optionRow)
            removeFeatureRow()
         })
      }

      addNewFeature()

      function removeFeatureRow() {
         const removeFeatureRowBtns = selectAll('[data-remove-feature-row]')
         removeFeatureRowBtns.forEach(el => {
            el.addEventListener('click', e => {
               e.currentTarget.parentElement.parentElement.remove()
            })
         })
      }

      function productCreateFormSubmit() {
         productCreateForm.addEventListener('submit', async e => {
            e.preventDefault()

            const formData = new FormData()

            let index = 0
            for (let file of productImagesFileInput.files) {
               index++
               formData.append(`photo_${index}`, file)
            }

            formData.append('uz_name', clearText(productNameUzInput.value))
            formData.append('ru_name', clearText(productNameRuInput.value))
            formData.append('en_name', clearText(productNameEnInput.value))

            formData.append('price', productPriceInput.value)
            formData.append('sale', productPercentInput.value)

            formData.append('uz_description', clearText(productDescriptionUz.value))
            formData.append('ru_description', clearText(productDescriptionRu.value))
            formData.append('en_description', clearText(productDescriptionEn.value))

            formData.append('category_id', productCategorySelect.value)
            formData.append('product_brand_id', productBrandSelect.value)

            formData.append('options', JSON.stringify([ {} ]))

            let response = await fetch('/admin/api/product', {
               method: 'POST',
               body: formData
            })
            response = await response.json()
            console.log(response)
         })
      }

      productCreateFormSubmit()
   } catch (e) {

   }
}