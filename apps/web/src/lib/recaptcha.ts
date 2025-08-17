import { getConfig } from './config';

export async function verifyRecaptchaToken(
  token: string,
  userAgent?: string,
  userIpAddress?: string,
  expectedAction: string = 'contact_form',
): Promise<{ success: boolean; score?: number; error?: string }> {
  const config = getConfig();

  if (!config.recaptchaSecretKey) {
    console.error('reCAPTCHA secret key not configured');
    return { success: false, error: 'reCAPTCHA not configured' };
  }

  if (!config.googleCloudProjectId) {
    console.error('Google Cloud Project ID not configured');
    return { success: false, error: 'Project ID not configured' };
  }

  if (!token) {
    return { success: false, error: 'No reCAPTCHA token provided' };
  }

  try {
    const requestBody = {
      event: {
        token,
        siteKey: config.recaptchaSiteKey,
        userAgent,
        userIpAddress,
      },
    };

    // Create assessment using the correct Enterprise API endpoint
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${config.googleCloudProjectId}/assessments?key=${config.recaptchaSecretKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ reCAPTCHA verification failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      return { success: false, error: `Verification request failed: ${response.status} - ${errorText}` };
    }

    const data = await response.json();

    // Check token properties
    const tokenProperties = data.tokenProperties;
    const riskAnalysis = data.riskAnalysis;

    if (!tokenProperties) {
      console.error('❌ No token properties in response');
      return { success: false, error: 'No token properties in response' };
    }

    // Verify token is valid
    if (!tokenProperties.valid) {
      console.error('❌ Invalid token:', tokenProperties.invalidReason);
      return {
        success: false,
        error: `Invalid token: ${tokenProperties.invalidReason || 'Unknown reason'}`,
        score: riskAnalysis?.score,
      };
    }

    // Verify action matches (if expected action is provided)
    if (expectedAction && tokenProperties.action !== expectedAction) {
      console.error('❌ Action mismatch:', { expected: expectedAction, actual: tokenProperties.action });
      return {
        success: false,
        error: `Action mismatch: expected ${expectedAction}, got ${tokenProperties.action}`,
        score: riskAnalysis?.score,
      };
    }

    const score = riskAnalysis?.score;

    // Check risk score (0.0 = very likely bot, 1.0 = very likely human)
    const threshold = 0.5;
    if (score !== undefined && score < threshold) {
      console.warn('⚠️ Low risk score:', score);
      return {
        success: false,
        error: `High risk score: ${score} (threshold: ${threshold})`,
        score,
      };
    }

    return { success: true, score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Verification failed' };
  }
}
