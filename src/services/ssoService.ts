interface SSOResponse {
  success: boolean;
  provider: 'google' | 'github' | 'microsoft';
  user?: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  error?: string;
}

interface SSOError extends Error {
  code: string;
}

/**
 * Mock SSO service for handling single sign-on authentication
 * In a real application, this would make actual API calls to your backend
 */
const ssoService = {
  /**
   * Authenticate with Google
   * @returns Promise with authentication response
   */
  signInWithGoogle: async (): Promise<SSOResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful Google authentication
        resolve({
          success: true,
          provider: 'google',
          user: {
            id: 'google_123456',
            email: 'user@gmail.com',
            name: 'Google User',
            avatar: 'https://lh3.googleusercontent.com/a/default-user-avatar',
          },
        });
      }, 1000);
    });
  },

  /**
   * Authenticate with GitHub
   * @returns Promise with authentication response
   */
  signInWithGitHub: async (): Promise<SSOResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful GitHub authentication
        resolve({
          success: true,
          provider: 'github',
          user: {
            id: 'github_789012',
            email: 'user@github.com',
            name: 'GitHub Developer',
            avatar: 'https://avatars.githubusercontent.com/u/0?v=4',
          },
        });
      }, 1000);
    });
  },

  /**
   * Authenticate with Microsoft
   * @returns Promise with authentication response
   */
  signInWithMicrosoft: async (): Promise<SSOResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful Microsoft authentication
        resolve({
          success: true,
          provider: 'microsoft',
          user: {
            id: 'microsoft_345678',
            email: 'user@outlook.com',
            name: 'Microsoft User',
            avatar: 'https://www.microsoft.com/favicon.ico',
          },
        });
      }, 1000);
    });
  },

  /**
   * Generic sign-in method that routes to the appropriate provider
   * @param provider The SSO provider to authenticate with
   * @returns Promise with authentication response
   */
  signIn: async (provider: 'google' | 'github' | 'microsoft'): Promise<SSOResponse> => {
    switch (provider) {
      case 'google':
        return ssoService.signInWithGoogle();
      case 'github':
        return ssoService.signInWithGitHub();
      case 'microsoft':
        return ssoService.signInWithMicrosoft();
      default:
        return Promise.reject({
          code: 'INVALID_PROVIDER',
          message: 'Invalid SSO provider',
        } as SSOError);
    }
  },
};

export default ssoService;
export type { SSOResponse, SSOError };
