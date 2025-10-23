// lib/brevo.ts
import * as Brevo from '@getbrevo/brevo';

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

export async function sendEmail({
  senderEmail,
  senderName,
  recipientEmail,
  subject,
  htmlContent,
  replyTo,
}: {
  senderEmail: string;
  senderName: string;
  recipientEmail: string;
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
}) {
  const emailData = new Brevo.SendSmtpEmail();

  emailData.sender = { email: senderEmail, name: senderName };
  emailData.to = [{ email: recipientEmail }];
  emailData.subject = subject;
  emailData.htmlContent = htmlContent;

  if (replyTo) {
    emailData.replyTo = replyTo;
  }

  return await apiInstance.sendTransacEmail(emailData);
}
