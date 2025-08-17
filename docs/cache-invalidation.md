# Cache Invalidation & Content Updates

This document explains how content caching works in the JLC Carpentry website and how to invalidate cached content when updates are made in Sanity CMS.

## Overview

The website uses **Next.js App Router** with **Static Site Generation (SSG)** and **Incremental Static Regeneration (ISR)** to provide fast loading times while keeping content fresh. Content is cached at build time and invalidated when changes are made in Sanity.

## Cache Strategy

### Static Generation

- **Service pages** (`/services/[serviceName]`) are pre-generated at build time
- **Homepage** and other content pages use tag-based revalidation
- Pages are cached indefinitely until explicitly invalidated

### Cache Tags

Different content types use specific cache tags:

| Content Type   | Cache Tag      | Affects                             |
| -------------- | -------------- | ----------------------------------- |
| `service`      | `service`      | All service pages, services listing |
| `siteSettings` | `siteSettings` | Footer, header, site-wide settings  |
| `homepage`     | `homepage`     | Homepage content                    |
| `heroSection`  | `heroSection`  | Hero sections across the site       |
| `statistic`    | `statistic`    | Statistics displayed on homepage    |

## Automatic Content Invalidation

### Sanity Webhook Setup

1. **Access Sanity Studio**:
   - Go to [sanity.io](https://www.sanity.io)
   - Navigate to your project dashboard

2. **Configure Webhook**:
   - Go to **API** → **Webhooks**
   - Click **Create webhook**
   - Set the following:
     - **Name**: `JLC Website Revalidation`
     - **URL**: `https://www.jlccarpentrybuildingservices.com.au/api/revalidate`
     - **Method**: `POST`
     - **Trigger on**: `Create`, `Update`, `Delete`
     - **Filter**: `_type in ["service", "siteSettings", "homepage", "heroSection", "statistic"]`

3. **Save the webhook**

### How It Works

1. **Content Editor** makes changes in Sanity CMS
2. **Sanity** automatically sends a webhook to the revalidation API
3. **API Route** (`/app/api/revalidate/route.ts`) processes the webhook
4. **Next.js** invalidates the relevant cache tags using `revalidateTag()`
5. **Next Request** to affected pages will regenerate with fresh content

## Manual Content Invalidation

### Using the API Endpoint

If automatic invalidation isn't working or you need to manually refresh content:

#### 1. Test the API Endpoint

```bash
curl https://www.jlccarpentrybuildingservices.com.au/api/revalidate
```

Expected response:

```json
{
  "message": "Revalidation API is working",
  "endpoint": "/api/revalidate",
  "method": "POST"
}
```

#### 2. Invalidate Specific Content

**Service Pages**:

```bash
curl -X POST https://www.jlccarpentrybuildingservices.com.au/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"_type": "service"}'
```

**Site Settings** (Footer, Header):

```bash
curl -X POST https://www.jlccarpentrybuildingservices.com.au/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"_type": "siteSettings"}'
```

**Homepage**:

```bash
curl -X POST https://www.jlccarpentrybuildingservices.com.au/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"_type": "homepage"}'
```

**All Content** (multiple requests):

```bash
# Invalidate all content types
for type in "service" "siteSettings" "homepage" "heroSection" "statistic"; do
  curl -X POST https://www.jlccarpentrybuildingservices.com.au/api/revalidate \
    -H "Content-Type: application/json" \
    -d "{\"_type\": \"$type\"}"
  echo "Invalidated: $type"
done
```

### Using Browser/Postman

1. **Method**: `POST`
2. **URL**: `https://www.jlccarpentrybuildingservices.com.au/api/revalidate`
3. **Headers**: `Content-Type: application/json`
4. **Body**:
   ```json
   {
     "_type": "service"
   }
   ```

## Deployment-Based Invalidation

### Automatic Rebuild

- **Vercel**: Automatically rebuilds when code changes are pushed to main branch
- **Fresh Build**: Generates all static pages with latest content from Sanity
- **Complete Cache Clear**: All cached content is regenerated

### Manual Redeploy

1. Go to your Vercel dashboard
2. Find the JLC Carpentry project
3. Click **"Redeploy"** on the latest deployment
4. This will rebuild the entire site with fresh content

## Troubleshooting

### Content Not Updating

1. **Check Webhook Status**:
   - Go to Sanity Dashboard → API → Webhooks
   - Check if webhook is active and recent deliveries were successful

2. **Verify API Endpoint**:

   ```bash
   curl https://www.jlccarpentrybuildingservices.com.au/api/revalidate
   ```

3. **Manual Invalidation**:
   - Use the manual API calls above
   - Force a redeploy in Vercel

4. **Check Browser Cache**:
   - Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Open in incognito/private mode

### API Errors

**500 Error**: Check Vercel function logs

```bash
# If you have Vercel CLI installed
vercel logs --follow
```

**404 Error**: API route might not be deployed

- Verify `/app/api/revalidate/route.ts` exists in the repository
- Check if latest code is deployed to production

### Cache Validation

**Check if content is cached**:

1. Make a change in Sanity
2. Wait 10-30 seconds
3. Visit the affected page
4. Check if changes are reflected

**Verify regeneration**:

- Look for updated timestamps in page source
- Check network tab for cache headers

## Best Practices

### For Content Editors

1. **Make Changes in Sanity**: Always update content through Sanity CMS
2. **Wait for Propagation**: Allow 10-30 seconds for changes to appear
3. **Hard Refresh**: Use hard refresh if changes don't appear immediately
4. **Report Issues**: Contact developers if content doesn't update after 5 minutes

### For Developers

1. **Use Cache Tags**: Ensure all Sanity queries use appropriate cache tags
2. **Monitor Webhooks**: Regularly check webhook delivery status in Sanity
3. **Test Invalidation**: Test the revalidation API after any caching changes
4. **Fallback Strategy**: Always have manual invalidation as backup

### Content Types and Cache Timing

| Content Type     | Expected Update Time | Fallback Method |
| ---------------- | -------------------- | --------------- |
| Service Pages    | 10-30 seconds        | Manual API call |
| Homepage Content | 10-30 seconds        | Manual API call |
| Site Settings    | 10-30 seconds        | Manual API call |
| New Services     | Next build/deploy    | Redeploy        |

## Monitoring

### Logs to Check

1. **Vercel Function Logs**: For API route execution
2. **Sanity Webhook Logs**: For webhook delivery status
3. **Browser Network Tab**: For cache headers and response times

### Success Indicators

✅ **Webhook delivers successfully** to the API endpoint  
✅ **API returns 200** with revalidation confirmation  
✅ **Content updates** appear on the website within 30 seconds  
✅ **No 500 errors** in function logs

---

## Quick Reference

**Webhook URL**: `https://www.jlccarpentrybuildingservices.com.au/api/revalidate`

**Manual Invalidation**:

```bash
curl -X POST https://www.jlccarpentrybuildingservices.com.au/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"_type": "service"}'
```

**Emergency Refresh**: Redeploy in Vercel dashboard

For questions or issues, contact the development team.
