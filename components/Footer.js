import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-24">
      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-display font-bold text-xl">
            Vistor<span className="text-sky">tech</span>
          </span>
          <p className="mt-3 text-sm text-white/60 max-w-xs">
            We build websites, apps, and digital marketing systems for
            businesses that want to grow online.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/80 mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link href="/services/web-development" className="hover:text-sky">
                Web Development
              </Link>
            </li>
            <li>
              <Link href="/services/app-development" className="hover:text-sky">
                App Development
              </Link>
            </li>
            <li>
              <Link
                href="/services/digital-marketing"
                className="hover:text-sky"
              >
                Digital Marketing
              </Link>
            </li>
            <li>
              <Link
                href="/services/ecommerce-website"
                className="hover:text-sky"
              >
                E-commerce Websites
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/80 mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link href="/about" className="hover:text-sky">
                About
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-sky">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sky">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/80 mb-3">
            Get in touch
          </h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>vivekvb2124@gmail.com</li>
            <li>+91 70376 09143</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Vistortech. All rights reserved.
      </div>
    </footer>
  );
}
