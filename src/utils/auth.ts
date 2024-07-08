import { User } from 'src/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLs = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLs = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLs = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLs = () => localStorage.getItem('access_token') || ''

export const getRefreshTokenFromLs = () => localStorage.getItem('refresh_token') || ''

export const getProfileFromLs = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLs = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
