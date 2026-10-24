
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../services/apiClient';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      if (!apiClient.getToken()) {
        router.replace('/login');
        return;
      }

      try {
        const user = await apiClient.getMe();

        if (!user) {
          apiClient.clearToken();
          router.replace('/login');
          return;
        }

        if (active) setAuthorized(true);
      } catch {
        apiClient.clearToken();
        router.replace('/login');
      }
    }

    void checkAuth();

    return () => {
      active = false;
    };
  }, [router]);

  if (!authorized) return null;

  return <>{children}</>;
}
