import { useState } from 'react';
import SSOButton from '../SSOButton';

interface SSOProvidersProps {
  onSignIn?: (provider: 'google' | 'github' | 'microsoft') => void;
}

function SSOProviders(props: SSOProvidersProps) {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'github' | 'microsoft' | null>(null);

  const handleProviderClick = async (provider: 'google' | 'github' | 'microsoft') => {
    setLoadingProvider(provider);
    
    // Mock SSO request - simulating async call
    setTimeout(() => {
      console.log(`Signing in with ${provider}`);
      props.onSignIn?.(provider);
      setLoadingProvider(null);
    }, 1500);
  };

  return (
    <div className="sso-providers space-y-4">
      <div className="sso-providers__buttons space-y-3">
        <SSOButton
          provider="google"
          onClick={() => handleProviderClick('google')}
          isLoading={loadingProvider === 'google'}
        />
        <SSOButton
          provider="github"
          onClick={() => handleProviderClick('github')}
          isLoading={loadingProvider === 'github'}
        />
        <SSOButton
          provider="microsoft"
          onClick={() => handleProviderClick('microsoft')}
          isLoading={loadingProvider === 'microsoft'}
        />
      </div>

      <div className="sso-providers__divider flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-500 text-sm">Or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
    </div>
  );
}

export default SSOProviders;
