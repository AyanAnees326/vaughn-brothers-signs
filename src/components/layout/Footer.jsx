import { company, navLinks } from '../../data/site'
import { BrandMark, StarMark } from '../ui/StarMark'

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink/10 bg-bone py-12 dark:border-bone/10 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <BrandMark className="h-11 w-11" />
              <div>
                <p className="font-slab text-base leading-tight text-ink dark:text-bone">
                  {company.legal}
                </p>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-ink/45 dark:text-bone/45">
                  {company.city}
                </p>
              </div>
            </div>
            <p className="mt-4 font-script text-lg text-burnt">
              {company.subline}
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ink/55 dark:text-bone/55">
              {company.address}
              <br />
              {company.phone} · {company.email}
            </p>
          </div>

          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-burnt dark:text-bone/60"
              >
                <StarMark className="h-2.5 w-2.5 text-burnt" />
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-dashed border-ink/20 pt-6 dark:border-bone/20 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-ink/40 dark:text-bone/40">
            © {new Date().getFullYear()} {company.legal}. Licensed and insured in
            the State of Texas.
          </p>
          <p className="font-sans text-xs text-ink/40 dark:text-bone/40">
            A front-end mockup — this company is fictional.
          </p>
        </div>
      </div>
    </footer>
  )
}
