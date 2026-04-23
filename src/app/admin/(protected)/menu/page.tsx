import { MenuCmsTable } from '@/components/admin/MenuCmsTable'

export default function AdminMenuPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-serif" style={{ color: '#CCBB98' }}>
          Menu
        </h1>
        <p className="text-sm" style={{ color: '#f2f2f2' }}>
          Update dishes, pricing, and which meals each item appears under.
        </p>
      </div>
      <MenuCmsTable />
    </div>
  )
}
