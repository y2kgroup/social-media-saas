import Link from "next/link";
import { getPromotions } from "../../actions/company";
import prisma from "@/lib/prisma";
import { Megaphone, Plus, MoreVertical, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PromotionsList() {
  // Hack for demo: Just grab the first company in the DB
  const firstCompany = await prisma.company.findFirst();
  
  if (!firstCompany) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold text-neutral-900">No Company Data</h2>
        <p className="text-neutral-500 mt-2">Create a company in the admin panel first.</p>
      </div>
    );
  }

  const promotions = await getPromotions(firstCompany.id);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Promotions</h1>
          <p className="text-neutral-500 mt-1">Manage sales, events, and specials. The AI will use these to write your posts.</p>
        </div>
        <Link 
          href="/dashboard/promotions/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Promotion
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Promotion Details</th>
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Duration</th>
                <th className="py-4 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {promotions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-neutral-500">
                    <Megaphone size={32} className="mx-auto mb-3 text-neutral-300" />
                    <p>No active promotions.</p>
                    <Link href="/dashboard/promotions/new" className="text-indigo-600 font-medium hover:underline mt-1 inline-block">
                      Create your first promotion
                    </Link>
                  </td>
                </tr>
              ) : (
                promotions.map((promo) => (
                  <tr key={promo.id} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                          <Megaphone size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{promo.title}</p>
                          <p className="text-sm text-neutral-500 max-w-md truncate">{promo.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Calendar size={14} className="text-neutral-400" />
                        {promo.validUntil ? `Valid until ${new Date(promo.validUntil).toLocaleDateString()}` : "Ongoing"}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                        promo.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 
                        promo.status === 'UPCOMING' ? 'bg-indigo-100 text-indigo-700' : 
                        'bg-neutral-100 text-neutral-600'
                      }`}>
                        {promo.status}
                      </span>
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
