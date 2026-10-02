import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground pt-24">
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wider mb-4 break-words" style={{ fontFamily: 'var(--font-playfair)' }}>
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mb-12 max-w-2xl">
              {description}
            </p>
          )}
          {children}
        </section>
      </main>
      <Footer />
    </>
  )
}
