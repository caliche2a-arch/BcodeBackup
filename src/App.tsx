import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslation } from 'react-i18next'
import { validateContactForm, hasFormErrors } from './utils/validation'
import type { FormErrors } from './interfaces'
import './index.css'

function App() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const form = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.current) return

    // Create a data object from the form
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('user_name') as string,
      email: formData.get('user_email') as string,
      projectType: formData.get('project_type') as string,
      message: formData.get('message') as string,
      // Add other fields as needed for validation if they are in the interface
    }

    const validationErrors = validateContactForm(data, t)

    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setLoading(false)
        alert(t('contact.form.successMessage'))
        form.current?.reset()
      }, (error) => {
        setLoading(false)
        console.error(error)
        alert(t('contact.form.errorMessage'))
      })
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  interface FaqItem { question: string; answer: string }
  interface TimelineItem { title: string; description: string }

  const faqs = t('faq.items', { returnObjects: true }) as FaqItem[]
  const timeline = t('history.timeline', { returnObjects: true }) as TimelineItem[]
  const webTech = t('services.web.tech', { returnObjects: true }) as string[]
  const mobileTech = t('services.mobile.tech', { returnObjects: true }) as string[]
  const designTech = t('services.design.tech', { returnObjects: true }) as string[]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo-container">
            <img src="/bcode-logo.png" alt="BCode Logo" className="logo-image" />
            <span className="brand-name">BCode</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home" className="nav-link">{t('nav.home')}</a></li>
            <li><a href="#services" className="nav-link">{t('nav.services')}</a></li>
            <li><a href="#about" className="nav-link">{t('nav.about')}</a></li>
            <li><a href="#history" className="nav-link">{t('nav.history')}</a></li>
            <li><a href="#faq" className="nav-link">{t('nav.faq')}</a></li>
            <li><a href="#contact" className="nav-link">{t('nav.contact')}</a></li>
          </ul>

          <div className="nav-controls">
            <div style={{ display: 'flex', gap: '0.8rem', marginLeft: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => i18n.changeLanguage('es')}
                style={{
                  opacity: i18n.language === 'es' ? 1 : 0.4,
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  transition: 'all 0.3s ease',
                  transform: i18n.language === 'es' ? 'scale(1.1)' : 'scale(1)',
                  filter: i18n.language === 'es' ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))' : 'none'
                }}
                title="Español"
              >
                <img
                  src="https://flagcdn.com/w40/co.png"
                  srcSet="https://flagcdn.com/w80/co.png 2x"
                  width="28"
                  alt="Colombia"
                  style={{ borderRadius: '4px', display: 'block' }}
                />
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                style={{
                  opacity: i18n.language === 'en' ? 1 : 0.4,
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  transition: 'all 0.3s ease',
                  transform: i18n.language === 'en' ? 'scale(1.1)' : 'scale(1)',
                  filter: i18n.language === 'en' ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))' : 'none'
                }}
                title="English"
              >
                <img
                  src="https://flagcdn.com/w40/us.png"
                  srcSet="https://flagcdn.com/w80/us.png 2x"
                  width="28"
                  alt="USA"
                  style={{ borderRadius: '4px', display: 'block' }}
                />
              </button>
            </div>
            <button className="mobile-menu-btn">☰</button>
          </div>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-primary">{t('hero.cta1')}</a>
            <a href="#services" className="btn btn-secondary">{t('hero.cta2')}</a>
          </div>
        </div>
      </section>

      <section id="services" className="section services">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">{t('services.subtitle')}</p>
            <h2>{t('services.title')}</h2>
            <p>{t('services.description')}</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3 className="service-title">{t('services.web.title')}</h3>
              <p className="service-description">{t('services.web.description')}</p>
              <ul className="service-tech">
                {webTech.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3 className="service-title">{t('services.mobile.title')}</h3>
              <p className="service-description">{t('services.mobile.description')}</p>
              <ul className="service-tech">
                {mobileTech.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3 className="service-title">{t('services.design.title')}</h3>
              <p className="service-description">{t('services.design.description')}</p>
              <ul className="service-tech">
                {designTech.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <p className="section-subtitle">{t('about.subtitle')}</p>
              <h2>{t('about.title')}</h2>
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>

              <div className="about-stats">
                <div className="stat-card">
                  <div className="stat-number">2</div>
                  <div className="stat-label">{t('about.stats.founders')}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">{t('about.stats.satisfaction')}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">2</div>
                  <div className="stat-label">{t('about.stats.countries')}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">24/5</div>
                  <div className="stat-label">{t('about.stats.support')}</div>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="visual-element"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="history" className="section history">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">{t('history.subtitle')}</p>
            <h2>{t('history.title')}</h2>
          </div>

          <div className="history-content">
            <div className="history-timeline">
              {timeline.map((item, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section faq">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">{t('faq.subtitle')}</p>
            <h2>{t('faq.title')}</h2>
            <p>{t('faq.description')}</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">{t('contact.subtitle')}</p>
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.description')}</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h2>{t('contact.info.title')}</h2>
              <p>{t('contact.info.description')}</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">📧</div>
                  <div>
                    <div style={{ color: 'var(--text)', fontWeight: '600' }}>{t('contact.info.email')}</div>
                    <div style={{ color: 'var(--text-muted)' }}>bcodebusinesssoftware@gmail.com</div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">📱</div>
                  <div>
                    <div style={{ color: 'var(--text)', fontWeight: '600' }}>{t('contact.info.phones')}</div>
                    <div style={{ color: 'var(--text-muted)' }}>+57 300 385 9125</div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">📍</div>
                  <div>
                    <div style={{ color: 'var(--text)', fontWeight: '600' }}>{t('contact.info.location')}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{t('contact.info.locationValue')}</div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">🌎</div>
                  <div>
                    <div style={{ color: 'var(--text)', fontWeight: '600' }}>{t('contact.info.reach')}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{t('contact.info.reachValue')}</div>
                  </div>
                </div>
              </div>
            </div>

            <form ref={form} className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">{t('contact.form.name')}</label>
                <input
                  type="text"
                  name="user_name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder={t('contact.form.namePlaceholder')}
                />
                {errors.name && <span className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">{t('contact.form.email')}</label>
                <input
                  type="email"
                  name="user_email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder={t('contact.form.emailPlaceholder')}
                />
                {errors.email && <span className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">{t('contact.form.projectType')}</label>
                <select name="project_type" className={`form-input ${errors.projectType ? 'error' : ''}`}>
                  <option value="">{t('contact.form.selectOption')}</option>
                  <option value="web">{t('contact.form.web')}</option>
                  <option value="mobile">{t('contact.form.mobile')}</option>
                  <option value="design">{t('contact.form.design')}</option>
                  <option value="both">{t('contact.form.both')}</option>
                  <option value="other">{t('contact.form.other')}</option>
                </select>
                {errors.projectType && <span className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.projectType}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder={t('contact.form.messagePlaceholder')}
                ></textarea>
                {errors.message && <span className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
                {loading ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo-container" style={{ marginBottom: '1rem' }}>
                <img src="/bcode-logo.png" alt="BCode Logo" className="logo-image" />
                <span className="brand-name">BCode</span>
              </div>
              <p style={{ color: 'var(--text-muted)' }}>
                {t('footer.description')}
              </p>
              <div className="social-links" style={{ display: 'none' }}>
                <a href="#" className="social-link">𝕏</a>
                <a href="#" className="social-link">in</a>
                <a href="#" className="social-link">f</a>
                <a href="#" className="social-link">📷</a>
              </div>
            </div>

            <div className="footer-section">
              <h3>{t('footer.services')}</h3>
              <ul className="footer-links">
                <li><a href="#services" className="footer-link">{t('services.web.title')}</a></li>
                <li><a href="#services" className="footer-link">{t('services.mobile.title')}</a></li>
                <li><a href="#services" className="footer-link">{t('services.design.title')}</a></li>
                <li><a href="#contact" className="footer-link">Consultoría</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>{t('footer.company')}</h3>
              <ul className="footer-links">
                <li><a href="#about" className="footer-link">{t('footer.aboutUs')}</a></li>
                <li><a href="#history" className="footer-link">{t('footer.ourHistory')}</a></li>
                <li><a href="#faq" className="footer-link">{t('footer.faq')}</a></li>
                <li><a href="#contact" className="footer-link">{t('footer.contact')}</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>{t('footer.locationTitle')}</h3>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">{t('footer.cali')}</a></li>
                <li><a href="#" className="footer-link">{t('footer.usaProjects')}</a></li>
                <li><a href="#" className="footer-link">{t('footer.globalClients')}</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 BCode - Business Software Consulting. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
