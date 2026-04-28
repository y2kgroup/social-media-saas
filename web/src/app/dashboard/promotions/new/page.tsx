import { createPromotion } from "../../../actions/company";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ArrowLeft, Megaphone, FileText, Calendar } from "lucide-react";
import Link from "next/link";

export default async function NewPromotionPage() {
  // Hack for demo: Just grab the first company in the DB
  const firstCompany = await prisma.company.findFirst();
  
  if (!firstCompany) {
    redirect("/admin/companies");
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    // We bind the companyId securely on the server
    await createPromotion(firstCompany!.id, formData);
    redirect("/dashboard/promotions");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/promotions" className="p-2 rounded-full hover:bg-white border border-transparent hover:border-neutral-200 hover:shadow-sm text-neutral-500 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Add Promotion</h1>
          <p className="text-neutral-500 mt-1">Tell the AI what to write about in your upcoming posts.</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-neutral-100 p-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full -mr-32 -mt-32 opacity-70"></div>

        <form action={handleSubmit} className="space-y-6 relative z-10">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-2">Promotion Details</h3>
            
            <div className="grid gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Megaphone size={16} className="text-neutral-400" /> Title
                </label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  required 
                  placeholder="e.g., Summer Weekend Special"
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <FileText size={16} className="text-neutral-400" /> Description / Guidelines
                </label>
                <textarea 
                  id="description" 
                  name="description" 
                  required 
                  rows={4}
                  placeholder="e.g., Get 20% off all large pizzas this weekend. Use code SUMMER20. Emphasize that it is perfect for family gatherings."
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                />
                <p className="text-xs text-neutral-500">The AI uses this exactly as written to draft the social media posts.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-2">Duration <span className="text-sm font-normal text-neutral-500">(Optional)</span></h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Calendar size={16} className="text-neutral-400" /> Start Date
                </label>
                <input 
                  type="date" 
                  id="startDate" 
                  name="startDate" 
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Calendar size={16} className="text-neutral-400" /> End Date
                </label>
                <input 
                  type="date" 
                  id="endDate" 
                  name="endDate" 
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>
            </div>
            <p className="text-xs text-neutral-500">Leave blank if the promotion is always active.</p>
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-neutral-100">
            <Link href="/dashboard/promotions" className="px-5 py-2.5 rounded-lg text-neutral-600 hover:bg-neutral-100 font-medium transition-all">
              Cancel
            </Link>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all active:scale-95">
              Save Promotion
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
