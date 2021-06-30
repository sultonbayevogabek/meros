import { selectOne } from './_functions'

export default function resetPassword() {
   try {
      const resetPasswordForm = selectOne('.reset-password-form'),
         resetPasswordAlert = resetPasswordForm.querySelector('.alert'),
         resetPasswordInputs = resetPasswordForm.querySelectorAll('input'),
         resetPasswordNewInput = selectOne('#new_password'),
         resetPasswordRepeatInput = selectOne('#new_password_repeat'),
         resetPasswordSubmit = resetPasswordForm.querySelector('.button-blue')

      resetPasswordInputs.forEach(input => {
         input.addEventListener('input', () => {
            if (!resetPasswordNewInput.classList.contains('valid') || !resetPasswordRepeatInput.classList.contains('valid') ||
               resetPasswordNewInput.value !== resetPasswordRepeatInput.value
            ) {
               resetPasswordSubmit.disabled = true
            } else {
               resetPasswordSubmit.disabled = false
            }
         })
      })

      resetPasswordForm.addEventListener('submit', async e => {
         e.preventDefault()

         resetPasswordSubmit.setAttribute('data-loading', 'true')
         resetPasswordSubmit.setAttribute('disabled', 'true')

         let response = await fetch('/reset-password/new', {
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
               password: resetPasswordNewInput.value,
               repeatedPassword: resetPasswordRepeatInput.value
            })
         })

         response = await response.json()

         if (response.ok) {
            window.location.href = '/'
         }

         if (!response.ok) {
            let message = response.message,
               errorMessage

            if (message === 'ValidationError: "repeatedPassword" must be [ref:password]') {
               errorMessage = 'Пароли должны быть одинаковыми'
            }

            if (message === 'Error: invalid password') {
               errorMessage = 'Введен неверный пароль'
            }

            resetPasswordAlert.textContent = errorMessage
            resetPasswordAlert.classList.remove('d-none')
            resetPasswordSubmit.removeAttribute('data-loading')
         }
      })
   } catch (e) {

   }
}