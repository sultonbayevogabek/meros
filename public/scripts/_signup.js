import { selectOne } from './_functions'

export default async function () {
   try {
      const signupForm = selectOne('#signup-form'),
         signupPhoneInput = signupForm.querySelector('#phone'),
         signupNameInput = signupForm.querySelector('#name'),
         signupEmailInput = signupForm.querySelector('#email')

      signupForm.addEventListener('submit', async e => {
         e.preventDefault()

         let response = await fetch('/users/signup', {
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
               name: signupNameInput.value.trim(),
               email: signupEmailInput.value.trim().toLowerCase(),
               phone: signupPhoneInput.value.substring(1).replace(/ /g, '')
            })
         })
         response = await response.json()
         console.log(response)
      })
   } catch (e) {

   }

}