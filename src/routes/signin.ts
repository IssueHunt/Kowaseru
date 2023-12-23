import { prismy, redirect } from 'prismy'
import render from '../render'

export const signInPageHandler = prismy([], () => {
  return render('signin', { title: 'Sign In' })
})

export const signInHandler = prismy([], () => {
  // TODO: Sign in handling
  return redirect('/')
})
