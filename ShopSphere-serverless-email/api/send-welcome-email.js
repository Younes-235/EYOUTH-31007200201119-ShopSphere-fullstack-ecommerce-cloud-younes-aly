const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      service: 'ShopSphere Vercel Serverless Email Function',
      status: 'Ready',
      workload: 'Background user welcome email dispatcher'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const { to, name } = req.body || {};

  if (!to || !name) {
    return res.status(400).json({ error: 'Missing required parameters: "to" and "name" are required.' });
  }

  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: `"ShopSphere Support" <no-reply@shopsphere.com>`,
      to: to,
      subject: 'Welcome to ShopSphere! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4A90E2;">Welcome to ShopSphere, ${name}!</h2>
          <p>Thank you for registering. Your account is active and ready to explore our modern e-commerce catalog.</p>
          <p style="margin-top: 20px; font-size: 13px; color: #777;">Dispatched via Vercel Serverless Function (Task 3 Modernization)</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log(`[Serverless Email Worker] Email dispatched to ${to}`);
    console.log(`[Preview URL]: ${previewUrl}`);

    return res.status(200).json({
      success: true,
      message: `Welcome email sent successfully to ${to}`,
      messageId: info.messageId,
      previewUrl: previewUrl || null
    });
  } catch (error) {
    console.error('[Serverless Email Worker] Delivery error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process email background workload',
      details: error.message
    });
  }
};
