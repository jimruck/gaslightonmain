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

    // TODO: Integrate with CRM or email service for production
    // Options:
    // 1. Send to CRM (HubSpot, Salesforce, etc.) via webhook
    // 2. Send email notification using service like Resend, SendGrid, or AWS SES
    // 3. Store in database for later processing
    // 
    // Example CRM integration (uncomment and configure):
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

    const crmResponse = await fetch(process.env.CRM_WEBHOOK_URL!, {
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
    */

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
