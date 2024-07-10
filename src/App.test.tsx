import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

describe('App', () => {
  test('App render and navigate', async () => {
    render(<App />, { wrapper: BrowserRouter })
    const user = userEvent.setup()
    // Verify vào đúng trang chủ

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ')
    })

    // Verify chuyển sang login
    await user.click(screen.getByText(/Đăng nhập/i))

    await waitFor(() => {
      expect(screen.getByText('Bạn chưa có tài khoản?')).toBeTruthy()
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập')
    })
    // screen.debug(document.body.parentElement, 999999)
  })
  test('Not found page', async () => {
    const badRoute = '/not/found'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Trang không khả dụng/i)).toBeTruthy()
    })

    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
  test('Register page', async () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Bạn đã có tài khoản?')).toBeTruthy()
    })

    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})

