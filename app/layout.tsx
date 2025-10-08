import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Schouw Agent - AI-gestuurde schouwrapportage',
  description: 'Professionele schouwrapportage voor Liander en Vitens met AI-analyse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="schouw-header">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">Schouw Agent</h1>
                  <span className="ml-3 text-blue-200 text-sm">
                    AI-gestuurde schouwrapportage
                  </span>
                </div>
                <nav className="flex space-x-4">
                  <a href="/" className="text-white hover:text-blue-200 transition-colors">
                    Dashboard
                  </a>
                  <a href="/projects/new" className="text-white hover:text-blue-200 transition-colors">
                    Nieuw Project
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          
          <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-gray-300">
                  Schouw Agent - Professionele schouwrapportage voor Nederlandse nutsvoorzieningen
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Gebaseerd op actuele eisen van Liander en Vitens
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
