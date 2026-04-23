import { AdminLoginForm } from '@/components/admin/AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <div
      className="min-h-screen bg-gray-dark flex items-center justify-center px-4 py-16"
      style={{ minHeight: '100vh', backgroundColor: '#171717' }}
    >
      <div
        className="w-full max-w-md bg-gray-medium border border-gray-500 rounded-xl p-6 md:p-8 shadow-xl"
        style={{ backgroundColor: '#262626', borderColor: '#707070' }}
      >
        <h1 className="text-3xl font-serif mb-2" style={{ color: '#CCBB98' }}>
          Admin Login
        </h1>
        <p className="text-sm mb-6" style={{ color: '#f2f2f2' }}>
          Access is limited to approved users. MFA is required before opening the CMS.
        </p>
        <AdminLoginForm />
      </div>
    </div>
  )
}
