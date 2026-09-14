import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — Vistortech",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="font-display text-4xl font-bold text-ink">Contact us</h1>
      <p className="mt-4 text-lg text-slate max-w-xl">
        Tell us a bit about your project and we'll get back to you within a day.
      </p>

      <div className="mt-12 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <ContactForm />
        </div>
        <div className="space-y-6 text-sm text-slate">
          <div>
            <h3 className="font-display font-semibold text-ink mb-1">Email</h3>
            <p>vivekvb2124@gmail.com</p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink mb-1">Phone</h3>
            <p>+91 70376 09143</p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink mb-1">
              Location
            </h3>
            <p>India — working with clients worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
}
