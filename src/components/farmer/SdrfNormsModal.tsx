import React from "react";
import { X, Table, ShieldCheck, Info } from "lucide-react";
import { SDRF_CATEGORIES } from "../../data/sdrfNorms";
import { Language } from "../../translations";

interface SdrfNormsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
}

export const SdrfNormsModal: React.FC<SdrfNormsModalProps> = ({
  isOpen,
  onClose,
  currentLang = "en",
}) => {
  if (!isOpen) return null;

  // Sort categories by Sr. No (1 to 11)
  const sortedCategories = [...SDRF_CATEGORIES].sort((a, b) => a.srNo - b.srNo);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0f2d4a] to-[#1a4a75] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Table className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                {currentLang === "mr"
                  ? "राज्य आपत्ती प्रतिसाद निधी (SDRF) साहाय्य दर व निकष तक्ता"
                  : "State Disaster Response Fund (SDRF) Assistance Rates & Norms"}
              </h3>
              <p className="text-xs text-slate-300">
                {currentLang === "mr"
                  ? "शासकीय दर तक्त्यानुसार अधिकृत मदत दर (Item 1 to 11)"
                  : "Official norms for disaster relief and ex-gratia assistance"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="p-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {currentLang === "mr"
              ? "नोंद: SDRF नियमांनुसार पिकांच्या नुकसानीसाठी ३३% पेक्षा जास्त नुकसान असणे अनिवार्य असून मदत मर्यादा प्रति शेतकरी कुटुंब कमाल २ हेक्टरपर्यंत मर्यादित आहे."
              : "Note: SDRF assistance requires >33% assessed loss. Crop damage assistance is capped at a maximum of 2 hectares per farmer family."}
          </span>
        </div>

        {/* Table Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3 w-16 text-center">Sr. No.</th>
                  <th className="p-3 w-64">Item / Category</th>
                  <th className="p-3">Assistance Rates and Criteria under SDRF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sortedCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-bold text-center text-slate-600 bg-slate-50/50">
                      {cat.srNo}
                    </td>
                    <td className="p-3 align-top">
                      <div className="font-bold text-slate-900">{cat.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{cat.titleMr}</div>
                    </td>
                    <td className="p-3 align-top space-y-1.5">
                      {cat.options.map((opt) => (
                        <div
                          key={opt.id}
                          className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                        >
                          <div>
                            <span className="font-semibold text-slate-800">{opt.label}</span>
                            <span className="text-[11px] text-slate-500 block">{opt.labelMr}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="inline-block font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                              {opt.criteriaText}
                            </span>
                            {opt.maxLimit && (
                              <span className="text-[10px] text-slate-500 block mt-0.5">
                                {opt.maxLimit}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer"
          >
            {currentLang === "mr" ? "बंद करा (Close)" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
