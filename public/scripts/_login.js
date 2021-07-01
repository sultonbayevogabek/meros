import { selectOne, fetchFunction } from './_functions'
import validateForm from './_validate-forms'

export default async function () {
   try {
      const loginCard = selectOne('#login-card'),
         loginPhoneForm = selectOne('#login-phone-form'),
         loginPhoneInput = loginPhoneForm.querySelector('#phone'),
         loginPhoneSubmit = loginPhoneForm.querySelector('.button-blue')

      loginPhoneForm.addEventListener('submit', async e => {
         e.preventDefault()

         loginPhoneSubmit.setAttribute('data-loading', true)
         loginPhoneSubmit.setAttribute('disabled', true)

         let response = await fetchFunction('/users/login', 'POST', {
            phone: loginPhoneInput.value.substring(1).replace(/ /g, '')
         })

         console.log(response)

         if (response.ok) {
            loginCard.innerHTML = `
                 <h2>Авторизация</h2>
                 <form class="auth__form" id="login-code-form">
                     <label class="auth-label">
                         <span>Код</span>
                         <input class="input" type="text" id="code" name="code" minlength="5" maxlength="5" data-code="true" placeholder="Введите смс код">
                     </label>
                     <button class="button-blue" type="submit" disabled>
                         Войти
                         <img class="loading-spinner" src="/images/icons/spinner.svg" alt="loading spinner">
                     </button>
                     <a class="button-outline" href="/users/signup">Зарегистрироваться</a>
                 </form>
            `
            validateForm()
            sendCode(response.codeValidationId)
         }

         if (!response.ok) {
            loginPhoneSubmit.removeAttribute('data-loading')
            loginPhoneSubmit.setAttribute('disabled', true)

            let errorMessage

            switch (response.message) {
               case 'Error: invalid phone':
                  errorMessage = 'Введен неправильный номер'
                  break
               case 'Error: User is not registered':
                  errorMessage = 'Вы раньше не регистрировались. Пожалуйста, зарегистрируйтесь'
                  break
            }

            if (!loginPhoneForm.firstElementChild.classList.contains('alert-danger')) {
               let alertDanger = document.createElement('div')
               alertDanger.classList.add('alert-danger')
               alertDanger.textContent = errorMessage
               loginPhoneForm.prepend(alertDanger)
            } else {
               loginPhoneForm.firstElementChild.textContent = errorMessage
            }
         }
      })

      function sendCode(codeValidationId) {
         const loginCodeForm = selectOne('#login-code-form'),
            loginCodeInput = loginCodeForm.querySelector('#code'),
            loginCodeSubmit = loginCodeForm.querySelector('.button-blue')

         loginCodeForm.addEventListener('submit', async e => {
            e.preventDefault()

            loginCodeSubmit.setAttribute('data-loading', true)
            loginCodeSubmit.setAttribute('disabled', true)

            let response = await fetch('/users/validate-code', {
               headers: {
                  'Content-Type': 'application/json; charset=utf-8',
                  'code-validation-id': codeValidationId
               },
               method: 'POST',
               body: JSON.stringify({
                  code: loginCodeInput.value
               })
            })

            response = await response.json()

            console.log(response)

            if (!response.ok) {
               loginCodeSubmit.removeAttribute('data-loading')
               loginCodeSubmit.setAttribute('disabled', true)

               let errorMessage

               switch (response.message) {
                  case 'Error: invalid code':
                  case 'Error: Validation code is incorrect':
                     errorMessage = 'Код неверный'
                     break
               }

               if (!loginCodeForm.firstElementChild.classList.contains('alert-danger')) {
                  let alertDanger = document.createElement('div')
                  alertDanger.classList.add('alert-danger')
                  alertDanger.textContent = errorMessage
                  loginCodeForm.prepend(alertDanger)
               } else {
                  loginCodeForm.firstElementChild.textContent = errorMessage
               }
            }
         })
      }
   } catch (e) {

   }
}