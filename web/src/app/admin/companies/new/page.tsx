import { createCompany } from "../../../actions/admin";
import { redirect } from "next/navigation";
import { ArrowLeft, Building2, Globe, User, Phone } from "lucide-react";
import Link from "next/link";

export default function NewCompanyPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    await createCompany(formData);
    // After creating, redirect back to the list
    redirect("/admin/companies");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/admin/companies" className="p-2 rounded-full hover:bg-white border border-transparent hover:border-neutral-200 hover:shadow-sm text-neutral-500 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Add Company</h1>
          <p className="text-neutral-500 mt-1">Onboard a new client. We will automatically scrape their site for brand voice.</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-neutral-100 p-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full -mr-32 -mt-32 opacity-70"></div>

        <form action={handleSubmit} className="space-y-6 relative z-10">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-2">Business Details</h3>
            
            <div className="grid gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Building2 size={16} className="text-neutral-400" /> Company Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="e.g., Joe's Pizza"
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Globe size={16} className="text-neutral-400" /> Website URL
                </label>
                <input 
                  type="url" 
                  id="website" 
                  name="website" 
                  required 
                  placeholder="https://joespizza.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-2">Primary Contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contactName" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <User size={16} className="text-neutral-400" /> Full Name
                </label>
                <input 
                  type="text" 
                  id="contactName" 
                  name="contactName" 
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contactPhone" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Phone size={16} className="text-neutral-400" /> WhatsApp Number
                </label>
                <input 
                  type="tel" 
                  id="contactPhone" 
                  name="contactPhone" 
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
                <p className="text-xs text-neutral-500">Used for approval workflows.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-neutral-100">
            <Link href="/admin/companies" className="px-5 py-2.5 rounded-lg text-neutral-600 hover:bg-neutral-100 font-medium transition-all">
              Cancel
            </Link>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all active:scale-95">
              Add Company
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
