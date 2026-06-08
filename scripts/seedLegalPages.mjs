/**
 * Generates NDJSON for the two legal page documents (terms & privacy-policy)
 * as Portable Text and writes them to legalPages.ndjson for `sanity dataset import`.
 *
 * Run: node scripts/seedLegalPages.mjs
 */
import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

const block = (style, text, marks = []) => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks }],
});

const h2 = (text) => block('h2', text);
const p = (text) => block('normal', text);

const li = (text) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
});

const business = {
  name: 'JLC Carpentry & Building Services Pty Ltd',
  shortName: 'JLC Carpentry',
  abn: '666 669 316',
  email: 'jlcbuildingservices@gmail.com',
  phone: '+61 481 701 365',
  suburb: 'Alphington',
  state: 'VIC',
  postcode: '3078',
  website: 'https://www.jlccarpentrybuildingservices.com.au',
};

const lastUpdated = '2026-06-08';

const privacyContent = [
  p(
    `${business.name} (ABN ${business.abn}) ("we", "us", "our") is committed to protecting your privacy and handling your personal information in an open and transparent way. This Privacy Policy explains how we collect, use, store and disclose your personal information, and how we comply with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth).`,
  ),
  p(
    `By using our website or providing your information to us, you consent to the collection and use of your information as described in this policy.`,
  ),
  h2('Information we collect'),
  p('We may collect the following types of personal information from you:'),
  li('Your name, email address, phone number and postal or property address.'),
  li('Details about the project or service you are enquiring about.'),
  li('Any information you choose to provide when you contact us or request a quote.'),
  li(
    'Technical information such as your IP address, browser type, device information and pages visited, collected automatically when you use our website.',
  ),
  h2('How we collect your information'),
  p('We collect personal information directly from you when you:'),
  li('Complete a contact form or request a quote on our website.'),
  li('Call, email or message us through social media.'),
  li('Engage us to carry out carpentry or building work.'),
  p(
    'We also collect information automatically through cookies and similar technologies when you browse our website (see "Cookies and tracking" below).',
  ),
  h2('How we use your information'),
  p('We use your personal information to:'),
  li('Respond to your enquiries and provide quotes.'),
  li('Provide our carpentry and building services to you.'),
  li('Communicate with you about your project, including updates and scheduling.'),
  li('Improve our website, services and customer experience.'),
  li('Meet our legal and regulatory obligations.'),
  h2('Cookies and tracking'),
  p(
    'Our website uses cookies and tracking technologies, including Google Analytics and the Meta (Facebook) Pixel, to understand how visitors use our site and to measure the performance of our advertising. These tools may collect information such as your IP address, device and browsing activity, and may use this information to show you relevant ads on Meta platforms (Facebook and Instagram) and across the web.',
  ),
  p(
    'You can opt out of personalised advertising through your Meta ad preferences and your Google ad settings, and you can disable cookies through your browser settings. Disabling cookies may affect how parts of our website function.',
  ),
  h2('Disclosure of your information'),
  p(
    'We do not sell your personal information. We may share your information with trusted third parties who help us operate our business and website, such as analytics and advertising providers (including Google and Meta), IT and hosting providers, and subcontractors engaged to deliver your project. We may also disclose information where required or authorised by law.',
  ),
  p(
    'Some of these providers, including Google and Meta, may store and process data outside Australia. Where this occurs, we take reasonable steps to ensure your information is handled in accordance with the Australian Privacy Principles.',
  ),
  h2('Storage and security'),
  p(
    'We take reasonable steps to protect your personal information from misuse, loss, unauthorised access, modification and disclosure. We retain your information only for as long as necessary to fulfil the purposes set out in this policy or as required by law.',
  ),
  h2('Accessing and correcting your information'),
  p(
    'You have the right to request access to the personal information we hold about you and to ask us to correct it if it is inaccurate, out of date or incomplete. To make a request, please contact us using the details below.',
  ),
  h2('Complaints'),
  p(
    'If you have a concern about how we have handled your personal information, please contact us and we will respond as soon as possible. If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.',
  ),
  h2('Changes to this policy'),
  p(
    'We may update this Privacy Policy from time to time. The most current version will always be available on this page, with the "Last updated" date reflecting when it was last changed.',
  ),
  h2('Contact us'),
  p(
    `If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at ${business.email} or by phone on ${business.phone}.`,
  ),
];

const termsContent = [
  p(
    `These Terms & Conditions govern your use of the ${business.name} (ABN ${business.abn}) website (the "Website"). By accessing or using this Website, you agree to be bound by these terms. If you do not agree, please do not use the Website.`,
  ),
  h2('About us'),
  p(
    `${business.name} provides carpentry and building services throughout Melbourne, based in ${business.suburb}, ${business.state} ${business.postcode}.`,
  ),
  h2('Use of this website'),
  p('You agree to use this Website only for lawful purposes. You must not:'),
  li('Use the Website in any way that breaches any applicable law or regulation.'),
  li('Attempt to gain unauthorised access to the Website or any connected systems.'),
  li('Use the Website to transmit any harmful or malicious code.'),
  h2('Quotes and enquiries'),
  p(
    'Any quote requested or provided through this Website is an estimate only and does not constitute a binding offer. Final pricing, scope and timing for any work will be confirmed in a separate written agreement before work commences.',
  ),
  h2('Intellectual property'),
  p(
    'All content on this Website, including text, images, logos, project photographs and design, is owned by or licensed to us and is protected by copyright. You may not reproduce, distribute or use any content without our prior written permission.',
  ),
  h2('Third-party links'),
  p(
    'This Website may contain links to third-party websites, including our social media profiles and Google Business profile. We are not responsible for the content, privacy practices or availability of those external sites.',
  ),
  h2('Disclaimer'),
  p(
    'The information on this Website is provided for general information purposes only. While we take care to ensure it is accurate, we make no warranties about its completeness, reliability or suitability for any purpose. Your use of the Website is at your own risk.',
  ),
  h2('Limitation of liability'),
  p(
    'To the maximum extent permitted by law, we are not liable for any loss or damage arising from your use of, or reliance on, this Website. Nothing in these terms excludes any rights or guarantees you have under the Australian Consumer Law that cannot lawfully be excluded.',
  ),
  h2('Privacy'),
  p(
    'Your use of this Website is also governed by our Privacy Policy, which explains how we collect and handle your personal information.',
  ),
  h2('Changes to these terms'),
  p(
    'We may update these Terms & Conditions from time to time. The current version will always be available on this page, with the "Last updated" date reflecting when it was last changed.',
  ),
  h2('Governing law'),
  p('These Terms & Conditions are governed by the laws of Victoria, Australia.'),
  h2('Contact us'),
  p(`If you have any questions about these Terms & Conditions, please contact us at ${business.email}.`),
];

const documents = [
  {
    _id: 'legalPage.privacy-policy',
    _type: 'legalPage',
    pageType: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated,
    content: privacyContent,
  },
  {
    _id: 'legalPage.terms',
    _type: 'legalPage',
    pageType: 'terms',
    title: 'Terms & Conditions',
    lastUpdated,
    content: termsContent,
  },
];

const ndjson = documents.map((doc) => JSON.stringify(doc)).join('\n') + '\n';
writeFileSync(new URL('./legalPages.ndjson', import.meta.url), ndjson);
console.log('Wrote scripts/legalPages.ndjson with', documents.length, 'documents.');
