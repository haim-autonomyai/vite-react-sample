export interface LoginResponse {
  email: string
  token: string
}

// Mock list of valid emails for demonstration
const VALID_EMAILS = [
  'user@example.com',
  'test@example.com',
  'demo@example.com',
  'admin@example.com'
]

/**
 * Mock login API call
 * Validates email format and checks against mock database
 * Returns token if successful, throws error if validation fails
 */
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format')
  }

  // Validate email exists in mock database
  if (!VALID_EMAILS.includes(email)) {
    throw new Error('Email not found')
  }

  // Validate password (mock - just check it's not empty)
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }

  // Generate mock token
  const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  return {
    email,
    token
  }
}
