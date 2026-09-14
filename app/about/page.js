import Image from "next/image";
import profilePic from "../../public/vivek.png";

export const metadata = {
  title: "About — Vistortech",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="flex flex-col sm:flex-row items-center gap-8 mb-16 border-b border-slate/10 pb-16">
        <div className="flex-shrink-0">
          <Image
            src={profilePic}
            alt="Vivek Singh Bisht profile picture"
            /* 
              FIXED CLASSES:
              1. w-32 h-32 sm:w-40 sm:h-40: Forces a strict square size so it doesn't get huge.
              2. Removed bg-white and p-1: Eliminates the weird background color behind the image.
            */
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-slate/10 shadow-xl"
            priority
          />
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold text-ink">
            Vivek Singh Bisht
          </h2>
          <p className="font-mono text-sm text-slate mt-1">
            Founder | MERN Full Stack Developer
          </p>
          <p className="mt-4 text-lg text-slate leading-relaxed">
            As the founder of Vistortech and a dedicated MERN Full Stack
            Developer, my mission is crafting robust and scalable applications
            using MongoDB, Express.js, React, and Node.js. I have built this
            company on the core principles of translating complex business
            requirements into clean, manageable code, always ensuring that every
            project Vistortech undertakes is delivered with quality and direct
            communication as its heart.
          </p>
        </div>
      </div>

      <h1 className="font-display text-4xl font-bold text-ink">
        About Vistortech
      </h1>
      <p className="mt-6 text-lg text-slate leading-relaxed">
        Vistortech is a web and app development studio helping businesses build
        a stronger presence online. We work across web development, mobile apps,
        digital marketing, and e-commerce — bringing design, engineering, and
        growth strategy together under one team.
      </p>
      <p className="mt-4 text-lg text-slate leading-relaxed">
        Our approach is simple: understand what a business actually needs, build
        it well, and stay involved after launch. We&apos;d rather take on fewer
        projects and do them properly than spread ourselves thin.
      </p>

      <div className="mt-12 grid sm:grid-cols-3 gap-8">
        {[
          [
            "Our mission",
            "Help growing businesses compete online with the same quality of technology as much larger companies.",
          ],
          [
            "How we work",
            "Small team, direct communication, and weekly progress updates on every project.",
          ],
          [
            "What we value",
            "Clean code, honest timelines, and websites that actually get used, not just launched.",
          ],
        ].map(([title, body]) => (
          <div key={title}>
            <h3 className="font-display font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
