import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect, beforeAll } from 'vitest'
import App from 'src/App'
import path from 'src/constants/path'

describe('Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  beforeAll(async () => {
    render(
      <MemoryRouter initialEntries={[path.login]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Email')).toBeTruthy()
      // expect(screen.getByPlaceholderText('Password')).toBeTruthy()
    })
  })
  test('Hien thi loi required khi khong nhap gi', async () => {
    fireEvent.submit(submitButton = screen.getByRole('button', { name: /Đăng Nhập/i }))

    await waitFor(async () => {
      expect(screen.queryByText('Email là bắt buộc')).toBeTruthy()
      expect(screen.queryByText('Mật khẩu là bắt buộc')).toBeTruthy()
    })
  })
  test('Hien thi loi khi nhap sai rules duoc quy dinh', async () => {
    emailInput = screen.getByPlaceholderText('Email')
    passwordInput = screen.getByPlaceholderText('Password')
    submitButton = screen.getByRole('button', { name: /Đăng Nhập/i })

    fireEvent.change(emailInput, {
      target: {
        value: 'test@'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy()
      expect(screen.queryByText('Độ dài mật khẩu phải từ 5 - 160 ký tự')).toBeTruthy()
    })

  })

  test('Khong hien thi loi khi nhap dung input', async () => {
    emailInput = screen.getByPlaceholderText('Email')
    passwordInput = screen.getByPlaceholderText('Password')
    submitButton = screen.getByRole('button', { name: /Đăng Nhập/i })
    fireEvent.change(emailInput, {
      target: {
        value: 'qbui@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '456789'
      }
    })

    // khi check tim khong ra thi nen dung query hon la find hoac get
    // khi dung query thi nen cho vao waitFor
    await waitFor(() => {
      expect(screen.queryByText('Email không hợp lệ')).toBeNull()
      expect(screen.queryByText('Mật khẩu phải lớn hơn 6 ký tự')).toBeNull()
    })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ')
    })
  })
})
