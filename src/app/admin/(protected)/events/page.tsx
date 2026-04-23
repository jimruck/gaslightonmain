import { EventsCmsTable } from '@/components/admin/EventsCmsTable'

export default function AdminEventsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-serif" style={{ color: '#CCBB98' }}>
          Events
        </h1>
        <p className="text-sm" style={{ color: '#f2f2f2' }}>
          Update event details, guests, pricing, and photos.
        </p>
      </div>
      <EventsCmsTable />
    </div>
  )
}
