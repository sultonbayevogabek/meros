'use strict'

import zoomEffect from './zoom-effect'
import cabinetDropdown from './_cabinet-dropdown'
import searchInput from './_search-input'
import catalogModal from './_catalog-modal'
import categoriesModal from './_categories-modal'
import selectElement from './_select-element'
import feedbackRating from './_feedback-rating'
import categoriesMenu from './_categories-menu'
import filterModal from './_filter-modal'
import validateForm from './_validate-forms'
import maskPhoneInput from './_mask-input'
import loader from './_loader'
import rangeSlider from './_range-slider'
import signup from './_signup'
import login from './_login'

document.addEventListener('DOMContentLoaded', () => {
   cabinetDropdown()
   catalogModal()
   categoriesModal()
   selectElement()
   searchInput()
   zoomEffect()
   feedbackRating()
   categoriesMenu()
   filterModal()
   validateForm()
   maskPhoneInput()
   loader()
   rangeSlider()
   signup()
   login()
})