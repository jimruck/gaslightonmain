import { AdminMfaForm } from '@/components/admin/AdminMfaForm'

export default function AdminMfaPage() {
  return (
    <div
      className="min-h-screen bg-gray-dark flex items-center justify-center px-4 py-16"
      style={{ minHeight: '100vh', backgroundColor: '#171717' }}
    >
      <div
        className="w-full max-w-lg bg-gray-medium border border-gray-500 rounded-xl p-6 md:p-8 shadow-xl"
        style={{ backgroundColor: '#262626', borderColor: '#707070' }}
      >
        <h1 className="text-3xl font-serif mb-2" style={{ color: '#CCBB98' }}>
          Multi-Factor Authentication
        </h1>
        <p className="text-sm mb-6" style={{ color: '#f2f2f2' }}>
          Complete MFA to access the CMS. First-time users can enroll an authenticator app here.
        </p>
        <AdminMfaForm />
      </div>
    </div>
  )
}
