# DentalTurnos - Sistema de Gestión Odontológica

Proyecto Integrador para la materia **Práctica Profesionalizante II (PP2)** del IFTS N° 16.
El sistema es un MVP (Producto Mínimo Viable) diseñado para digitalizar la gestión de turnos de un consultorio odontológico.

## Descripción del Proyecto

El consultorio "Sonrisa Sana" gestionaba sus turnos de forma manual (libreta y WhatsApp), lo que generaba pérdida de tiempo y ausentismo. **DentalTurnos** resuelve esto permitiendo a los pacientes reservar turnos online de manera autónoma y brindando a los odontólogos un panel de administración centralizado.

## Tecnologías Utilizadas

- **Backend:** Node.js + Express
- **Frontend:** EJS (Embedded JavaScript templates) + CSS puro
- **Base de Datos:** PostgreSQL alojado en **Supabase**
- **Autenticación:** Express-Session + Bcrypt (encriptación de contraseñas)
- **Control de Versiones:** Git y GitHub

## Características de Seguridad

- **Roles definidos:** Separación estricta entre el panel de Paciente y el de Administrador (Odontólogo).
- **Contraseñas Encriptadas:** Uso de `bcryptjs` para el hash de contraseñas en la base de datos.
- **Row Level Security (RLS):** Políticas de seguridad configuradas en Supabase.
- **Variables de Entorno:** Las credenciales sensibles están protegidas en el archivo `.env` (excluido del repositorio mediante `.gitignore`).

## Instalación y Ejecución Local

Si deseas correr este proyecto en tu computadora, seguí estos pasos:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Afra19-commits/pp2_dental_turnos.git
   ```
2. Instalar las dependencias:

   bash
   npm install

3. Crear un archivo .env en la raíz del proyecto con las siguientes variables:

   env
   PORT=3000
   SUPABASE_URL=tu_url_de_supabase
   SUPABASE_KEY=tu_anon_key
   SESSION_SECRET=tu_secreto

4. Iniciar el servidor:

   bash
   node app.js
   Abrir en el navegador: http://localhost:3000

5. Roles y Accesos de Prueba
   Administrador (Odontólogo):

   Email: admin@test.com

   Contraseña: admin123

   Desarrollado por Airam Francis Rojas Álvarez, como Proyecto académico para la materia Practica Profesionalizante 2, Tecnicatura Superior en Desarrollo de Software IFTS N° 16 - Ciclo Lectivo 2026.
