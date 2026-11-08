# ✅ YourTask — Backend
 
API REST construida con **Node.js**, **Express** y **TypeScript** para YourTask, una aplicación de gestión de proyectos y tareas. Usa **MongoDB** con **Mongoose** como base de datos, autenticación con **JWT** y confirmación de cuentas por correo electrónico. Permite crear proyectos, asignarles tareas, colaboradores y notas, con permisos diferenciados para el administrador del proyecto.
 
## 🌐 Demo
 
Este repositorio contiene únicamente la API. La interfaz de usuario está en el repositorio del frontend:
 
🔗 [https://github.com/andresmdevco/yourtask-frontend](https://github.com/andresmdevco/yourtask-frontend)
 
## 🛠️ Tecnologías Utilizadas
 
![NodeJS](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
 
- Node.js y Express
- TypeScript
Además:
- **Mongoose** — ODM para modelar y consultar los datos en MongoDB
- **jsonwebtoken** — generación y verificación de tokens JWT para la autenticación
- **bcrypt** — hash de contraseñas
- **express-validator** — validación de los datos de entrada en las rutas
- **Resend** — envío en producción de los correos de confirmación de cuenta y recuperación de contraseña
- **Nodemailer** y **Mailtrap** — envío de correos en desarrollo, sin enviar mensajes a destinatarios reales
- **CORS** — configurado para aceptar únicamente el origen del frontend
- **Morgan** — logging de peticiones HTTP
- **dotenv** y **colors** — variables de entorno y mensajes de consola
## ✨ Características
 
- 🔐 Registro de usuarios con confirmación de cuenta mediante un código de 6 dígitos enviado por correo, que expira a los 10 minutos.
- 🔑 Inicio de sesión con JWT. Si la cuenta no está confirmada, se envía un nuevo código de confirmación.
- 🔄 Recuperación de contraseña mediante un código temporal enviado por correo.
- 👤 Actualización del perfil (nombre y correo) y cambio de contraseña verificando la contraseña actual.
- 📁 Creación, consulta, edición y eliminación de proyectos. Cada usuario ve los proyectos que administra y aquellos en los que colabora.
- ✅ Tareas dentro de cada proyecto con cinco estados: `pending`, `onHold`, `inProgress`, `underReview` y `completed`.
- 🕓 Historial de cambios de estado de cada tarea, con el usuario que realizó cada cambio.
- 👥 Colaboradores: búsqueda de usuarios por correo, y adición o eliminación de miembros del proyecto.
- 📝 Notas dentro de las tareas, que solo puede eliminar su autor.
- 🛡️ Permisos de administrador: solo quien creó el proyecto puede editarlo, eliminarlo y gestionar sus tareas.
- 🧹 Eliminación en cascada: al eliminar un proyecto se eliminan sus tareas y notas, y al eliminar una tarea se eliminan sus notas.
- ✅ Validación de datos de entrada en todas las rutas.
- 🔒 CORS restringido al origen del frontend.
## 📂 Archivos principales
 
| Archivo | Descripción |
|---|---|
| `index.ts` | Punto de entrada. Inicia el servidor en el puerto definido en `PORT` (4000 por defecto) |
| `server.ts` | Configura la instancia de Express: conexión a la base de datos, CORS, logging, lectura de JSON y registro de las rutas `/api/auth` y `/api/projects` |
| `config/cors.ts` | Lista blanca de orígenes con `FRONTEND_URL`. Al ejecutar con el argumento `--api` también acepta peticiones sin origen, útil para herramientas como Postman |
| `config/db.ts` | Conexión a MongoDB con Mongoose. Define servidores DNS públicos para resolver la URL de conexión y cierra el proceso si la conexión falla |
| `config/resend.ts` | Cliente de Resend. Lanza un error si falta `RESEND_API_KEY` |
| `config/nodemailer.ts` | Transporte de Nodemailer configurado con las variables SMTP. Se usa en desarrollo con Mailtrap |
| `routes/authRoutes.ts` | Rutas de autenticación y perfil, con sus validaciones de `express-validator` |
| `routes/projectRoutes.ts` | Rutas de proyectos, tareas, equipo y notas. Registra `router.param` para cargar el proyecto y la tarea antes de llegar a los controladores |
| `controllers/AuthController.ts` | Registro, confirmación de cuenta, login, códigos de confirmación, recuperación de contraseña, perfil y cambio de contraseña |
| `controllers/ProjectController.ts` | Crear, listar, obtener, actualizar y eliminar proyectos |
| `controllers/TaskController.ts` | Crear, listar, obtener, actualizar y eliminar tareas, y cambiar su estado |
| `controllers/TeamController.ts` | Buscar usuarios por correo, listar el equipo, y agregar o quitar miembros |
| `controllers/NoteController.ts` | Crear, listar y eliminar las notas de una tarea |
| `middleware/auth.ts` | `authenticate`: verifica el JWT del encabezado `Authorization` y carga el usuario en `req.user` |
| `middleware/project.ts` | `projectExists`: busca el proyecto de la URL y lo carga en `req.project` |
| `middleware/task.ts` | `taskExists`, `taskBelongsToProject` y `hasAuthorization` (verifica que el usuario sea el administrador del proyecto) |
| `middleware/validation.ts` | `handleInputErrors`: responde con `400` si `express-validator` encontró errores |
| `models/User.ts` | Usuario con correo único, contraseña hasheada, nombre y estado de confirmación |
| `models/Token.ts` | Código de 6 dígitos asociado a un usuario. Se elimina automáticamente a los 10 minutos con un índice TTL |
| `models/Project.ts` | Proyecto con su administrador (`manager`), equipo (`team`) y tareas. Elimina sus tareas y notas al eliminarse |
| `models/Task.ts` | Tarea con su estado, historial de cambios (`completedBy`) y notas. Elimina sus notas al eliminarse |
| `models/Note.ts` | Nota con su contenido, autor y tarea |
| `emails/AuthEmail.ts` | Envía con Resend los correos de confirmación de cuenta y de recuperación de contraseña. Conserva comentada la versión con Nodemailer usada en desarrollo |
| `utils/auth.ts` | Funciones `hashPassword` y `checkPassword` con bcrypt |
| `utils/jwt.ts` | Función `generateJWT`, con expiración de 180 días |
| `utils/token.ts` | Función `generateToken`, que genera el código numérico de 6 dígitos |
 
## 🔌 Endpoints de la API
 
**Autenticación (`/api/auth`)**
 
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/create-account` | Crea la cuenta y envía el código de confirmación |
| `POST` | `/confirm-account` | Confirma la cuenta con el código recibido |
| `POST` | `/login` | Inicia sesión y devuelve el JWT |
| `POST` | `/request-code` | Solicita un nuevo código de confirmación |
| `POST` | `/forgot-password` | Envía el código para restablecer la contraseña |
| `POST` | `/validate-token` | Valida el código recibido |
| `POST` | `/update-password/:token` | Define una nueva contraseña con el código |
| `GET` | `/user` | Devuelve el usuario autenticado 🔒 |
| `PUT` | `/profile` | Actualiza el nombre y el correo 🔒 |
| `POST` | `/update-password` | Cambia la contraseña del usuario autenticado 🔒 |
| `POST` | `/check-password` | Verifica la contraseña del usuario autenticado 🔒 |
 
**Proyectos (`/api/projects`)** — todas las rutas requieren autenticación 🔒. Las marcadas con 👑 solo las puede usar el administrador del proyecto.
 
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/` | Crea un proyecto |
| `GET` | `/` | Lista los proyectos que administra o en los que colabora |
| `GET` | `/:id` | Obtiene un proyecto con sus tareas |
| `PUT` | `/:projectId` | Actualiza un proyecto 👑 |
| `DELETE` | `/:projectId` | Elimina un proyecto 👑 |
| `POST` | `/:projectId/tasks` | Crea una tarea 👑 |
| `GET` | `/:projectId/tasks` | Lista las tareas del proyecto |
| `GET` | `/:projectId/tasks/:taskId` | Obtiene una tarea con sus notas y su historial de estados |
| `PUT` | `/:projectId/tasks/:taskId` | Actualiza una tarea 👑 |
| `DELETE` | `/:projectId/tasks/:taskId` | Elimina una tarea 👑 |
| `POST` | `/:projectId/tasks/:taskId/status` | Cambia el estado de una tarea |
| `POST` | `/:projectId/team/find` | Busca un usuario por correo |
| `GET` | `/:projectId/team` | Lista los colaboradores del proyecto |
| `POST` | `/:projectId/team` | Agrega un colaborador por su id |
| `DELETE` | `/:projectId/team/:userId` | Elimina un colaborador |
| `POST` | `/:projectId/tasks/:taskId/notes` | Crea una nota en la tarea |
| `GET` | `/:projectId/tasks/:taskId/notes` | Lista las notas de la tarea |
| `DELETE` | `/:projectId/tasks/:taskId/notes/:noteId` | Elimina una nota (solo su autor) |
 
## 🧠 Cómo funciona
 
**Autenticación**
1. En `create-account`, `express-validator` comprueba el nombre, el correo, que la contraseña tenga mínimo 8 caracteres y que la confirmación coincida.
2. El controlador verifica que el correo no esté registrado (responde `409` si ya existe), hashea la contraseña con bcrypt, genera un código de 6 dígitos guardado como `Token` y envía el correo de confirmación (con Resend en producción).
3. `confirm-account` busca el código; si existe, marca al usuario como confirmado y elimina el token. Los tokens también expiran solos a los 10 minutos gracias al índice TTL de MongoDB.
4. En `login`, se verifica que el usuario exista y esté confirmado. Si no lo está, se envía un nuevo código y se responde `401`. Si lo está, se compara la contraseña con bcrypt y se devuelve un JWT firmado con `JWT_SECRET`.
5. En las rutas protegidas, el middleware `authenticate` lee el encabezado `Authorization: Bearer <token>`, verifica el JWT y carga el usuario en `req.user`.
6. Para recuperar la contraseña, `forgot-password` genera y envía un código, `validate-token` lo comprueba y `update-password/:token` guarda la nueva contraseña hasheada y elimina el token.

**Proyectos y tareas**

7. Al crear un proyecto, el usuario autenticado queda como `manager`. `GET /` devuelve los proyectos donde el usuario es administrador o forma parte del equipo.
8. `router.param` ejecuta `projectExists` y `taskExists` cada vez que la ruta incluye `:projectId` o `:taskId`, y deja el proyecto y la tarea disponibles en `req`. `taskBelongsToProject` verifica que la tarea pertenezca al proyecto indicado.
9. `hasAuthorization` comprueba que el usuario autenticado sea el administrador del proyecto. Se aplica a editar y eliminar proyectos, y a crear, editar y eliminar tareas.
10. Al crear una tarea, se asocia al proyecto y su id se agrega al arreglo `tasks` del proyecto. Cada cambio de estado se registra en `completedBy` junto con el usuario que lo hizo.
11. Al eliminar una tarea, se quita del proyecto y un middleware de Mongoose elimina sus notas. Al eliminar un proyecto, otro middleware elimina primero las notas de sus tareas y luego las tareas.
 
**Colaboradores y notas**

12. Para agregar un colaborador, primero se busca al usuario por correo y luego se agrega por su id al arreglo `team`. Si ya pertenece al proyecto, se responde `409`.
13. Cada nota se guarda con su autor y su tarea, y su id se agrega al arreglo `notes` de la tarea. Al eliminarla, se verifica que quien lo solicita sea su autor.
 
## 📚 Conceptos aplicados
 
- Arquitectura por capas: rutas, middleware, controladores y modelos.
- Autenticación con **JWT** y autorización según el rol del usuario en el proyecto (administrador o colaborador).
- Hash de contraseñas con **bcrypt**.
- Códigos temporales con expiración automática mediante un **índice TTL** de MongoDB.
- Modelado con **Mongoose** y TypeScript: referencias entre colecciones (`ref`), `populate`, `PopulatedDoc` y timestamps.
- Middleware de Mongoose (`pre('deleteOne')`) para eliminar documentos relacionados en cascada.
- Middleware encadenados y `router.param` para precargar recursos antes de los controladores.
- Extensión de los tipos de Express (`Request.user`, `Request.project` y `Request.task`) con `declare global`.
- Operaciones simultáneas con `Promise.allSettled`.
- Validación de entradas con **express-validator**, incluyendo validadores personalizados y de ID de MongoDB.
- Envío de correos transaccionales con **Resend** en producción y con **Nodemailer** y **Mailtrap** en desarrollo.
- **CORS** con lista blanca de orígenes definida por variable de entorno.
- Uso adecuado de códigos de estado HTTP (`400`, `401`, `404`, `409` y `500`).
- Variables de entorno para separar la configuración del código.
## 🚀 Cómo ejecutar el proyecto
 
1. Clonar el repositorio:
```bash
   git clone https://github.com/andresmdevco/yourtask-backend.git
   cd yourtask-backend
```
2. Instalar las dependencias:
```bash
   npm install
```
3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```bash
   DATABASE_URL=tu_url_de_mongodb
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=tu_clave_secreta
   # Correos en producción (Resend)
   RESEND_API_KEY=tu_api_key_de_resend
   # Correos en desarrollo (Nodemailer + Mailtrap)
   SMTP_HOST=
   SMTP_PORT=
   SMTP_USER=
   SMTP_PASS=
```
4. Ejecutar el servidor en modo desarrollo:
```bash
   npm run dev
```
5. La API estará disponible en [http://localhost:4000/api](http://localhost:4000/api)
**Probar la API con Postman o Thunder Client**
 
Por defecto, CORS solo acepta peticiones desde `FRONTEND_URL`. Para probar los endpoints con una herramienta que no envía origen, ejecuta el servidor con el argumento `--api`:
```bash
   npm run dev:api
```
 
**Envío de correos en desarrollo**
 
En producción los correos se envían con Resend. Para desarrollo, el proyecto incluye una versión con Nodemailer y [Mailtrap](https://mailtrap.io), que captura los mensajes sin enviarlos a destinatarios reales. Para usarla, en `src/emails/AuthEmail.ts`:
 
1. Comenta el import de `resend` y la clase `AuthEmail` que lo usa.
2. Descomenta el import de `transporter` y la clase `AuthEmail` que usa Nodemailer.
3. Completa las variables `SMTP_*` del `.env` con las credenciales de tu inbox de Mailtrap.
Con esa versión activa no es necesario definir `RESEND_API_KEY`.
 

> Los correos se envían desde `admin@yourtask.tech`. Para usar tu propia cuenta de Resend, cambia el remitente en `src/emails/AuthEmail.ts` por un dominio verificado en tu cuenta.
