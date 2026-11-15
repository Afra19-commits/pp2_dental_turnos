require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
const path = require("path"); // <-- ESTA LÍNEA FALTABA

const app = express();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

// Configuraciones básicas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // <-- ESTA LÍNEA FALTABA
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

// --- RUTAS ---

// 1. Redirigir al login
app.get("/", (req, res) => res.redirect("/login"));

// 2. Mostrar Login
app.get("/login", (req, res) => res.render("login", { error: null }));

// 3. Procesar Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data: user, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user)
    return res.render("login", { error: "Usuario no encontrado" });

  // Comparar contraseña encriptada
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.render("login", { error: "Contraseña incorrecta" });

  // Guardar datos en sesión
  req.session.user = { id: user.id, nombre: user.nombre, rol: user.rol };

  // Decisión de Software: Redirigir según el Rol
  if (user.rol === "admin") res.redirect("/admin");
  else res.redirect("/paciente");
});

// 4. Panel del Paciente (Cliente)
app.get("/paciente", async (req, res) => {
  if (!req.session.user || req.session.user.rol !== "paciente")
    return res.redirect("/login");

  const { data: turnos } = await supabase
    .from("turnos")
    .select("*")
    .eq("usuario_id", req.session.user.id);
  res.render("cliente", { user: req.session.user, turnos: turnos || [] });
});

// 5. Panel del Odontólogo (Admin)
app.get("/admin", async (req, res) => {
  if (!req.session.user || req.session.user.rol !== "admin")
    return res.redirect("/login");

  // El admin ve todos los turnos del consultorio
  const { data: turnos } = await supabase.from("turnos").select("*");
  res.render("admin", { user: req.session.user, turnos: turnos || [] });
});

// 6. Reservar Turno (Solo Paciente)
app.post("/reservar", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  const { paciente_nombre, fecha, hora, tratamiento } = req.body;

  await supabase.from("turnos").insert([
    {
      usuario_id: req.session.user.id,
      paciente_nombre,
      fecha,
      hora,
      tratamiento,
    },
  ]);
  res.redirect("/paciente");
});

// 7. Cerrar Sesión
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// Levantar Servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Servidor corriendo en http://localhost:${process.env.PORT || 3000}`,
  );
});
