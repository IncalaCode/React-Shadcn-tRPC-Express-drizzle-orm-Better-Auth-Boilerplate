import "dotenv/config";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import logger from "../utils/logger";

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private transporter!: nodemailer.Transporter;
  private templatesPath: string;

  constructor() {
    this.templatesPath = path.join(__dirname, "../templates/email");
    this.initializeTransporter();
  }

  private initializeTransporter(): void {
    // Development/Test configuration (using Ethereal Email for testing)
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
      this.transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "ethereal.user@ethereal.email",
          pass: "ethereal.pass",
        },
      });
    } else {
      // Production configuration
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    // Check if SMTP environment variables are set
    if (!process.env.SMTP_HOST || process.env.SMTP_HOST == "smtp.ethereal.email" || process.env.SMTP_HOST == "smtp.gmail.com") {
      logger.warn("SMTP environment variables not configured. Email service disabled.");
      logger.warn("Note: For Gmail, use App Password, not regular password");
      return true;
    }

    try {
      const mailOptions = {
        from: options.from || process.env.SMTP_FROM || "noreply@yourapp.com",
        to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV === "development") {
        logger.info("Email sent successfully:", {
          messageId: result.messageId,
          previewUrl: nodemailer.getTestMessageUrl(result),
        });
      } else {
        logger.info("Email sent successfully:", {
          messageId: result.messageId,
          to: options.to,
          subject: options.subject,
        });
      }

      return true;
    } catch (error) {
      logger.error("Failed to send email:", error);
      return false;
    }
  }

  async loadTemplate(templateName: string, variables: Record<string, any> = {}): Promise<EmailTemplate> {
    try {
      const templatePath = path.join(this.templatesPath, `${templateName}.html`);
      let htmlContent = fs.readFileSync(templatePath, "utf-8");

      // Simple template variable replacement
      Object.keys(variables).forEach((key) => {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
        htmlContent = htmlContent.replace(regex, variables[key]);
      });

      // Extract subject from template (if exists)
      const subjectMatch = htmlContent.match(/<!--\s*SUBJECT:\s*(.+?)\s*-->/);
      const subject = subjectMatch ? subjectMatch[1] : "No Subject";

      // Convert HTML to plain text (basic conversion)
      const text = htmlContent
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();

      return {
        subject,
        html: htmlContent,
        text,
      };
    } catch (error) {
      logger.error(`Failed to load email template: ${templateName}`, error);
      throw new Error(`Email template not found: ${templateName}`);
    }
  }

  async sendTemplateEmail(
    templateName: string,
    to: string | string[],
    variables: Record<string, any> = {},
    customSubject?: string
  ): Promise<boolean> {
    try {
      const template = await this.loadTemplate(templateName, variables);

      return await this.sendEmail({
        to,
        subject: customSubject || template.subject,
        html: template.html,
        text: template.text,
      });
    } catch (error) {
      logger.error(`Failed to send template email: ${templateName}`, error);
      return false;
    }
  }

  // Specific email methods for common use cases
  async sendWelcomeEmail(to: string, name: string, verificationUrl?: string): Promise<boolean> {
    return await this.sendTemplateEmail("welcome", to, {
      name,
      verificationUrl,
      appName: process.env.APP_NAME || "Your App",
    });
  }

  async sendVerificationEmail(to: string, name: string, verificationUrl: string): Promise<boolean> {
    return await this.sendTemplateEmail("email-verification", to, {
      name,
      verificationUrl,
      appName: process.env.APP_NAME || "Your App",
    });
  }

  async sendPasswordResetEmail(to: string, name: string, resetUrl: string): Promise<boolean> {
    return await this.sendTemplateEmail("password-reset", to, {
      name,
      resetUrl,
      appName: process.env.APP_NAME || "Your App",
      supportEmail: process.env.SUPPORT_EMAIL || "support@yourapp.com",
    });
  }

  async sendPasswordChangedEmail(to: string, name: string): Promise<boolean> {
    return await this.sendTemplateEmail("password-changed", to, {
      name,
      appName: process.env.APP_NAME || "Your App",
      supportEmail: process.env.SUPPORT_EMAIL || "support@yourapp.com",
    });
  }

  async sendAccountBannedEmail(to: string, name: string, reason: string): Promise<boolean> {
    return await this.sendTemplateEmail("account-banned", to, {
      name,
      reason,
      appName: process.env.APP_NAME || "Your App",
      supportEmail: process.env.SUPPORT_EMAIL || "support@yourapp.com",
    });
  }

  async sendAccountUnbannedEmail(to: string, name: string): Promise<boolean> {
    return await this.sendTemplateEmail("account-unbanned", to, {
      name,
      appName: process.env.APP_NAME || "Your App",
    });
  }

  async sendSignInNotificationEmail(
    to: string, 
    name: string, 
    ipAddress: string, 
    userAgent: string
  ): Promise<boolean> {
    return await this.sendTemplateEmail("signin-notification", to, {
      name,
      time: new Date().toLocaleString(),
      ipAddress,
      userAgent,
      appName: process.env.APP_NAME || "Your App",
      changePasswordUrl: `${process.env.FRONTEND_URL}/change-password`,
      supportEmail: process.env.SUPPORT_EMAIL || "support@yourapp.com",
    });
  }

  // Test email connectivity
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info("Email service connection verified successfully");
      return true;
    } catch (error) {
      logger.error("Email service connection failed:", error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
