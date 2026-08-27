# Google Analytics Setup Guide

This guide shows you how to set up Google Analytics 4 (GA4) through Google Tag Manager (GTM) for the JLC Carpentry website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Configuration](#configuration)
4. [Testing & Validation](#testing--validation)
5. [Development Considerations](#development-considerations)
6. [Custom Events](#custom-events)
7. [GDPR Compliance Considerations](#gdpr-compliance-considerations)
8. [Recommended GA4 Goals & Conversions](#recommended-ga4-goals--conversions)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you start, make sure you have:

1. **A Google Analytics 4 account** — create one at [analytics.google.com](https://analytics.google.com)
2. **A Google Tag Manager account** — create one at [tagmanager.google.com](https://tagmanager.google.com)
3. **Access to Sanity Studio** — you'll use it to configure tracking IDs

## Initial Setup

### Step 1: Set up Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property for your website
3. **Enhanced Measurement**: when prompted, enable "Automatically measure interactions and content". For a carpentry business, this tracks:
   - Scroll depth (90% of the page)
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

### Step 3: Configure the GTM ID in Sanity

Sanity CMS manages the GTM ID, not environment variables, so anyone with Studio access can update it.

1. **Open Sanity Studio**:
   - Go to your Sanity Studio (usually at `/studio` or your configured studio URL)
   - Navigate to **Site Settings**

2. **Set the analytics settings**:
   - In the Site Settings document, find the **Analytics & Tracking** section
   - Enter your **Google Tag Manager ID** in the format `GTM-XXXXXXX`
   - Optionally, add your **GA4 Measurement ID** (format: `G-XXXXXXXXXX`)

3. **How the fallback works**:
   - The site uses the GTM ID from Sanity first
   - If Sanity has no GTM ID set, it falls back to the `NEXT_PUBLIC_GTM_ID` environment variable
   - This lets you use different tracking IDs per deployment

**Why configure this in Sanity instead of environment variables?**

- Non-technical content managers can update tracking IDs
- Staging and production can use different tracking IDs
- Changes take effect without a code deployment
- Sanity's revision history tracks every change

### Step 4: Configure GA4 in Google Tag Manager

#### Create the GA4 Configuration tag

1. In GTM, go to **Tags** → **New**
2. **Tag Configuration**: choose "Google Analytics: GA4 Configuration"
3. **Measurement ID**: enter your GA4 Measurement ID (`G-XXXXXXXXXX`)
4. **Triggering**: choose "All Pages"
5. **Name**: "GA4 Configuration"
6. Save the tag

#### Create a GA4 Event tag (optional)

1. In GTM, go to **Tags** → **New**
2. **Tag Configuration**: choose "Google Analytics: GA4 Event"
3. **Configuration Tag**: select the GA4 Configuration tag you created above
4. **Event Name**: use the `{{Event}}` variable
5. **Event Parameters**: configure as needed
6. **Triggering**: choose "All Custom Events"
7. **Name**: "GA4 Event"
8. Save the tag

## Testing & Validation

### Step 5: Test your setup

**Preview mode in GTM:**

1. In GTM, click **Preview**
2. Enter your website URL (production or staging)
3. Navigate through your site to test tag firing
4. Confirm events appear in the GTM preview panel

**Real-time reports in GA4:**

1. Go to your GA4 property
2. Navigate to **Reports** → **Realtime**
3. Visit your website in another tab
4. Confirm page views and events appear within 30 seconds

**GTM debug console:**

1. With Preview mode active, open the GTM debug console
2. Confirm every configured tag fires correctly
3. Check for error messages or failed tags

### Step 6: Publish the GTM container

1. In GTM, click **Submit**
2. Add a version name and description
3. Click **Publish**

## Development Considerations

### Localhost behavior

When you run GTM on localhost (`http://localhost:3000`), keep this in mind:

**What works:**

- The GTM script loads normally
- All configured tags attempt to fire
- Custom events from your code reach the data layer
- GTM Preview mode works with localhost URLs

**What to watch for:**

- Development activity shows up in your production analytics
- Analytics shows `localhost:3000` as the source
- CORS may block some third-party tags on localhost
- Development and production data get mixed together

**Debugging tools:**

Browser console:

```javascript
// Check data layer contents
console.log(window.dataLayer);

// Monitor new events
window.dataLayer.push = function (data) {
  console.log('GTM Event:', data);
  Array.prototype.push.call(this, data);
};
```

Network tab:

- Look for requests to `googletagmanager.com`
- Confirm GA4 events go to `google-analytics.com`

### Best practices for development

Pick one of these approaches to avoid mixing development and production data:

1. **Separate GTM containers** — create one container per environment (e.g. `GTM-DEV1234` pointing to a test GA4 property, `GTM-PROD5678` pointing to the live one), and set the matching ID in each environment's Sanity site settings.
2. **Environment-based loading** — only load GTM when it's safe to track:

   ```typescript
   // In layout.tsx - only load GTM in production
   const shouldLoadGTM = process.env.NODE_ENV === 'production' || process.env.ENABLE_GTM === 'true';
   const finalGtmId = shouldLoadGTM ? gtmId : undefined;
   ```

   Add to `.env.local` to enable it locally for testing:

   ```
   ENABLE_GTM=true
   ```

3. **GTM Preview mode only** — don't set a GTM ID in your development Sanity settings, and use GTM Preview mode to connect to localhost when you need to test. This avoids data pollution entirely.

**Recommended workflow:**

1. **Initial setup**: use GTM Preview mode with localhost
2. **Feature testing**: use a separate development GTM container
3. **Pre-deployment**: test with the staging environment using the production GTM container
4. **Production**: monitor real-time reports after each deployment

## Custom Events

The website tracks these events automatically:

**Lead generation events:**

- `contact_dialog_open` — the contact form opens
- `form_submit` — the contact form is submitted
- `contact_attempt` — a form or phone contact attempt succeeds

**Service engagement events:**

- `service_interaction` — a user views a service page
- `page_view` — custom page view tracking for service pages

**Portfolio engagement events:**

- `project_view` — a user views a project gallery (ready for implementation)

### Available event helper functions

Use the `gtag` utility from `@/components/GoogleTagManager` to send events:

```typescript
import { gtag } from '@/components/GoogleTagManager';

// Track a service page view
gtag.trackService('kitchen-renovations', 'view');

// Track a contact attempt
gtag.trackContact('form'); // or 'phone', 'email'

// Track a project gallery view
gtag.trackProjectView('Brisbane Kitchen Renovation');

// Track a conversion, optionally with a value
gtag.conversion('quote_request', 500, 'AUD');

// Send any custom event
gtag.event('custom_action', {
  category: 'engagement',
  value: 1,
});
```

### Example: tracking a form submission

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

### Data layer events

These helper functions push events to the GTM data layer, which you can use to build additional tags:

```javascript
dataLayer.push({
  event: 'contact_dialog_open',
  category: 'lead_generation',
  action: 'dialog_open',
});

dataLayer.push({
  event: 'service_interaction',
  service_name: 'Decking',
  action: 'view',
  category: 'carpentry_services',
});
```

## GDPR Compliance Considerations

For Australian businesses, consider adding:

1. **A cookie consent banner** — use GTM's consent mode
2. **An updated privacy policy** — disclose analytics tracking
3. **Data retention limits** — configure these in GA4 settings

## Recommended GA4 Goals & Conversions

Set up these conversions in GA4:

1. **Contact form submission** — event name: `form_submit`
2. **Phone call clicks** — event name: `contact_attempt` with method: `phone`
3. **Service page engagement** — event name: `service_interaction`

## Troubleshooting

### GTM isn't loading

- Confirm `NEXT_PUBLIC_GTM_ID` is set correctly
- Confirm the GTM ID in Sanity Studio matches the format `GTM-XXXXXXX`
- Confirm the Sanity Studio document is published
- Check the browser console for JavaScript errors

### Events aren't firing

- Use GTM Preview mode to debug
- Check `window.dataLayer` in the browser console for the expected events
- Confirm event names match the trigger configuration in GTM

### Data isn't appearing in GA4

- Confirm the GA4 configuration tag fires on all pages
- Confirm the GA4 Measurement ID is correct
- Allow 24–48 hours for data to appear in standard reports
- Use Real-time reports to verify sooner

### Development data is polluting production analytics

- Set up environment-based GTM loading (see [Development Considerations](#development-considerations))
- Use a separate GTM container for development
- Filter out localhost traffic in your GA4 views

### Debug commands

```javascript
// Check if GTM is loaded
console.log(window.google_tag_manager);

// View the data layer
console.log(window.dataLayer);

// Fire a manual test event
window.dataLayer.push({
  event: 'test_event',
  custom_parameter: 'test_value',
});
```

If none of this resolves your issue, check the browser console for JavaScript errors related to GTM or analytics tracking, and check the Vercel function logs for the API routes involved.
