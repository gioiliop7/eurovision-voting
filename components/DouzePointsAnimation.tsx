import type { DouzePointsAnimationProps } from "@/types";

export function DouzePointsAnimation({
  show,
  countryId,
  countries,
}: DouzePointsAnimationProps) {
  if (!show) return null;

  const country = countries.find((c) => c.id === countryId);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-black/50 backdrop-blur-md p-8 rounded-xl animate-bounce">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">DOUZE POINTS!</h2>
          <div className="text-9xl mb-4">{country?.flag || "🎉"}</div>
          <p className="text-2xl text-white">{country?.name || ""}</p>
        </div>
      </div>
    </div>
  );
}
