import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    revalidateTag('content');

    // Extract the document type from the webhook payload
    const documentType = body._type || body.documentType;

    if (!documentType) {
      return NextResponse.json({ error: 'No document type provided' }, { status: 400 });
    }

    revalidateTag(documentType);

    return NextResponse.json({
      revalidated: true,
      documentType,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// Optional: Add GET endpoint for manual testing
export async function GET() {
  return NextResponse.json({
    message: 'Revalidation API is working',
    endpoint: '/api/revalidate',
    method: 'POST',
    expectedPayload: {
      _type: 'service | siteSettings | homepage | heroSection | statistic',
    },
  });
}
