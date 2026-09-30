import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Runs before first paint so the saved theme (or the OS preference) applies without a flash.
const themeScript = `(function(){try{
  var t = localStorage.getItem('theme');
  var d = t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', d);
}catch(e){}})()`;

export const metadata: Metadata = {
  title: 'AI Engineering Notes',
  description:
    "AI enginnering notes created by Praful Raj (Senior AI Engineer). This is the notes created along with the jorney of upgrading from Senior Frontend Engineer to AI Engineer. This notes is divided into different categories according to topics. Each topic contains it's individual note via url. This is created for teaching public, it's intention is to have a personal notes which will be helpfull to revise, define and remember important terminologies, topics, logics and ways",
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html
      lang="en"
      // The theme script sets the `dark` class before React hydrates.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
