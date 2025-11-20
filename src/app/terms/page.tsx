import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | The Gaslight on Main',
  description: 'Terms of Service for The Gaslight on Main. Please read our terms and conditions for using our website and services.',
}

export default function TermsOfServicePage() {
  return (
    <div style={{ backgroundColor: '#171717', minHeight: '100vh' }}>
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8" style={{ color: '#f2f2f2' }}>
            Terms of Service
          </h1>
          
          <div className="space-y-8 text-base leading-relaxed" style={{ color: '#d1d1d1' }}>
            <div>
              <p className="mb-4">
                <strong style={{ color: '#f2f2f2' }}>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                Please read these Terms of Service ("Terms") carefully before using the website gaslightonmain.com (the "Site") operated by The Gaslight on Main ("we," "our," or "us"). By accessing or using our Site, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use our Site.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, or using this Site, you acknowledge that you have read, understood, and agree to be bound by these Terms and to comply with all applicable laws and regulations. If you do not agree with these Terms, you are prohibited from using or accessing this Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                2. Use of the Site
              </h2>
              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                2.1 Permitted Use
              </h3>
              <p className="mb-3">You may use our Site for lawful purposes only. You agree to use the Site:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>In accordance with all applicable laws and regulations</li>
                <li>In a manner that does not infringe upon the rights of others</li>
                <li>To make legitimate reservations and inquiries about our services</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                2.2 Prohibited Activities
              </h3>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Site for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to any portion of the Site or any systems or networks connected to the Site</li>
                <li>Interfere with or disrupt the Site or servers or networks connected to the Site</li>
                <li>Transmit any viruses, malware, or other harmful code</li>
                <li>Collect or store personal data about other users without their consent</li>
                <li>Use automated systems (bots, scrapers, etc.) to access the Site without our express written permission</li>
                <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                3. Reservations and Bookings
              </h2>
              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                3.1 Reservation Policy
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reservations are subject to availability and confirmation by our restaurant.</li>
                <li>We reserve the right to refuse or cancel any reservation at our discretion.</li>
                <li>You must provide accurate and complete information when making a reservation.</li>
                <li>Reservations may be subject to a cancellation policy, which will be communicated at the time of booking.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                3.2 Cancellation and No-Show Policy
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>We require advance notice for cancellations as specified at the time of booking.</li>
                <li>Failure to cancel within the required timeframe or failure to show up for a reservation may result in fees or restrictions on future bookings.</li>
                <li>For special events, private dining, or large parties, specific cancellation policies will apply and will be communicated during the booking process.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                3.3 Modifications
              </h3>
              <p>
                We reserve the right to modify, reschedule, or cancel reservations due to unforeseen circumstances, including but not limited to emergencies, weather, or operational issues. In such cases, we will make reasonable efforts to notify you and accommodate alternative arrangements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                4. Intellectual Property
              </h2>
              <p className="mb-3">
                All content on this Site, including but not limited to text, graphics, logos, images, photographs, menus, and software, is the property of The Gaslight on Main or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site without our prior written consent, except as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
                <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
                <li>You may print or download one copy of a reasonable number of pages of the Site for your own personal, non-commercial use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                5. Disclaimers and Limitations of Liability
              </h2>
              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                5.1 Site Availability
              </h3>
              <p>
                We strive to keep the Site available and functioning properly, but we do not guarantee that the Site will be available at all times or that it will be free from errors, viruses, or other harmful components. We reserve the right to modify, suspend, or discontinue the Site or any part thereof at any time without notice.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                5.2 Accuracy of Information
              </h3>
              <p>
                While we make every effort to ensure the accuracy of information on our Site, including menu items, prices, hours, and availability, we do not warrant that all information is complete, accurate, or current. Prices, menu items, and availability are subject to change without notice.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                5.3 Limitation of Liability
              </h3>
              <p className="mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE GASLIGHT ON MAIN, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use or inability to use the Site</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any interruption or cessation of transmission to or from the Site</li>
                <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Site</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                6. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless The Gaslight on Main, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees and costs, arising out of or in any way connected with your access to or use of the Site, your violation of these Terms, or your violation of any third-party right, including without limitation any intellectual property or privacy right.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                7. Third-Party Links
              </h2>
              <p>
                Our Site may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                8. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of North Carolina, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or the Site shall be subject to the exclusive jurisdiction of the state and federal courts located in Forsyth County, North Carolina.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                9. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Site after any revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                10. Severability
              </h2>
              <p>
                If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Site and supersede and replace any prior agreements we might have between us regarding the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                11. Contact Information
              </h2>
              <p className="mb-3">
                If you have any questions about these Terms of Service, please contact us:
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

