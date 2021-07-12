'use strict'

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
import maskCard from './_mask-card'
import adminCategory from './_admin-category'
import categoryPagination from './_category-pagination'
import adminBrand from './_admin-brand'
import brandPagination from './_brand-pagination'

document.addEventListener('DOMContentLoaded', () => {
   cabinetDropdown()
   catalogModal()
   categoriesModal()
   selectElement()
   searchInput()
   feedbackRating()
   categoriesMenu()
   filterModal()
   validateForm()
   maskPhoneInput()
   loader()
   rangeSlider()
   signup()
   login()
   maskCard()
   adminCategory()
   categoryPagination()
   adminBrand()
   brandPagination()
})