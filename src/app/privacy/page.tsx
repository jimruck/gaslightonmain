import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | The Gaslight on Main',
  description: 'Privacy Policy for The Gaslight on Main. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: '#171717', minHeight: '100vh' }}>
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8" style={{ color: '#f2f2f2' }}>
            Privacy Policy
          </h1>
          
          <div className="space-y-8 text-base leading-relaxed" style={{ color: '#d1d1d1' }}>
            <div>
              <p className="mb-4">
                <strong style={{ color: '#f2f2f2' }}>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                The Gaslight on Main ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website gaslightonmain.com (the "Site") and use our services.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                1. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                1.1 Information You Provide to Us
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong style={{ color: '#f2f2f2' }}>Reservation Information:</strong> When you make a reservation, we collect your name, phone number, email address, party size, date and time preferences, and any special requests or dietary restrictions.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Newsletter Subscriptions:</strong> If you subscribe to our newsletter, we collect your email address and name.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Contact Forms:</strong> When you contact us through our website, we collect your name, email address, phone number, and the content of your message.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Event Bookings:</strong> When you book an event or private dining experience, we collect additional information such as event details, guest count, and special requirements.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                1.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong style={{ color: '#f2f2f2' }}>Usage Data:</strong> We automatically collect information about how you interact with our Site, including your IP address, browser type, device information, pages visited, time spent on pages, and referring website addresses.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to enhance your experience, analyze Site usage, and assist in marketing efforts. You can control cookie preferences through your browser settings.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                2. How We Use Your Information
              </h2>
              <p className="mb-3">We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process and manage your reservations and event bookings</li>
                <li>To communicate with you about your reservations, events, or inquiries</li>
                <li>To send you newsletters, promotional materials, and updates about our restaurant (with your consent)</li>
                <li>To improve our website, services, and customer experience</li>
                <li>To analyze website usage and trends</li>
                <li>To comply with legal obligations and protect our rights</li>
                <li>To respond to your questions and provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                3. Information Sharing and Disclosure
              </h2>
              <p className="mb-3">We do not sell your personal information. We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong style={{ color: '#f2f2f2' }}>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as reservation management systems, email marketing platforms, and website hosting services.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Legal Requirements:</strong> We may disclose information if required by law, court order, or government regulation, or to protect our rights, property, or safety, or that of our customers or others.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong style={{ color: '#f2f2f2' }}>With Your Consent:</strong> We may share your information with your explicit consent or at your direction.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                4. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                5. Your Rights and Choices
              </h2>
              <p className="mb-3">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong style={{ color: '#f2f2f2' }}>Access:</strong> You can request access to the personal information we hold about you.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Deletion:</strong> You can request that we delete your personal information, subject to certain legal exceptions.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Opt-Out:</strong> You can unsubscribe from our marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.</li>
                <li><strong style={{ color: '#f2f2f2' }}>Cookie Preferences:</strong> You can manage cookie preferences through your browser settings.</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <a href="mailto:eat@thegaslightonmain.com" className="underline hover:opacity-80" style={{ color: '#CCBB98' }}>eat@thegaslightonmain.com</a> or call us at <a href="tel:+13364974025" className="underline hover:opacity-80" style={{ color: '#CCBB98' }}>(336) 497-4025</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                6. Third-Party Links and Services
              </h2>
              <p>
                Our Site may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party websites or services you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                7. Children's Privacy
              </h2>
              <p>
                Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately so we can delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                8. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                9. Contact Us
              </h2>
              <p className="mb-3">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-medium p-6 rounded-lg" style={{ border: '1px solid #404040' }}>
                <p className="mb-2"><strong style={{ color: '#f2f2f2' }}>The Gaslight on Main</strong></p>
                <p className="mb-2">126 S Main Street, Suite G</p>
                <p className="mb-2">Kernersville, NC 27284</p>
                <p className="mb-2">Phone: <a href="tel:+13364974025" className="underline hover:opacity-80" style={{ color: '#CCBB98' }}>(336) 497-4025</a></p>
                <p>Email: <a href="mailto:eat@thegaslightonmain.com" className="underline hover:opacity-80" style={{ color: '#CCBB98' }}>eat@thegaslightonmain.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

