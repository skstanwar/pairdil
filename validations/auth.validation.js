// Verify EMail and Phone Numbers if logged in 
import twilio from 'twilio';

// ✅ Send OTP to phone
export const sendOtpToPhone = async (phoneNumber,accountSid,authToken,verifySid) => {
  try {
    const client = twilio(accountSid, authToken);
    const verification = await client.verify.v2.services(verifySid).verifications.create({
      to: `+91${phoneNumber}`, // Make sure the number includes country code
      channel: 'sms'
    });
    return { success: true, sid: verification.sid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ✅ Verify OTP
export const verifyOtp = async (phoneNumber, code,accountSid,authToken,verifySid) => {
  try {
    const client = twilio(accountSid, authToken);
    const verificationCheck = await client.verify.v2.services(verifySid).verificationChecks.create({
      to: `+91${phoneNumber}`,
      code
    });

    return { success: verificationCheck.status === 'approved' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
