import { describe, expect, it } from 'vitest'
import { Http } from '../http'
import { HttpStatusCode } from 'axios'
import { beforeEach } from 'vitest'
import { setAccessTokenToLs, setRefreshTokenToLs } from '../auth'
import { access_token_1s, refresh_token_1000days } from 'src/msw/user.msw'
describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })

  //không nên đụng đến folder apis
  it('API call', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth Request', async () => {
    //nên có 1 cái account test và 1 sever test
    await http.post('login', {
      email: 'qbui@gmail.com',
      password: '456789'
    })
    const res = await http.get('user')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Refresh Token', async () => {
    setAccessTokenToLs(access_token_1s)
    setRefreshTokenToLs(refresh_token_1000days)
    const res = await http.get('user')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
