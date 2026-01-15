'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`


  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: LOGIN_MUTATION,
          variables: {
            username,
            password,
          },
        }),
      })

      const json = await res.json()

      if (json.errors) {
        setError(json.errors[0].message)
      } else {
        const { token, user } = json.data.login
        console.log('Logged in:', user)

        // Example: store token
        localStorage.setItem('token', token)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff4ec] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#7a3e06] mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Log in to your account
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#7a3e06] mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-lg border border-[#ffd1ad] focus:outline-none focus:ring-2 focus:ring-[#fa9943]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#7a3e06] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-[#ffd1ad] focus:outline-none focus:ring-2 focus:ring-[#fa9943]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#fa9943] hover:bg-[#f9882c] text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <span className="text-[#fa9943] cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}
