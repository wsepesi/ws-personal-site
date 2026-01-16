import { Metadata } from 'next';
import SiteBase from '@/components/SiteBase';
import { ContactForm } from '@/components/contact-form';
import { SITE_URL } from '@/lib/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with William Sepesi.',
  openGraph: {
    title: 'Contact | William [dot] Computer',
    description: 'Get in touch with William Sepesi.',
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <SiteBase title="Contact">
      <div className="max-w-xl">
        <p className="mb-6">
          The best way to reach me is via email at{' '}
          <Link
            href="mailto:hello@william.computer"
            className="underline hover:italic"
          >
            hello@william.computer
          </Link>
          . You can also use the form below.
        </p>
        <ContactForm />
      </div>
    </SiteBase>
  );
}
