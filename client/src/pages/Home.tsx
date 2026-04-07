import { useAuth } from '@/_core/hooks/useAuth';
import { Redirect } from 'wouter';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/landing" />;
}
