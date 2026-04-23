import { AnnouncementEditor } from '@/components/admin/AnnouncementEditor'

export default function AdminAnnouncementPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-serif" style={{ color: '#CCBB98' }}>
          Banner Announcements
        </h1>
        <p className="text-sm" style={{ color: '#f2f2f2' }}>
          Create announcements, set expiry, and toggle one active banner at a time.
        </p>
      </div>
      <AnnouncementEditor />
    </div>
  )
}
