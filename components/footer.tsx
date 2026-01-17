// Footer component with social links and information
"use client"

import Link from "next/link"
import { theme } from "@/lib/theme"
import { useLanguage } from "@/hooks/useLanguage"
import { Instagram, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  // Social media links - Replace with actual URLs
  const socials = [
    { name: "Instagram", url: "https://instagram.com", icon: Instagram },
    { name: "Email", url: "mailto:hello@example.com", icon: Mail },
    { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
  ]

  return (
    <footer
      style={{
        backgroundColor: theme.colors.neutral.bg,
        borderTop: `1px solid ${theme.colors.neutral.border}`,
      }}
      className="py-12 mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2 tracking-wider" style={{ color: theme.colors.accent.orange }}>
              DVSY
            </h3>
            <p className="text-sm" style={{ color: theme.colors.neutral.textSecondary }}>
              Premium photography and videography portfolio
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: theme.colors.neutral.text }}
            >
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Works", href: "/works" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ color: theme.colors.neutral.textSecondary }}
                  className="text-sm hover:opacity-70 transition-opacity inline-block"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: theme.colors.neutral.text }}
            >
              {t.footer.followUs}
            </h4>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.colors.accent.orange }}
                  className="hover:opacity-70 transition-opacity inline-flex items-center justify-center w-8 h-8"
                  aria-label={social.name}
                  onClick={(e) => e.stopPropagation()}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="pt-8 border-t text-center text-sm"
          style={{ borderColor: theme.colors.neutral.border, color: theme.colors.neutral.textSecondary }}
        >
          <p>© 2025 DVSY. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
