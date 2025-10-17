import { NextRequest, NextResponse } from 'next/server'

interface MailchimpMember {
  email_address: string
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending'
}

interface MailchimpResponse {
  id: string
  email_address: string
  status: string
  merge_fields: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Get environment variables
    const apiKey = process.env.MAILCHIMP_API_KEY
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

    if (!apiKey || !serverPrefix || !audienceId) {
      console.error('Missing Mailchimp environment variables')
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      )
    }

    // Prepare member data
    const memberData: MailchimpMember = {
      email_address: email,
      status: 'pending', // Double opt-in
    }

    // Mailchimp API endpoint
    const mailchimpUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`

    // Create or update member
    const response = await fetch(mailchimpUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    })

    const responseData = await response.json()

    if (!response.ok) {
      // Handle specific Mailchimp errors
      if (responseData.title === 'Member Exists') {
        return NextResponse.json(
          { 
            success: true, 
            message: 'You are already subscribed to our newsletter!',
            alreadySubscribed: true 
          },
          { status: 200 }
        )
      }

      console.error('Mailchimp API error:', responseData)
      return NextResponse.json(
        { 
          error: 'Failed to subscribe to newsletter',
          details: responseData.detail || 'Unknown error'
        },
        { status: response.status }
      )
    }

    // Success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for subscribing! Please check your email to confirm your subscription.',
        memberId: responseData.id
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}
