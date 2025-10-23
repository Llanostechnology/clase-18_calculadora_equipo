
// Calculadora: suma, resta, multiplicación, división, seno, coseno, tangente, raíz cuadrada
const $ = selector => document.querySelector(selector);

const valueA = $('#valueA');
const valueB = $('#valueB');
const output = $('#output');
const error = $('#error');
const angleMode = $('#angleMode');

function parseNumber(str) {
	if (str === null || str === undefined) return NaN;
	// aceptar comas o puntos
	const normalized = String(str).trim().replace(',', '.');
	return normalized === '' ? NaN : Number(normalized);
}

function toRadiansIfNeeded(val) {
	return angleMode.value === 'deg' ? val * Math.PI / 180 : val;
}

function clearError() {
	error.textContent = '';
}

function showError(msg) {
	error.textContent = msg;
}

function setResult(value) {
	output.textContent = typeof value === 'number' && !isFinite(value) ? String(value) : value;
}

function doBinaryOp(op) {
	clearError();
	const a = parseNumber(valueA.value);
	const b = parseNumber(valueB.value);
	if (Number.isNaN(a) || Number.isNaN(b)) return showError('Ingrese números válidos en A y B.');

	let res;
	switch (op) {
		case 'add': res = a + b; break;
		case 'sub': res = a - b; break;
		case 'mul': res = a * b; break;
		case 'div':
			if (b === 0) return showError('Error: división por cero');
			res = a / b; break;
		default: return showError('Operación desconocida');
	}
	setResult(res);
}

function doUnaryOp(op) {
	clearError();
	const a = parseNumber(valueA.value);
	if (Number.isNaN(a)) return showError('Ingrese un número válido en A.');

	let res;
	switch (op) {
		case 'sin': res = Math.sin(toRadiansIfNeeded(a)); break;
		case 'cos': res = Math.cos(toRadiansIfNeeded(a)); break;
		case 'tan': res = Math.tan(toRadiansIfNeeded(a)); break;
		case 'sqrt':
			if (a < 0) return showError('Error: raíz de número negativo');
			res = Math.sqrt(a); break;
		default: return showError('Operación desconocida');
	}
	setResult(res);
}

document.addEventListener('click', (e) => {
	const btn = e.target.closest('button[data-op]');
	if (!btn) return;
	const op = btn.dataset.op;
	if (['add','sub','mul','div'].includes(op)) doBinaryOp(op);
	else doUnaryOp(op);
});

// atajos de teclado: Enter para sumar por defecto
document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') doBinaryOp('add');
});

