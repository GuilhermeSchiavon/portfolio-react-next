'use client'

import { useTranslation } from 'react-i18next'
import { mailtoLink, site, whatsappLink } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowUp, GitHub, Instagram, LinkedIn, Mail, MapPin, WhatsApp } from '@/components/ui/Icons'

const SOURCE_URL = 'https://github.com/GuilhermeSchiavon/portfolio-react-next'

const socials = [
  { name: 'GitHub', href: site.social.github, Icon: GitHub },
  { name: 'LinkedIn', href: site.social.linkedin, Icon: LinkedIn },
  { name: 'Instagram', href: site.social.instagram, Icon: Instagram },
]

export function Footer() {
  const { t } = useTranslation('global')
  const whatsappHref = whatsappLink(t('contact.whatsappMessage'))
  const mailHref = mailtoLink(t('contact.emailSubject'))

  return (
    <footer id="contact" className="bg-neutral-950 text-white">
      <div className="container py-20 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow !text-primary-400">{t('contact.eyebrow')}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{t('contact.title')}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-300">{t('contact.text')}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn bg-[#1faa53] text-white hover:bg-[#178a43]">
                <WhatsApp className="h-4 w-4" />
                {t('contact.whatsapp')}
              </a>
              <a href={mailHref} className="btn border border-white/25 text-white hover:bg-white/10">
                <Mail className="h-4 w-4" />
                {t('contact.email')}
              </a>
            </div>
          </div>

          <address className="not-italic lg:col-span-5">
            <dl className="space-y-5">
              <div className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 text-primary-400" />
                <div>
                  <dt className="text-sm text-neutral-400">{t('contact.emailLabel')}</dt>
                  <dd>
                    <a href={mailHref} className="font-medium hover:text-primary-300">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <WhatsApp className="mt-0.5 h-5 w-5 text-primary-400" />
                <div>
                  <dt className="text-sm text-neutral-400">{t('contact.whatsappLabel')}</dt>
                  <dd>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary-300">
                      {site.whatsapp.display}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 text-primary-400" />
                <div>
                  <dt className="text-sm text-neutral-400">{t('contact.locationLabel')}</dt>
                  <dd className="font-medium">{t('contact.location')}</dd>
                </div>
              </div>
            </dl>

            <ul aria-label={t('footer.social')} className="mt-8 flex gap-3">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </Reveal>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-4 py-6 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <GitHub className="h-4 w-4" />
              {t('footer.source')}
            </a>
            <a href="#top" className="inline-flex items-center gap-2 hover:text-white">
              {t('footer.backToTop')}
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
