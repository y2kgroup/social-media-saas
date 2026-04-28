"use client"

import { motion } from 'framer-motion'
import { Building2, Calendar, FileText, Activity } from 'lucide-react'

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Companies" 
          value="1" 
          icon={Building2} 
          trend="+1 this month"
          color="bg-blue-500"
        />
        <StatCard 
          title="Posts Generated" 
          value="24" 
          icon={FileText} 
          trend="+12% from last week"
          color="bg-emerald-500"
        />
        <StatCard 
          title="Pending Approval" 
          value="3" 
          icon={Activity} 
          trend="Needs attention"
          color="bg-amber-500"
        />
        <StatCard 
          title="Published This Week" 
          value="14" 
          icon={Calendar} 
          trend="+5% from last week"
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 glass-dark sm:glass rounded-[var(--radius-lg)] p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="flex flex-col items-center justify-center py-12 text-[var(--muted-foreground)]">
            <Activity size={48} className="mb-4 opacity-50" />
            <p>No recent activity found.</p>
            <p className="text-sm">Once the AI generates posts, they will appear here.</p>
          </div>
        </div>

        <div className="col-span-1 glass-dark sm:glass rounded-[var(--radius-lg)] p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-[var(--radius-md)] bg-[var(--muted)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-colors text-sm font-medium">
              + Add New Company
            </button>
            <button className="w-full text-left px-4 py-3 rounded-[var(--radius-md)] bg-[var(--muted)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-colors text-sm font-medium">
              + Input Weekly Promotion
            </button>
            <button className="w-full text-left px-4 py-3 rounded-[var(--radius-md)] bg-[var(--muted)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-colors text-sm font-medium">
              Trigger Manual Generation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <div className="glass-dark sm:glass p-6 rounded-[var(--radius-lg)] flex flex-col relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150`} />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[var(--muted-foreground)] font-medium text-sm">{title}</h3>
        <div className={`p-2 rounded-lg ${color}/10 text-${color.replace('bg-', '')}`}>
          <Icon size={18} />
        </div>
      </div>
      
      <div className="flex items-end justify-between mt-auto">
        <div>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">{trend}</p>
        </div>
      </div>
    </div>
  )
}
