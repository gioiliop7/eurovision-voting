import { EurovisionLogo } from "./EurovisionLogo";

export function EurovisionHeader() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#050A1E] z-0"></div>
      <div className="relative z-10 py-8 flex flex-col items-center">
        <EurovisionLogo />
        <div className="w-48 h-[2px] bg-gradient-to-r from-[#E8007D] via-[#5B21B6] to-[#00C8EC] mx-auto rounded-full mt-6"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#E8007D] via-[#5B21B6] to-[#00C8EC]"></div>
    </div>
  );
}
