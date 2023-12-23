import { prismy, redirect } from 'prismy'
import render from '../render'

export const signUpPageHandler = prismy([], () => {
  return render('signup', { title: 'Sign Up' })
})

export const signUpHandler = prismy([], () => {
  // TODO: Sign in handling
  return redirect('/')
})
