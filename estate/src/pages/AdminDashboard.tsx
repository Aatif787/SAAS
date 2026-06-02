import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'
import {
  Building2, MessageSquare, Mail, FileText,
  Trash2, X, Plus, BarChart3,
  ArrowUpRight, Clock
} from 'lucide-react'

const navTabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  { id: 'contacts', label: 'Contacts', icon: Mail },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
]

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'
  const [activeTab, setActiveTab] = useState('overview')

  // Redirect non-admin users
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/')
    }
  }, [authLoading, user, isAdmin, navigate])

  if (authLoading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <p className="text-gray-400 font-body">Loading...</p>
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div className="pt-[72px] min-h-screen bg-[#f8f7f3]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="font-body text-[12px] text-[#4d4d4d] uppercase tracking-[1.2px] px-3 mb-3">
                Dashboard
              </p>
              <nav className="space-y-1">
                {navTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-body transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-black text-white'
                        : 'text-[#4d4d4d] hover:bg-black/5'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'properties' && <PropertiesTab />}
            {activeTab === 'inquiries' && <InquiriesTab />}
            {activeTab === 'contacts' && <ContactsTab />}
            {activeTab === 'blog' && <BlogTab />}
          </main>
        </div>
      </div>
    </div>
  )
}

// ─── Overview Tab ───────────────────────────────────────────
function OverviewTab() {
  const { data: stats } = trpc.dashboard.stats.useQuery()
  const { data: recentInquiries } = trpc.dashboard.recentInquiries.useQuery()
  const { data: recentContacts } = trpc.dashboard.recentContacts.useQuery()

  const cards = [
    { label: 'Properties', value: stats?.totalProperties ?? 0, icon: Building2, color: '#ff7a1a' },
    { label: 'Inquiries', value: stats?.totalInquiries ?? 0, icon: MessageSquare, color: '#b7d64a' },
    { label: 'Contact Submissions', value: stats?.totalContacts ?? 0, icon: Mail, color: '#4d4d4d' },
    { label: 'Blog Posts', value: stats?.totalBlogPosts ?? 0, icon: FileText, color: '#ff7a1a' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="font-display text-[30px] text-black">Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <card.icon size={24} style={{ color: card.color }} />
              <ArrowUpRight size={16} className="text-[#4d4d4d]" />
            </div>
            <p className="font-display text-[32px] text-black leading-none">{card.value}</p>
            <p className="font-body text-[13px] text-[#4d4d4d] mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* New Inquiries Alert */}
      {(stats?.newInquiriesCount ?? 0) > 0 && (
        <div className="bg-[#ff7a1a]/10 border border-[#ff7a1a]/20 rounded-xl p-4 flex items-center gap-3">
          <Clock size={20} className="text-[#ff7a1a]" />
          <p className="font-body text-[14px] text-black">
            You have <span className="font-medium">{stats?.newInquiriesCount} new inquiry{stats?.newInquiriesCount !== 1 ? 'ies' : 'y'}</span> awaiting response.
          </p>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-display text-[20px] text-black mb-4">Recent Inquiries</h3>
          {recentInquiries && recentInquiries.length > 0 ? (
            <div className="space-y-3">
              {recentInquiries.map((inq: any) => (
                <div key={inq.id} className="flex items-start gap-3 py-3 border-b border-black/5 last:border-0">
                  <MessageSquare size={16} className="text-[#b7d64a] mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-body text-[14px] text-black truncate">{inq.name}</p>
                    <p className="font-body text-[12px] text-[#4d4d4d] truncate">{inq.message}</p>
                  </div>
                  <span className={`text-[11px] font-body px-2 py-0.5 rounded-full shrink-0 ${
                    inq.status === 'new' ? 'bg-[#ff7a1a]/10 text-[#ff7a1a]' :
                    inq.status === 'contacted' ? 'bg-[#b7d64a]/10 text-green-700' :
                    'bg-black/5 text-[#4d4d4d]'
                  }`}>
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body text-[14px] text-[#4d4d4d]">No recent inquiries.</p>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-display text-[20px] text-black mb-4">Recent Contacts</h3>
          {recentContacts && recentContacts.length > 0 ? (
            <div className="space-y-3">
              {recentContacts.map((contact: any) => (
                <div key={contact.id} className="flex items-start gap-3 py-3 border-b border-black/5 last:border-0">
                  <Mail size={16} className="text-[#ff7a1a] mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-body text-[14px] text-black truncate">{contact.name}</p>
                    <p className="font-body text-[12px] text-[#4d4d4d] truncate">{contact.subject || contact.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body text-[14px] text-[#4d4d4d]">No recent contacts.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Properties Tab ─────────────────────────────────────────
function PropertiesTab() {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.property.list.useQuery({ limit: 100 })
  const deleteMutation = trpc.property.delete.useMutation({
    onSuccess: () => utils.property.list.invalidate(),
  })

  const [showForm, setShowForm] = useState(false)

  if (isLoading) return <p className="font-body text-[#4d4d4d]">Loading properties...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[30px] text-black">Properties</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-lime flex items-center gap-2 text-[13px]"
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? 'Cancel' : 'Add Property'}
        </button>
      </div>

      {showForm && <PropertyForm onCancel={() => setShowForm(false)} />}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f7f3]">
              <tr>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Property</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Price</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((p: any) => (
                <tr key={p.id} className="border-t border-black/5 hover:bg-black/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.mainImage} alt="" className="w-10 h-10 rounded object-cover" />
                      <div>
                        <p className="font-body text-[14px] text-black">{p.title}</p>
                        <p className="font-body text-[12px] text-[#4d4d4d]">{p.neighborhood}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body text-[13px] text-[#4d4d4d] capitalize">{p.propertyType}</td>
                  <td className="px-4 py-3 font-body text-[13px] text-black">
                    \u20aa{(p.price / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-body px-2 py-0.5 rounded-full ${
                      p.status === 'available' ? 'bg-[#b7d64a]/10 text-green-700' :
                      p.status === 'sold' ? 'bg-black/5 text-[#4d4d4d]' :
                      'bg-[#ff7a1a]/10 text-[#ff7a1a]'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => deleteMutation.mutate({ id: p.id })}
                        className="p-1.5 text-[#4d4d4d] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!data?.items || data.items.length === 0) && (
          <div className="text-center py-12">
            <p className="font-body text-[14px] text-[#4d4d4d]">No properties yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Property Form ──────────────────────────────────────────
function PropertyForm({ onCancel }: { onCancel: () => void }) {
  const utils = trpc.useUtils()
  const createMutation = trpc.property.create.useMutation({
    onSuccess: () => {
      utils.property.list.invalidate()
      onCancel()
    },
  })

  const [form, setForm] = useState({
    title: '', slug: '', description: '', address: '', neighborhood: 'Kiryat Hasharon',
    price: '', bedrooms: '', bathrooms: '', areaSqm: '', propertyType: 'apartment' as const,
    mainImage: '/images/img1.jpg', featured: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate({
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
      description: form.description,
      address: form.address,
      neighborhood: form.neighborhood,
      price: parseInt(form.price),
      bedrooms: parseInt(form.bedrooms),
      bathrooms: parseInt(form.bathrooms),
      areaSqm: parseInt(form.areaSqm),
      propertyType: form.propertyType,
      mainImage: form.mainImage,
      featured: form.featured,
      status: 'available',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Title *" required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="h-10 px-3 border border-black/15 rounded-lg text-[13px] font-body focus:outline-none focus:border-[#ff7a1a]" />
        <input placeholder="Slug (URL-friendly)" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} className="h-10 px-3 border border-black/15 rounded-lg text-[13px] font-body focus:outline-none focus:border-[#ff7a1a]" />
        <input placeholder="Address *" required value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} className="h-10 px-3 border border-black/15 rounded-lg text-[13px] font-body focus:outline-none focus:border-[#ff7a1a]" />
        <input placeholder="Neighborhood" value={form.neighborhood} onChange={(e) => setForm((p) => ({ ...p, neighborhood: e.target.value }))} className="h-10 px-3 border border-black/15 rounded-lg text-[13px] font-body focus:outline-none focus:border-[#ff7a1a]" />
        <input placeholder="Price (NIS) *" required type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} className="h-10 px-3 border border-black/15 rounded-lg text-[13px] font-body focus:outline-none focus:border-[#ff7a1a]" />
        <input placeholder="Area (sqm) *" required type="number" value={form.areaSqm} onChange={(e) => setForm((p) => ({ ...p, areaSqm: e.target.value }))} className="h-10 px-3 border border-black/15 rounded-lg text-[13px] font-body focus:outline-none focus:border-[#ff7a1a]" />
        <input placeholder="Bedrooms *" required type="number" value={form.bedrooms} onChange={(e) => setForm((p) => ({ ...p, bedrooms: e.target.value }))} className="h-10 px-3 border border-black/15 rounded-lg text-[13px] font-body focus:outline-none focus:border-[#ff7a1a]" />
        <input placeholder="Bathrooms *" required type="number" value={form.bathrooms} onChange={(e) => setForm((p) => ({ ...p, bathrooms: e.target.value }))} className="h-10 px-3 border border-black/15 rounded-lg text-[13px] font-body focus:outline-none focus:border-[#ff7a1a]" />
      </div>
      <textarea placeholder="Description *" required rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="w-full px-3 py-2 border border-black/15 rounded-lg text-[13px] font-body focus:outline-none focus:border-[#ff7a1a] resize-none" />
      <div className="flex gap-3">
        <button type="submit" className="btn-lime text-[13px]" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Creating...' : 'Create Property'}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost text-[13px] border-black/15">
          Cancel
        </button>
      </div>
    </form>
  )
}

// ─── Inquiries Tab ──────────────────────────────────────────
function InquiriesTab() {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.inquiry.list.useQuery({ limit: 100 })
  const updateStatus = trpc.inquiry.updateStatus.useMutation({
    onSuccess: () => utils.inquiry.list.invalidate(),
  })

  if (isLoading) return <p className="font-body text-[#4d4d4d]">Loading inquiries...</p>

  return (
    <div className="space-y-6">
      <h2 className="font-display text-[30px] text-black">Inquiries</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f7f3]">
              <tr>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Message</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((inq: any) => (
                <tr key={inq.id} className="border-t border-black/5 hover:bg-black/[0.02] transition-colors">
                  <td className="px-4 py-3 font-body text-[13px] text-black">{inq.name}</td>
                  <td className="px-4 py-3 font-body text-[13px] text-[#4d4d4d]">{inq.email}</td>
                  <td className="px-4 py-3 font-body text-[13px] text-[#4d4d4d] max-w-[200px] truncate">{inq.message}</td>
                  <td className="px-4 py-3">
                    <select
                      value={inq.status}
                      onChange={(e) => updateStatus.mutate({ id: inq.id, status: e.target.value as 'new' | 'contacted' | 'closed' })}
                      className={`text-[11px] font-body px-2 py-0.5 rounded-full border-0 cursor-pointer ${
                        inq.status === 'new' ? 'bg-[#ff7a1a]/10 text-[#ff7a1a]' :
                        inq.status === 'contacted' ? 'bg-[#b7d64a]/10 text-green-700' :
                        'bg-black/5 text-[#4d4d4d]'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 font-body text-[12px] text-[#4d4d4d]">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!data?.items || data.items.length === 0) && (
          <div className="text-center py-12">
            <p className="font-body text-[14px] text-[#4d4d4d]">No inquiries yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Contacts Tab ───────────────────────────────────────────
function ContactsTab() {
  const { data, isLoading } = trpc.contact.list.useQuery({ limit: 100 })

  if (isLoading) return <p className="font-body text-[#4d4d4d]">Loading contacts...</p>

  return (
    <div className="space-y-6">
      <h2 className="font-display text-[30px] text-black">Contact Submissions</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f7f3]">
              <tr>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Subject</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Message</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((contact: any) => (
                <tr key={contact.id} className="border-t border-black/5 hover:bg-black/[0.02] transition-colors">
                  <td className="px-4 py-3 font-body text-[13px] text-black">{contact.name}</td>
                  <td className="px-4 py-3 font-body text-[13px] text-[#4d4d4d]">{contact.email}</td>
                  <td className="px-4 py-3 font-body text-[13px] text-[#4d4d4d]">{contact.subject || '-'}</td>
                  <td className="px-4 py-3 font-body text-[13px] text-[#4d4d4d] max-w-[250px] truncate">{contact.message}</td>
                  <td className="px-4 py-3 font-body text-[12px] text-[#4d4d4d]">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!data?.items || data.items.length === 0) && (
          <div className="text-center py-12">
            <p className="font-body text-[14px] text-[#4d4d4d]">No contact submissions yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Blog Tab ───────────────────────────────────────────────
function BlogTab() {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.blog.list.useQuery({ limit: 100 })
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => utils.blog.list.invalidate(),
  })

  if (isLoading) return <p className="font-body text-[#4d4d4d]">Loading blog posts...</p>

  return (
    <div className="space-y-6">
      <h2 className="font-display text-[30px] text-black">Blog Posts</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f7f3]">
              <tr>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Date</th>
                <th className="text-right px-4 py-3 font-body text-[12px] text-[#4d4d4d] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((post: any) => (
                <tr key={post.id} className="border-t border-black/5 hover:bg-black/[0.02] transition-colors">
                  <td className="px-4 py-3 font-body text-[13px] text-black">{post.title}</td>
                  <td className="px-4 py-3 font-body text-[13px] text-[#4d4d4d]">{post.category}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-body px-2 py-0.5 rounded-full ${
                      post.published ? 'bg-[#b7d64a]/10 text-green-700' : 'bg-[#ff7a1a]/10 text-[#ff7a1a]'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-[12px] text-[#4d4d4d]">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteMutation.mutate({ id: post.id })}
                      className="p-1.5 text-[#4d4d4d] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!data?.items || data.items.length === 0) && (
          <div className="text-center py-12">
            <p className="font-body text-[14px] text-[#4d4d4d]">No blog posts yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
