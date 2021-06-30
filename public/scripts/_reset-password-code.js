import { selectOne } from './_functions'
import validateForm from './_validate-forms'
import timer from './_timer'
import maskPhoneInput from './_mask-input'

export default function resetPasswordCode() {
   try {
      let resetPassword = selectOne('#reset-password'),
         resetPasswordForm = resetPassword.querySelector('#reset_password_code'),
         resetPasswordSubmit = resetPasswordForm.querySelector('.button-blue'),
         resetPasswordPhoneInput = resetPasswordForm.querySelector('input[type="tel"]'),
         resetPasswordCodeInput = resetPasswordForm.querySelector('#verification_code')

      resetPasswordForm.addEventListener('submit', async e => {
         e.preventDefault()

         resetPasswordSubmit.setAttribute('data-loading', 'true')
         resetPasswordSubmit.setAttribute('disabled', 'true')

         let response = await fetch('/reset-password/code', {
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
               phone: resetPasswordPhoneInput.value.replace(/ /g, '').substring(1),
               code: resetPasswordCodeInput.value
            })
         })

         response = await response.json()

         if (response.ok) {
            window.location.href = '/reset-password/new'
         }

         if (!response.ok) {
            const error = response.message

            if (error === 'Error: invalid phone' || error === 'Error: invalid code' || error === 'Error: session not found') {
               window.location.href = '/reset-password'
            }

            if (error === 'invalid code') {
               const alert = document.createElement('div')
               alert.classList.add('alert')
               alert.textContent = 'Код введен неверно'
               if (!resetPasswordForm.previousElementSibling.classList.contains('alert')) {
                  resetPassword.insertBefore(alert, resetPasswordForm)
               }
               resetPasswordSubmit.removeAttribute('data-loading')
            }
         }

         maskPhoneInput()
      })
   } catch (e) {
   }
}