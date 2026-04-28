import Link from "next/link";
import { getCompanies } from "../../actions/admin";
import { Building2, Plus, ExternalLink, MoreVertical } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CompaniesList() {
  const companies = await getCompanies();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Companies</h1>
          <p className="text-neutral-500 mt-1">Manage onboarded clients and view their engagement statuses.</p>
        </div>
        <Link 
          href="/admin/companies/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Company
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Company</th>
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">Active Posts</th>
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Joined</th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-500">
                    <Building2 size={32} className="mx-auto mb-3 text-neutral-300" />
                    <p>No companies onboarded yet.</p>
                    <Link href="/admin/companies/new" className="text-indigo-600 font-medium hover:underline mt-1 inline-block">
                      Add your first company
                    </Link>
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-50 to-purple-50 text-indigo-600 flex items-center justify-center font-bold shadow-sm">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{company.name}</p>
                          <a href={company.website || undefined} target="_blank" rel="noreferrer" className="text-xs text-neutral-500 flex items-center gap-1 hover:text-indigo-600 transition-colors">
                            {company.website?.replace(/^https?:\/\//, '') || "No website"}
                            {company.website && <ExternalLink size={10} />}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-neutral-700">{company.phone || "N/A"}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                        {company.postCount}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-neutral-500">
                        {new Date(company.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-neutral-400 hover:text-neutral-900 transition-colors opacity-0 group-hover:opacity-100 p-2">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
