interface LoginResponse {
  email: string;
  name: string;
  token: string;
}

/**
 * Mock login function - replace with real API endpoint
 * Currently uses hardcoded validation for demo purposes
 * 
 * TODO: Replace with real API call to backend auth endpoint
 * Example: POST /api/auth/login { email, password }
 */
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock validation: email must contain @, password must be 6+ chars
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Mock successful login response
  // In a real app, this would come from the backend
  return {
    email,
    name: email.split('@')[0], // Use part before @ as display name
    token: 'mock-jwt-token-' + Date.now(),
  };
}
