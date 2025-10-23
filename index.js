const display = document.getElementById("display");
const themeSwitch = document.getElementById("themeSwitch");
const themeLabel = document.getElementById("themeLabel");

// ✅ Agregar texto al display
function append(value) {
  display.value += value;
}

// ✅ Limpiar pantalla
function clearDisplay() {
  display.value = "";
}

// ✅ Borrar último carácter
function backspace() {
  display.value = display.value.slice(0, -1);
}

// ✅ Calcular expresión
function calculate() {
  try {
    let expression = display.value.replace(/%/g, "/100");
    display.value = eval(expression);
  } catch {
    display.value = "Error";
  }
}

// ✅ Raíz cuadrada
function sqrt() {
  try {
    display.value = Math.sqrt(parseFloat(display.value));
  } catch {
    display.value = "Error";
  }
}

// ✅ Seno (en grados)
function sin() {
  try {
    let radians = parseFloat(display.value) * (Math.PI / 180);
    display.value = Math.sin(radians).toFixed(6);
  } catch {
    display.value = "Error";
  }
}

// ✅ Coseno (en grados)
function cos() {
  try {
    let radians = parseFloat(display.value) * (Math.PI / 180);
    display.value = Math.cos(radians).toFixed(6);
  } catch {
    display.value = "Error";
  }
}

// ✅ Soporte de teclado
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    append(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

// ✅ Cambiar entre modo claro / oscuro
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  themeLabel.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});