'use client'

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}
