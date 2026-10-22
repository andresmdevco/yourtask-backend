// import { transporter } from '../config/nodemailer';
import { resend } from '../config/resend';

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const { data } = await resend.emails.send({
      from: 'YourTask <admin@yourtask.tech>',
      to: user.email,
      subject: 'YourTask - Confirma tu cuenta',
      text: `Hola ${user.name}, confirma tu cuenta de YourTask usando el código: ${user.token}. Este token expira en 10 minutos.`,
      html: `
        <p>Hola ${user.name}, has creado tu cuenta en YourTask. ¡Ya casi está todo listo! Solo debes confirmar tu cuenta.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
        <p>E ingresa el código: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos.</p>
      `,
    });
    console.log('Correo de confirmación enviado:', data.id);
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    const { data } = await resend.emails.send({
      from: 'YourTask <admin@yourtask.tech>',
      to: user.email,
      subject: 'YourTask - Restablece tu contraseña',
      text: `Hola ${user.name}, usa el código ${user.token} para restablecer tu contraseña. Este token expira en 10 minutos.`,
      html: `
        <p>Hola ${user.name}, has solicitado restablecer tu contraseña.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer contraseña</a>
        <p>E ingresa el código: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos.</p>
      `,
    });
    console.log('Correo de recuperación enviado:', data.id);
  };
}

// export class AuthEmail {
//   static sendConfirmationEmail = async (user: IEmail) => {
//     const info = await transporter.sendMail({
//       from: 'YourTask <admin@yourtask.com>',
//       to: user.email,
//       subject: 'YourTask - Confirma tu cuenta',
//       text: 'YourTask - Confirma tu cuenta',
//       html: `<p>Hola ${user.name}, has creado tu cuenta en YourTask, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
//         <p>Visita el siguiente enlace:</p>
//         <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
//         <p>E ingresa el código: <b>${user.token}</p>
//         <p>Este token expira en 10 minutos</p>
//       `,
//     });
//     console.log('Mensaje enviado', info.messageId);
//   };

//   static sendPasswordResetToken = async (user: IEmail) => {
//     const info = await transporter.sendMail({
//       from: 'YourTask <admin@yourtask.com>',
//       to: user.email,
//       subject: 'YourTask - Reestablece tu password',
//       text: 'YourTask - Reestablece tu password',
//       html: `<p>Hola ${user.name}, has solicitado reestablecer tu password</p>
//         <p>Visita el siguiente enlace:</p>
//         <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
//         <p>E ingresa el código: <b>${user.token}</p>
//         <p>Este token expira en 10 minutos</p>
//       `,
//     });
//     console.log('Mensaje enviado', info.messageId);
//   };
// }
