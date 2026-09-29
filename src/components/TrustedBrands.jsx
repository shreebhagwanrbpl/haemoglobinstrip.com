export default function TrustedBrands() {
  const groups = [
    "Diagnostic Systems",
    "Laboratory Instruments",
    "Reagents & Controls",
    "Patient Monitoring",
    "Medical Consumables",
  ];

  return (
    <section className="py-14 bg-slate-50 border-y border-slate-100">
      <div className="container-custom">
        <p className="text-center text-slate-500 font-medium mb-8">
          Product areas covered across the biomedical catalogue
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {groups.map((item) => (
            <div key={item} className="bg-white rounded-2xl p-6 text-center font-semibold text-slate-700 card-shadow border border-slate-100">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
