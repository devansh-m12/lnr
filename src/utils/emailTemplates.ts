export function getVerificationEmailTemplate(otp: string): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Verify Your Email</h2>
      <p>Your verification code is:</p>
      <h1 style="color: #4F46E5; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
      <p>This code will expire in 15 minutes.</p>
      <p>If you didn't request this code, please ignore this email.</p>
    </div>
  `;
} 