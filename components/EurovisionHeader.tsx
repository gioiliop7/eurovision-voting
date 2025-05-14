import { EurovisionLogo } from "./EurovisionLogo";

export function EurovisionHeader() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#2E0A4A] opacity-70 z-0"></div>
      <div className="relative z-10 py-10 flex flex-col items-center">
        <EurovisionLogo className="w-64 h-auto mb-6" />
        <h2 className="text-2xl font-bold text-[#FF0066] uppercase tracking-wider mb-6">
          VOTE TOGETHER
        </h2>
        <div className="w-32 h-1 bg-[#FF0066] mx-auto"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-[#2E0A4A] via-[#4A1073] to-[#3D0D5F]"></div>
    </div>
  );
}
