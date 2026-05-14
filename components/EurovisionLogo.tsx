export function EurovisionLogo({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className ?? ""}`}>
      {/* Official ESC white logo (Vienna 2025) */}
      <img
        src="/esc-logo.png"
        alt="Eurovision Song Contest Vienna 2025"
        className="w-48 h-auto"
        draggable={false}
      />
      {/* Official 70th anniversary mark */}
      <img
        src="/70-logo.webp"
        alt="70th Eurovision Song Contest"
        className="w-28 h-auto"
        draggable={false}
      />
    </div>
  );
}
