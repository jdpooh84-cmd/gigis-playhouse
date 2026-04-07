import { useStore } from '@/lib/store';
import { Redirect } from 'wouter';

export default function Home() {
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/landing" />;
}
