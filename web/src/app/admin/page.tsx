import { getAdminStats, getRecentActivity } from "../actions/admin";

// Add this line to force dynamic rendering if you want real-time updates without caching
export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [statsData, recentActivity] = await Promise.all([
    getAdminStats(),
    getRecentActivity(),
  ]);

  const stats = [
    { label: "Total Companies", value: statsData.totalCompanies.toString(), trend: "Active clients" },
    { label: "Active Users", value: statsData.activeUsers.toString(), trend: "Platform users" },
    { label: "Posts Today", value: statsData.postsToday.toString(), trend: "Generated today" },
    { 
      label: "Pending Approvals", 
      value: statsData.pendingApprovals.toString(), 
      trend: statsData.pendingApprovals > 0 ? "Action required" : "All clear", 
      alert: statsData.pendingApprovals > 0 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Admin Dashboard</h1>
        <p className="text-neutral-500 mt-1">Welcome back. Here's what's happening across all companies today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
              <h3 className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</h3>
              <p className={`text-xs font-medium mt-2 ${stat.alert ? 'text-rose-500' : 'text-emerald-500'}`}>
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <p className="text-sm text-neutral-500 py-4">No recent activity yet.</p>
        ) : (
          <div className="space-y-6">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between pb-6 border-b border-neutral-100 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    {activity.company.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{activity.company}</p>
                    <p className="text-xs text-neutral-500">{activity.action}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-neutral-400">
                    {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                    activity.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 
                    activity.status === 'PENDING_APPROVAL' ? 'bg-amber-100 text-amber-700' : 
                    'bg-neutral-100 text-neutral-600'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
