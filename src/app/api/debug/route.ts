import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const envVars = {
      AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID ? 'SET' : 'NOT SET',
      AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY ? 'SET' : 'NOT SET',
      AIRTABLE_MENU_TABLE: process.env.AIRTABLE_MENU_TABLE ? 'SET' : 'NOT SET',
      AIRTABLE_EVENTS_TABLE: process.env.AIRTABLE_EVENTS_TABLE ? 'SET' : 'NOT SET',
      MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY ? 'SET' : 'NOT SET',
      MAILCHIMP_SERVER_PREFIX: process.env.MAILCHIMP_SERVER_PREFIX ? 'SET' : 'NOT SET',
      MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID ? 'SET' : 'NOT SET',
    }

    return NextResponse.json({
      environment: process.env.NODE_ENV,
      envVars,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Debug error',
      details: error?.message || 'Unknown error'
    }, { status: 500 })
  }
}
