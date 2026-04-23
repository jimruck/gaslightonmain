import { requireAdminSession } from '@/lib/auth/admin'
import { AdminShell } from '@/components/admin/AdminShell'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdminSession({ requireMfa: true })

  return <AdminShell>{children}</AdminShell>
}
