# Google Analytics Setup Guide

This guide explains how to set up Google Analytics 4 (GA4) through Google Tag Manager (GTM) for the JLC Carpentry website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Configuration](#configuration)
4. [Testing & Validation](#testing--validation)
5. [Development Considerations](#development-considerations)
6. [Custom Events](#custom-events)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

1. **Google Analytics 4 Account** - Create at [analytics.google.com](https://analytics.google.com)
2. **Google Tag Manager Account** - Create at [tagmanager.google.com](https://tagmanager.google.com)
3. **Access to Sanity Studio** - For configuring tracking IDs

## Initial Setup

### Step 1: Set up Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property for your website
3. **Enhanced Measurement**: When prompted, enable the checkbox for "Automatically measure interactions and content" - this provides valuable insights for carpentry business websites including:
   - Scroll tracking (90% page depth)
   - Outbound link clicks (to suppliers, social media)
   - File downloads (PDFs, brochures)
   - Video engagement (project videos)
   - Form interactions (contact forms)
4. Note down your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Set up Google Tag Manager

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create a new container for your website
3. Note down your **GTM ID** (format: `GTM-XXXXXXX`)

## Configuration

### Step 3: Configure GTM ID in Sanity

The GTM ID is now managed through the Sanity CMS instead of environment variables for easier content management.

1. **Access Sanity Studio**:
   - Go to your Sanity Studio (usually at `/studio` or your configured studio URL)
   - Navigate to **Site Settings**

2. **Configure Analytics Settings**:
   - In the Site Settings document, find the **Analytics & Tracking** section
   - Enter your **Google Tag Manager ID** in the format `GTM-XXXXXXX`
   - Optionally, you can also add your **GA4 Measurement ID** (format: `G-XXXXXXXXXX`)

3. **Fallback Support**:
   - The system will use the GTM ID from Sanity first
   - If not set in Sanity, it will fall back to the `NEXT_PUBLIC_GTM_ID` environment variable
   - This allows for flexible deployment configurations

### Benefits of Sanity-based Configuration

- **Content Manager Control**: Non-technical users can update tracking IDs
- **Environment Flexibility**: Different tracking IDs for staging/production
- **No Code Deployment**: Changes don't require rebuilding the application
- **Audit Trail**: Changes are tracked in Sanity's revision history

### Step 4: Configure GA4 in Google Tag Manager

#### Create GA4 Configuration Tag

1. In GTM, go to **Tags** → **New**
2. **Tag Configuration**: Choose "Google Analytics: GA4 Configuration"
3. **Measurement ID**: Enter your GA4 Measurement ID (`G-XXXXXXXXXX`)
4. **Triggering**: Choose "All Pages"
5. **Name**: "GA4 Configuration"
6. Save the tag

#### Create GA4 Event Tag (Optional)

1. In GTM, go to **Tags** → **New**
2. **Tag Configuration**: Choose "Google Analytics: GA4 Event"
3. **Configuration Tag**: Select the GA4 Configuration tag created above
4. **Event Name**: Use `{{Event}}` variable
5. **Event Parameters**: Configure as needed
6. **Triggering**: Choose "All Custom Events"
7. **Name**: "GA4 Event"
8. Save the tag

## Testing & Validation

### Step 5: Test Your Setup

#### Preview Mode in GTM

1. In GTM, click **Preview**
2. Enter your website URL (production or staging)
3. Navigate through your site to test tag firing
4. Verify events are appearing in the GTM preview panel

#### Real-time Reports in GA4

1. Go to your GA4 property
2. Navigate to **Reports** → **Realtime**
3. Visit your website and verify events appear within 30 seconds

#### GTM Debug Console

1. With Preview mode active, check the GTM debug console
2. Verify all configured tags are firing correctly
3. Check for any error messages or failed tags

## Development Considerations

### Localhost Development Behavior

When running GTM on localhost (`http://localhost:3000`), be aware that:

#### ✅ What Works
- **GTM Script Loads** - The GTM container loads normally
- **Tags Fire** - All configured tags will attempt to execute
- **Events Trigger** - Custom events from your code are sent to the data layer
- **Preview Mode** - GTM Preview mode works with localhost URLs

#### ⚠️ Potential Issues
- **Data Pollution** - Development activity appears in your production analytics
- **Hostname Data** - Analytics will show `localhost:3000` as the source
- **CORS Restrictions** - Some third-party tags may not work on localhost
- **Mixed Data** - Development and production data get combined

#### 🔍 Debugging Tools

**Browser Console Inspection:**
```javascript
// Check data layer contents
console.log(window.dataLayer);

// Monitor new events
window.dataLayer.push = function(data) {
  console.log('GTM Event:', data);
  Array.prototype.push.call(this, data);
};
```

**Network Tab Monitoring:**
- Look for requests to `googletagmanager.com`
- Verify GA4 events being sent to `google-analytics.com`

### Best Practices for Development

#### Option 1: Separate GTM Containers
Create different containers for each environment:
- **Development**: `GTM-DEV1234` (points to test GA4 property)
- **Production**: `GTM-PROD5678` (points to live GA4 property)

Configure in Sanity Studio:
- Development site settings use development GTM ID
- Production site settings use production GTM ID

#### Option 2: Environment-Based Loading
Conditionally load GTM based on environment:

```typescript
// In layout.tsx - only load GTM in production
const shouldLoadGTM = process.env.NODE_ENV === 'production' || 
                     process.env.ENABLE_GTM === 'true';
const finalGtmId = shouldLoadGTM ? gtmId : undefined;
```

Add to your `.env.local` for development testing:
```
ENABLE_GTM=true
```

#### Option 3: GTM Preview Mode Only
For development, use GTM Preview mode instead of live tracking:
1. Don't set GTM ID in development Sanity settings
2. Use GTM Preview mode to connect to localhost when testing
3. This prevents data pollution while allowing full testing

### Recommended Development Workflow

1. **Initial Setup**: Use GTM Preview mode with localhost
2. **Feature Testing**: Create separate development GTM container
3. **Pre-deployment**: Test with staging environment using production GTM
4. **Production**: Monitor real-time reports after deployment

## Custom Events
3. Navigate through your website
4. Verify that tags are firing correctly

### Real-time Reports

1. Go to Google Analytics
2. Navigate to **Reports** → **Realtime**
3. Visit your website in another tab
4. Verify that page views appear in real-time

## Step 6: Publish GTM Container

1. In GTM, click **Submit**
2. Add a version name and description
3. Click **Publish**

## Custom Events Implemented

The website automatically tracks the following events:

### Lead Generation Events
- `contact_dialog_open` - When contact form opens
- `form_submit` - When contact form is submitted
- `contact_attempt` - Successful form submissions

### Service Engagement Events
- `service_interaction` - When users view service pages
- `page_view` - Custom page view tracking for service pages

### Portfolio Engagement Events
- `project_view` - When users view project galleries (ready for implementation)

## GTM Data Layer Events

The implementation pushes events to the GTM Data Layer that you can use to create additional tags:

```javascript
// Example events being sent:
dataLayer.push({
  event: 'contact_dialog_open',
  category: 'lead_generation',
  action: 'dialog_open'
});

dataLayer.push({
  event: 'service_interaction',
  service_name: 'Decking',
  action: 'view',
  category: 'carpentry_services'
});
```

## GDPR Compliance Considerations

For Australian businesses, consider implementing:

1. **Cookie Consent Banner** - Use GTM's consent mode
2. **Privacy Policy** - Update to include analytics tracking
3. **Data Retention** - Configure in GA4 settings

## Recommended GA4 Goals & Conversions

Set up these conversions in GA4:

1. **Contact Form Submission** - Event name: `form_submit`
2. **Phone Call Clicks** - Event name: `contact_attempt` with method: `phone`
3. **Service Page Engagement** - Event name: `service_interaction`

## Advanced Tracking Options

You can extend tracking by using the provided `gtag` utility:

```typescript
import { gtag } from '@/components/GoogleTagManager';

// Track custom events
gtag.event('custom_event_name', {
  custom_parameter: 'value',
  category: 'custom_category'
});

// Track conversions with values
gtag.conversion('quote_request', 500, 'AUD');
```

## Troubleshooting

### GTM Not Loading
- Verify `NEXT_PUBLIC_GTM_ID` is correctly set
- Check browser console for JavaScript errors
- Ensure GTM container is published

### Events Not Firing
- Use GTM Preview mode to debug
- Check that dataLayer events are being pushed
- Verify trigger conditions in GTM

### GA4 Data Not Appearing
- Allow 24-48 hours for data to appear in standard reports
- Use Real-time reports for immediate verification
- Check that GA4 configuration tag is firing on all pages

## Support

## Custom Events

The application includes several pre-built custom events for tracking carpentry business activities:

### Available Event Functions

```typescript
import { gtag } from '@/components/GoogleTagManager';

// Track service page views
gtag.trackService('kitchen-renovations', 'view');

// Track contact form submissions
gtag.trackContact('form'); // or 'phone', 'email'

// Track project gallery interactions
gtag.trackProjectView('Brisbane Kitchen Renovation');

// Track general conversions
gtag.conversion('quote_request', 500, 'AUD');

// Send custom events
gtag.event('custom_action', {
  category: 'engagement',
  value: 1
});
```

### Carpentry-Specific Events

1. **Service Interactions** - Track which services users are most interested in
2. **Contact Attempts** - Monitor lead generation effectiveness
3. **Project Views** - Understand portfolio engagement
4. **Form Submissions** - Track quote requests and inquiries

### Implementation Example

```typescript
// In a contact form component
const handleSubmit = async (formData) => {
  try {
    await submitForm(formData);
    gtag.trackContact('form');
    gtag.conversion('contact_form_submit');
  } catch (error) {
    // Handle error
  }
};
```

## Troubleshooting

### Common Issues

#### GTM Not Loading
- Check GTM ID format in Sanity Studio (should be `GTM-XXXXXXX`)
- Verify Sanity Studio data is published
- Check browser console for JavaScript errors

#### Events Not Firing
- Use GTM Preview mode to debug
- Check `window.dataLayer` in browser console
- Verify event names match GTM trigger configuration

#### Data Not Appearing in GA4
- Check GTM tags are configured correctly
- Verify GA4 Measurement ID is correct
- Allow up to 24 hours for data to appear in standard reports
- Use Real-time reports for immediate verification

#### Development Data Pollution
- Implement environment-based GTM loading
- Use separate GTM containers for development
- Filter out localhost traffic in GA4 views

### Debug Commands

```javascript
// Check if GTM is loaded
console.log(window.google_tag_manager);

// View data layer
console.log(window.dataLayer);

// Manual event testing
window.dataLayer.push({
  event: 'test_event',
  custom_parameter: 'test_value'
});
```

For issues specific to this implementation, check the browser console for any JavaScript errors related to GTM or analytics tracking.