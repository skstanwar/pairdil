import { sendOtpToPhone, verifyOtp } from "../validations/auth.validation.js"
import User from '../models/user.model.js'



export const sendotptophone = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    const result = await sendOtpToPhone(phone, process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_VERIFY_SERVICE_SID);

    if (result.success) {
      return res.status(200).json({ message: 'OTP sent successfully', sid: result.sid });
    } else {
      return res.status(500).json({ message: 'Failed to send OTP', error: result.error });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const verifyotp = async (req, res) => {
  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({ message: 'Phone number and OTP code are required' });
    }

    const result = await verifyOtp(phone, code, process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_VERIFY_SERVICE_SID);

    if (result.success) {
      const updates = {}
      updates.isVerify = true
      updates.phone = phone
      const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,
        updates,
        { new: true }
      );
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP', error: result.error });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};