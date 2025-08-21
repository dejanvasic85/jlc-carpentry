import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract the document type from the webhook payload
    const documentType = body._type || body.documentType;

    if (!documentType) {
      return NextResponse.json({ error: 'No document type provided' }, { status: 400 });
    }

    // Revalidate based on document type
    switch (documentType) {
      case 'service':
        revalidateTag('service');
        console.log('Revalidated service pages');
        break;
      case 'siteSettings':
        revalidateTag('siteSettings');
        console.log('Revalidated site settings');
        break;
      case 'homepage':
        revalidateTag('homepage');
        console.log('Revalidated homepage');
        break;
      case 'heroSection':
        revalidateTag('heroSection');
        console.log('Revalidated hero section');
        break;
      case 'statistic':
        revalidateTag('statistic');
        console.log('Revalidated statistics');
        break;
      default:
        console.log(`Unknown document type: ${documentType}`);
        break;
    }

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
