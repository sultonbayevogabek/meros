import {selectOne} from './_functions'
import validateForm from './_validate-forms'
import timer from './_timer'
import maskPhoneInput from './_mask-input'
import registerPhone from './_register-phone'

export default function registerCode() {
   try {
      let phoneRegister = selectOne('#phone_register'),
         phoneCodeRegisterForm = phoneRegister.querySelector('#phone_code_register_form'),
         phoneCodeRegisterSubmit = phoneCodeRegisterForm.querySelector('.button-blue'),
         phoneCodeRegisterPhoneInput = phoneCodeRegisterForm.querySelector('#user_phone'),
         phoneCodeRegisterCodeInput = phoneCodeRegisterForm.querySelector('#verification_code')

      phoneCodeRegisterForm.addEventListener('submit', async e => {
         e.preventDefault()

         phoneCodeRegisterSubmit.setAttribute('data-loading', 'true')
         phoneCodeRegisterSubmit.setAttribute('disabled', 'true')

         let response = await fetch('/signup/register_code', {
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
               phone: phoneCodeRegisterPhoneInput.value.replace(/ /g, '').substring(1),
               code: phoneCodeRegisterCodeInput.value
            })
         })
         response = await response.json()

         if (response.ok) {
            window.location.href = '/signup/filling'
         }

         if (!response.ok) {
            const error = response.message

            console.log(error)

            if (error === 'Error: invalid phone' || error === 'Error: invalid code' || error === 'Error: session not found') {
               window.location.href = '/signup'
            }

            if (error === 'Error: code is invalid') {
               const alert = document.createElement('div')
               alert.classList.add('alert')
               alert.textContent = 'Код введен неверно'
               if (!phoneCodeRegisterForm.previousElementSibling.classList.contains('alert')) {
                  phoneRegister.insertBefore(alert, phoneCodeRegisterForm)
               }
               phoneCodeRegisterSubmit.removeAttribute('data-loading')
            }
         }

         maskPhoneInput()
      })
   } catch (e) {
   }
}