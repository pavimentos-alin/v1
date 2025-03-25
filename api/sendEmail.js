// api/sendEmail.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, email, mensaje } = req.body;

    try {
      const data = await resend.emails.send({
        from: 'Formulario Hormigonarte <info@hormigonarte.com>',
        to: ['info@hormigonarte.com'],
        subject: 'Nuevo mensaje desde formulario web',
        html: `
          <h3>Nuevo mensaje recibido desde hormigonarte.com</h3>
          <p><b>Nombre:</b> ${nombre}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Mensaje:</b><br>${mensaje}</p>
        `,
      });

      console.log("Correo enviado correctamente, respuesta de Resend:", data);

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error interno al enviar email con Resend:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
