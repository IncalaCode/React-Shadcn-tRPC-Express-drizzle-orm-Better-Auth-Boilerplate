import "dotenv/config";

export interface SMSConfig {
  provider: string;
  // Add your custom SMS provider configuration here
  // Example: apiKey, apiSecret, endpoint, etc.
  [key: string]: any;
}

export interface SMSMessage {
  to: string;
  body: string;
}

export class SMSService {
  private config: SMSConfig;

  constructor() {
    this.config = {
      provider: process.env.SMS_PROVIDER || "mock",
      // Add your custom configuration here
      // Example: apiKey: process.env.SMS_API_KEY,
    };
  }

  /**
   * Send SMS message
   * @param message - SMS message object
   * @returns Promise<boolean> - Success status
   */
  async sendSMS(message: SMSMessage): Promise<boolean> {
    try {
      switch (this.config.provider.toLowerCase()) {
        case "mock":
          return await this.sendMockSMS(message);
        case "custom":
          return await this.sendCustomSMS(message);
        default:
          // For any other provider, developers can implement their own logic
          console.log(`📱 SMS Provider: ${this.config.provider}`);
          console.log(`📱 To: ${message.to}`);
          console.log(`📱 Message: ${message.body}`);
          console.log("📱 Implement your SMS provider logic in sendCustomSMS method");
          return await this.sendCustomSMS(message);
      }
    } catch (error) {
      console.error("❌ SMS sending failed:", error);
      return false;
    }
  }

  /**
   * Send verification code via SMS
   * @param phoneNumber - Phone number to send to
   * @param code - Verification code
   * @returns Promise<boolean> - Success status
   */
  async sendVerificationCode(phoneNumber: string, code: string): Promise<boolean> {
    const message = {
      to: phoneNumber,
      body: `Your verification code is: ${code}. This code will expire in 5 minutes.`,
    };

    return await this.sendSMS(message);
  }

  /**
   * Send custom SMS (implement your SMS provider logic here)
   * @param message - SMS message object
   * @returns Promise<boolean> - Success status
   */
  private async sendCustomSMS(message: SMSMessage): Promise<boolean> {
    // TODO: Implement your SMS provider logic here
    // Examples:
    // - Twilio: Use Twilio SDK
    // - AWS SNS: Use AWS SDK
    // - SendGrid: Use SendGrid SDK
    // - Custom API: Make HTTP request to your SMS API
    
    console.log("📱 Custom SMS Implementation Required:");
    console.log(`   Provider: ${this.config.provider}`);
    console.log(`   To: ${message.to}`);
    console.log(`   Message: ${message.body}`);
    console.log("   Implement your SMS logic in sendCustomSMS method");
    
    // For now, return true to simulate success
    // Replace this with your actual SMS implementation
    return true;
  }

  /**
   * Send mock SMS (for development/testing)
   * @param message - SMS message object
   * @returns Promise<boolean> - Success status
   */
  private async sendMockSMS(message: SMSMessage): Promise<boolean> {
    console.log("📱 Mock SMS sent:");
    console.log(`   To: ${message.to}`);
    console.log(`   Message: ${message.body}`);
    console.log("   (This is a mock SMS for development)");
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  }

  /**
   * Generate a random verification code
   * @param length - Code length (default: 6)
   * @returns string - Generated code
   */
  generateVerificationCode(length: number = 6): string {
    const digits = "0123456789";
    let code = "";
    
    for (let i = 0; i < length; i++) {
      code += digits[Math.floor(Math.random() * digits.length)];
    }
    
    return code;
  }

  /**
   * Validate phone number format
   * @param phoneNumber - Phone number to validate
   * @returns boolean - Valid status
   */
  validatePhoneNumber(phoneNumber: string): boolean {
    // Basic phone number validation (international format)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }

  /**
   * Format phone number to international format
   * @param phoneNumber - Phone number to format
   * @returns string - Formatted phone number
   */
  formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, "");
    
    // Add country code if not present (assuming US +1)
    if (digits.length === 10) {
      return `+1${digits}`;
    } else if (digits.length === 11 && digits.startsWith("1")) {
      return `+${digits}`;
    }
    
    return phoneNumber; // Return as-is if already formatted
  }
}

// Export singleton instance
export const smsService = new SMSService();
