import { describe, it, expect } from 'vitest'
import { clearLs, getAccessTokenFromLs, getRefreshTokenFromLs, setAccessTokenToLs, setRefreshTokenToLs } from '../auth'
import { beforeEach } from 'node:test'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODBkZmZjYmI2NTk3MDMzNjYxMWI1MCIsImVtYWlsIjoicWJ1aUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI0LTA3LTA5VDE0OjA0OjUxLjg0OFoiLCJpYXQiOjE3MjA1MzM4OTEsImV4cCI6MTcyMDUzMzkwMX0.k2SICNLc4TWzNR43mMuJSEjhCua3SZUwPyayzHtmLmY'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODBkZmZjYmI2NTk3MDMzNjYxMWI1MCIsImVtYWlsIjoicWJ1aUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI0LTA3LTA5VDEzOjE5OjQwLjQwNVoiLCJpYXQiOjE3MjA1MzExODAsImV4cCI6MTcyMDYxNzU4MH0.X42xpgWHzvquYn3qPtlg76ZizeSAETxUej9HLc8-_D0'

beforeEach(() => {
  localStorage.clear
})

describe('setAccessTokenToLs', () => {
  it('Access Token is set to LS', () => {
    setAccessTokenToLs(access_token)
    expect(getAccessTokenFromLs()).toBe(access_token)
  })
})

describe('setRefreshTokenToLs', () => {
  it('Refresh Token is set to LS', () => {
    setRefreshTokenToLs(refresh_token)
    expect(getRefreshTokenFromLs()).toEqual(refresh_token)
  })
})

describe('clearLs', () => {
  it('Clear access_token refresh_token profile', () => {
    setRefreshTokenToLs(refresh_token)
    setAccessTokenToLs(access_token)
    clearLs()
    expect(getRefreshTokenFromLs()).toBe('')
    expect(getAccessTokenFromLs()).toBe('')
  })
})
