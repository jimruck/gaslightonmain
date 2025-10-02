import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, topic, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !topic || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // In a real implementation, you would:
    // 1. Send the data to your CRM (HubSpot, Salesforce, etc.)
    // 2. Send confirmation emails
    // 3. Store in database
    // 4. Send notifications to restaurant staff

    // Example CRM integration (uncomment and configure as needed):
    /*
    const crmData = {
      firstName,
      lastName,
      email,
      phone,
      topic,
      message,
      source: 'website_contact_form',
      timestamp: new Date().toISOString(),
    }

    // Send to CRM
    const crmResponse = await fetch('YOUR_CRM_WEBHOOK_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRM_API_KEY}`,
      },
      body: JSON.stringify(crmData),
    })

    if (!crmResponse.ok) {
      throw new Error('Failed to send to CRM')
    }

    // Send email notification to restaurant
    const emailResponse = await fetch('/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'info@gaslightonmain.com',
        subject: `New Contact Form Submission: ${topic}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Topic:</strong> ${topic}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
      }),
    })
    */

    // For now, just log the submission (remove in production)
    console.log('Contact form submission:', {
      firstName,
      lastName,
      email,
      phone,
      topic,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
