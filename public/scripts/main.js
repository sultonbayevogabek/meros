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
import adminBrand from './_admin-brand'
import makeAndRemoveAdmin from './_make-remove-admin'
import productBrandCreate from './_product-brand-create'
import productCreate from './_product-create'
import productActions from './_product-actions'
import addToCart from './_add-to-cart'
import orderPost from './_order-post'
import categoryIntroNav from './_category-intro-nav'

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
   adminBrand()
   makeAndRemoveAdmin()
   productBrandCreate()
   productCreate()
   productActions()
   addToCart()
   orderPost()
   categoryIntroNav()
})