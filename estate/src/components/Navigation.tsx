import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Properties', path: '/properties' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [atTop, setAtTop] = useState(true)
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  const isAdmin = user?.role === 'admin'

  const isHome = location.pathname === '/'

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          setScrolled(currentY > 60)
          setAtTop(currentY < 20)

          if (currentY > 120) {
            setHidden(currentY > lastScrollY && currentY > 200)
          } else {
            setHidden(false)
          }

          setLastScrollY(currentY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleLogout = useCallback(() => {
    logout()
    setMobileOpen(false)
  }, [logout])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !mobileOpen
            ? '-translate-y-full opacity-0'
            : 'translate-y-0 opacity-100'
        }`}
        style={{
          background: scrolled || !isHome
            ? 'rgba(255, 255, 255, 0.82)'
            : 'transparent',
          backdropFilter: scrolled || !isHome ? 'blur(20px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled || !isHome ? 'blur(20px) saturate(140%)' : 'none',
          borderBottom: scrolled || !isHome
            ? '1px solid rgba(0, 0, 0, 0.06)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0, 0, 0, 0.04)'
            : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              className={`font-body text-[14px] font-medium uppercase tracking-[3px] transition-colors duration-300 cursor-hover ${
                atTop && isHome && !scrolled ? 'text-white' : 'text-black'
              } hover:opacity-70`}
            >
              SHAY TROTSKY
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-body text-[14px] tracking-[0.5px] transition-all duration-300 link-underline cursor-hover ${
                    location.pathname === link.path
                      ? 'text-[#ff7a1a]'
                      : atTop && isHome && !scrolled
                        ? 'text-white/80 hover:text-white'
                        : 'text-black/70 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`font-body text-[14px] tracking-[0.5px] transition-all duration-300 link-underline cursor-hover ${
                    location.pathname === '/admin'
                      ? 'text-[#ff7a1a]'
                      : atTop && isHome && !scrolled
                        ? 'text-white/80 hover:text-white'
                        : 'text-black/70 hover:text-black'
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Phone number */}
              <a
                href="tel:+972501234567"
                className={`flex items-center gap-1.5 font-body text-[12px] tracking-[0.5px] transition-all duration-300 cursor-hover ${
                  atTop && isHome && !scrolled
                    ? 'text-white/70 hover:text-white'
                    : 'text-[#4d4d4d] hover:text-[#ff7a1a]'
                }`}
              >
                <Phone size={12} />
                <span className="hidden lg:inline">+972-50-123-4567</span>
              </a>

              <div className={`w-px h-4 ${atTop && isHome && !scrolled ? 'bg-white/20' : 'bg-black/10'}`} />

              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className={`text-sm transition-colors duration-300 ${
                    atTop && isHome && !scrolled ? 'text-white/70' : 'text-gray-600'
                  }`}>
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className={`text-sm transition-colors duration-300 cursor-hover ${
                      atTop && isHome && !scrolled
                        ? 'text-white/60 hover:text-white'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-orange text-[12px] py-2.5 px-6 cursor-hover"
                >
                  Subscribe
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 transition-colors duration-300 cursor-hover ${
                atTop && isHome && !scrolled && !mobileOpen
                  ? 'text-white'
                  : 'text-black'
              }`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#efe7da]"
          style={{
            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
          }}
        />
        <div
          className="relative h-full flex flex-col items-center justify-center gap-6"
          style={{
            transition: 'opacity 0.4s ease, transform 0.5s ease',
            transitionDelay: mobileOpen ? '0.2s' : '0s',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-display text-[36px] text-black hover:text-[#ff7a1a] transition-colors duration-300"
              style={{
                transitionDelay: mobileOpen ? `${0.1 + i * 0.05}s` : '0s',
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="font-display text-[36px] text-black hover:text-[#ff7a1a] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="font-display text-[36px] text-black hover:text-[#ff7a1a] transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="font-display text-[36px] text-black hover:text-[#ff7a1a] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          )}
          {/* Mobile contact */}
          <div className="mt-6 flex items-center gap-3">
            <a href="tel:+972501234567" className="flex items-center gap-2 font-body text-[14px] text-[#4d4d4d] hover:text-[#ff7a1a] transition-colors">
              <Phone size={14} /> +972-50-123-4567
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/972501234567?text=Hi%2C%20I%27m%20interested%20in%20properties%20in%20Netanya"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.553 4.112 1.52 5.84L.057 23.64l5.948-1.563A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.907 0-3.722-.498-5.336-1.438l-.383-.228-3.964 1.04 1.058-3.865-.25-.397A9.798 9.798 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818S21.818 6.58 21.818 12s-4.398 9.818-9.818 9.818z"/>
        </svg>
      </a>
    </>
  )
}
