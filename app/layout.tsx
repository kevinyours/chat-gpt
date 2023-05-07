import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'ChatGPT',
  description: 'Simple chat application with GPT 3.5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-between w-full min-w-[442px] box-border">
          <div className="mockup-phone">
            <div className="camera" />
            <div className="display">
              <div className="artboard artboard-demo phone-5 overflow-hidden">
                {children}
                <Analytics />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
