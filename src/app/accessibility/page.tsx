import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement | The Gaslight on Main',
  description: 'The Gaslight on Main is committed to ensuring accessibility for all guests. Learn about our accessibility features and accommodations.',
}

export default function AccessibilityPage() {
  return (
    <div style={{ backgroundColor: '#171717', minHeight: '100vh' }}>
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8" style={{ color: '#f2f2f2' }}>
            Accessibility Statement
          </h1>
          
          <div className="space-y-8 text-base leading-relaxed" style={{ color: '#d1d1d1' }}>
            <div>
              <p className="mb-4">
                <strong style={{ color: '#f2f2f2' }}>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                The Gaslight on Main is committed to ensuring that our restaurant and website are accessible to all individuals, including those with disabilities. We strive to provide an inclusive dining experience and continuously work to improve accessibility in all aspects of our operations.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Our Commitment
              </h2>
              <p>
                We are dedicated to providing equal access to our services and facilities for all guests. We believe that everyone should be able to enjoy our dining experience, and we are committed to making reasonable accommodations to ensure accessibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Physical Accessibility
              </h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                Entrance and Access
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wheelchair accessible entrance with appropriate door width</li>
                <li>Accessible parking available nearby</li>
                <li>Level or ramped access to the main entrance</li>
                <li>Automatic or easy-to-open doors where possible</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                Dining Area
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wheelchair accessible tables and seating areas</li>
                <li>Adequate space between tables for wheelchair navigation</li>
                <li>Accessible pathways throughout the dining room</li>
                <li>Tables at various heights to accommodate different needs</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                Restroom Facilities
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accessible restroom facilities with appropriate clearances</li>
                <li>Grab bars and accessible fixtures</li>
                <li>Proper signage indicating accessible facilities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Service Accommodations
              </h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                Menu Accessibility
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Large print menus available upon request</li>
                <li>Staff available to read menu items and descriptions</li>
                <li>Digital menus accessible on mobile devices</li>
                <li>Allergen and dietary information available</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                Staff Assistance
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our staff is trained to assist guests with disabilities</li>
                <li>We can accommodate special seating requests</li>
                <li>Assistance with menu navigation and ordering</li>
                <li>Support for guests with dietary restrictions and allergies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#f2f2f2' }}>
                Service Animals
              </h3>
              <p>
                Service animals are welcome in our restaurant in accordance with the Americans with Disabilities Act (ADA). We ask that service animals remain under the control of their handler at all times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Website Accessibility
              </h2>
              <p className="mb-3">
                We are committed to making our website accessible to all users. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Our efforts include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing alternative text for images</li>
                <li>Ensuring proper heading structure and navigation</li>
                <li>Maintaining sufficient color contrast</li>
                <li>Making content keyboard accessible</li>
                <li>Providing clear and descriptive link text</li>
                <li>Ensuring forms are accessible and properly labeled</li>
              </ul>
              <p className="mt-4">
                We regularly review and update our website to improve accessibility. However, we recognize that some areas may need improvement, and we welcome feedback from users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Ongoing Improvements
              </h2>
              <p>
                Accessibility is an ongoing effort, and we are continuously working to improve our facilities, services, and website. We regularly review our accessibility practices and make updates as needed. We also welcome feedback from our guests to help us identify areas for improvement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Special Accommodations
              </h2>
              <p className="mb-3">
                If you have specific accessibility needs or require special accommodations, please contact us in advance of your visit. We will do our best to accommodate your needs and ensure you have an enjoyable dining experience. Some accommodations we can provide include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reserved accessible seating</li>
                <li>Assistance with menu selection for dietary restrictions</li>
                <li>Special arrangements for large groups with accessibility needs</li>
                <li>Quieter seating areas for guests sensitive to noise</li>
                <li>Assistance with transportation or parking information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Feedback and Concerns
              </h2>
              <p className="mb-3">
                We value feedback from our guests regarding accessibility. If you encounter any barriers to access or have suggestions for improvement, please contact us:
              </p>
              <div className="bg-gray-medium p-6 rounded-lg" style={{ border: '1px solid #404040' }}>
                <p className="mb-2"><strong style={{ color: '#f2f2f2' }}>The Gaslight on Main</strong></p>
                <p className="mb-2">126 S Main Street, Suite G</p>
                <p className="mb-2">Kernersville, NC 27284</p>
                <p className="mb-2">Phone: <a href="tel:+13364974025" className="underline hover:opacity-80" style={{ color: '#CCBB98' }}>(336) 497-4025</a></p>
                <p>Email: <a href="mailto:eat@thegaslightonmain.com" className="underline hover:opacity-80" style={{ color: '#CCBB98' }}>eat@thegaslightonmain.com</a></p>
              </div>
              <p className="mt-4">
                We will respond to accessibility concerns within a reasonable timeframe and work to address any issues promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Third-Party Services
              </h2>
              <p>
                Our website may include links to third-party services, such as reservation systems or payment processors. While we strive to work with accessible service providers, we cannot guarantee the accessibility of all third-party services. If you encounter accessibility issues with third-party services, please contact us, and we will work to find alternative solutions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Compliance
              </h2>
              <p>
                The Gaslight on Main is committed to complying with the Americans with Disabilities Act (ADA) and other applicable accessibility laws and regulations. We strive to meet or exceed accessibility standards to ensure all guests can enjoy our restaurant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#f2f2f2' }}>
                Updates to This Statement
              </h2>
              <p>
                We may update this Accessibility Statement from time to time to reflect changes in our practices, facilities, or applicable laws. We encourage you to review this statement periodically. The "Last Updated" date at the top of this page indicates when the statement was last revised.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

