export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">

                <h2 className="text-4xl font-bold text-slate-900 mb-8">
                    Hemoglobin Test Strips & Hb Meters Supplier in {location}
                </h2>

                <div className="space-y-6 text-slate-600 leading-8 text-lg">

                    <p>Raj Biosis distributes hemoglobin test strips and monitoring meters across multiple districts, assisting healthcare workers in executing rapid, reliable anemia diagnostic services.</p>

                </div>

                {/* FAQ Section */}

                <div className="mt-16">

                    <h2 className="text-3xl font-bold text-slate-900 mb-8">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">

                        <div>
                            <h3 className="font-semibold text-xl">Do you supply hemoglobin test strips across India?</h3>

                            <p className="text-slate-600 mt-2">Yes, we supply point-of-care hemoglobin testing systems and Hb strips across multiple districts and states in India.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl">Which hemoglobin testing devices and strips do you supply?</h3>

                            <p className="text-slate-600 mt-2">We provide Mission Hb meters, hemoglobin test strips, microcuvettes, control solutions, and anemia screening kits.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl">Do you provide calibration support for Hb meters?</h3>

                            <p className="text-slate-600 mt-2">Yes, we provide user setup tutorials, device calibration, and technical support for digital hemoglobin meters.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl">Who can buy hemoglobin testing systems from you?</h3>

                            <p className="text-slate-600 mt-2">Clinics, pathology labs, hospitals, maternal care clinics, health screening camps, and diagnostic buyers can purchase from us.</p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}