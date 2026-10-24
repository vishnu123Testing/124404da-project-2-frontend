'use client';

import { usePathname } from 'next/navigation';
import ProtectedRoute from './ProtectedRoute';

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const publicPages = ['/login', '/register'];

  if (publicPages.includes(pathname)) {
    return <>{children}</>;
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
}