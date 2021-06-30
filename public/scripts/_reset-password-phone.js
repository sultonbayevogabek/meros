import {selectOne} from './_functions'
import validateForm from './_validate-forms'
import timer from './_timer'
import maskPhoneInput from './_mask-input'
import resetPasswordCode from './_reset-password-code'

export default function resetPasswordPhone() {
   try {
      function resetPasswordFormSubmit() {
         let resetPassword = selectOne('#reset-password'),
            resetPasswordForm = resetPassword.querySelector('#reset_password_phone'),
            resetPasswordSubmit = resetPasswordForm.querySelector('.button-blue'),
            resetPasswordInput = resetPasswordForm.querySelector('input[type="tel"]')
         resetPasswordForm.addEventListener('submit', async e => {
            e.preventDefault()

            resetPasswordSubmit.setAttribute('data-loading', 'true')
            resetPasswordSubmit.setAttribute('disabled', 'true')

            let response = await fetch('/reset-password/phone', {
               headers: {
                  'Content-Type': 'application/json; charset="utf-8"'
               },
               method: 'POST',
               body: JSON.stringify({
                  phone: resetPasswordInput.value.replace(/ /g, '').substring(1)
               })
            })

            response = await response.json()

            console.log(response)

            if (response.ok) {
               resetPassword.innerHTML = `
                  <h2>Восстановление пароля</h2>
                  <form class="auth__form" id="reset_password_code">
                     <label class="auth-label">
                         <span>Телефон</span>
                         <input class="input valid" type="tel" id="user_phone" name="phone" value="+${response.phone}" readonly>
                     </label>
                     <label class="auth-checkbox">
                         <span>Введите номер телефона чтобы получить код активации</span>
                     </label>
                     <label class="auth-label">
                         <span>Код</span>
                         <input class="input" type="text" id="verification_code" name="code" minlength="5" maxlength="5"
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
               resetPasswordCode()
            }

            if (!response.ok) {
               let message = response.message,
                  errorMessage

               switch (message) {
                  case 'Error: invalid phone':
                     errorMessage = 'Номер телефона неверный'
                     break;
                  case 'Error: Phone does not exist':
                     errorMessage = 'Такой номер телефона не зарегистрирован. Пожалуйста, сначала зарегистрируйтесь - <a href="/signup">Регистрация</a>'
               }

               resetPassword.innerHTML = `
                     <h2>Восстановление пароля</h2>
                     <form class="auth__form" id="reset_password_phone">
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
               resetPasswordFormSubmit()
               maskPhoneInput()
            }
         })
      }

      resetPasswordFormSubmit()
   } catch (e) {
   }
}