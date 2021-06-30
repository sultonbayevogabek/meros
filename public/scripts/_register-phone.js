import {selectOne} from './_functions'
import validateForm from './_validate-forms'
import timer from './_timer'
import maskPhoneInput from './_mask-input'
import registerCode from './_register-code'

export default function registerPhone() {
   try {
      function phoneRegisterFormSubmit() {
         let phoneRegister = selectOne('#phone_register'),
            phoneRegisterForm = phoneRegister.querySelector('#phone_register_form'),
            phoneRegisterSubmit = phoneRegisterForm.querySelector('.button-blue'),
            phoneRegisterInput = phoneRegisterForm.querySelector('input[type="tel"]')
         phoneRegisterForm.addEventListener('submit', async e => {
            e.preventDefault()

            phoneRegisterSubmit.setAttribute('data-loading', 'true')
            phoneRegisterSubmit.setAttribute('disabled', 'true')

            let response = await fetch('/signup/register_phone', {
               headers: {
                  'Content-Type': 'application/json; charset="utf-8"'
               },
               method: 'POST',
               body: JSON.stringify({
                  phone: phoneRegisterInput.value.replace(/ /g, '').substring(1)
               })
            })

            response = await response.json()

            console.log(response)

            if (response.ok) {
               phoneRegister.innerHTML = `
                  <h2>Регистрация</h2>
                  <form class="auth__form" id="phone_code_register_form">
                     <label class="auth-label">
                         <span>Телефон</span>
                         <input class="input valid" type="tel" id="user_phone" name="user_phone" value="+${response.phone}" readonly>
                     </label>
                     <label class="auth-checkbox">
                         <span>Введите номер телефона чтобы получить код активации</span>
                     </label>
                     <label class="auth-label">
                         <span>Код</span>
                         <input class="input" type="text" id="verification_code" name="verification_code" minlength="5" maxlength="5"
                                placeholder="Введите код активации" data-code="true">
                     </label>
                     <label class="auth-checkbox reset-password-deadline">
                         <span>Отправить код еще раз </span><time>02:00</time>
                     </label>
                     <button class="button-blue" type="submit" disabled>
                        Продолжить
                        <img class="loading-spinner" src="/images/icons/spinner.svg" alt="">
                     </button>
                  </form>
            `
               timer('.reset-password-deadline time', 120)
               validateForm()
               registerCode()
            }

            if (!response.ok) {
               let message = response.message,
                  errorMessage = ''

               switch (message) {
                  case 'Error: invalid phone':
                     errorMessage = 'Номер телефона неверный'
                     break
                  case 'Error: number already exists':
                     errorMessage = 'Этот номер был ранее зарегистрирован. Пожалуйста, войдите'
                     break
               }

               phoneRegister.innerHTML = `
                     <h2>Регистрация</h2>
                     <form class="auth__form" id="phone_register_form">
                        <div class="alert">
                           <p>${errorMessage}</p>
                        </div>
                        <label class="auth-label">
                           <span>Телефон</span>
                           <input class="input" type="tel" id="user_phone" name="user_phone">
                        </label>
                        <label class="auth-checkbox">
                           <span>Введите номер телефона чтобы получить код активации</span>
                        </label>
                        <button class="button-blue" type="submit" disabled>
                           Получить код активации
                           <img class="loading-spinner" src="/images/icons/spinner.svg" alt="">
                        </button>
                     </form>
                  `
               validateForm()
               phoneRegisterFormSubmit()
               maskPhoneInput()
            }
         })
      }

      phoneRegisterFormSubmit()
   } catch (e) {
   }
}