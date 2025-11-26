
function formatNumberWithDots(value) {
    // Elimina todo excepto dígitos
    value = value.replace(/\D/g, "");
    if (!value) return "";
    // Formatea con puntos cada 3 dígitos
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function setupInputFormatting() {
    const capitalInput = document.getElementById('capital');
    const finalInput = document.getElementById('final');
    const diasInput = document.getElementById('dias');

    function validateCapital(showError = false) {
        const errorDiv = document.getElementById('error-capital');
        const value = capitalInput.dataset.raw || "";
        if (showError && (!value || parseFloat(value) <= 0)) {
            errorDiv.textContent = "Ingresa un capital válido (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }
    function validateFinal(showError = false) {
        const errorDiv = document.getElementById('error-final');
        const capital = parseFloat(capitalInput.dataset.raw || "0");
        const value = finalInput.dataset.raw || "";
        if (showError && (!value || parseFloat(value) <= capital)) {
            errorDiv.textContent = "El monto final debe ser mayor al capital";
        } else {
            errorDiv.textContent = "";
        }
    }
    function validateDias(showError = false) {
        const errorDiv = document.getElementById('error-dias');
        const value = diasInput.value;
        if (showError && (!value || parseInt(value) <= 0)) {
            errorDiv.textContent = "Ingresa una cantidad de días válida (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }

    capitalInput.addEventListener('input', function(e) {
        let raw = capitalInput.value.replace(/\./g, "").replace(/[^\d,]/g, "");
        capitalInput.dataset.raw = raw.replace(/,/g, ".");
        let parts = raw.split(/[,]/);
        let intPart = parts[0];
        let decPart = parts[1] || "";
        let formattedInt = formatNumberWithDots(intPart);
        let formatted = decPart ? formattedInt + "," + decPart : formattedInt;
        capitalInput.value = formatted;
        capitalInput.setSelectionRange(capitalInput.value.length, capitalInput.value.length);
    });
    finalInput.addEventListener('input', function(e) {
        let raw = finalInput.value.replace(/\./g, "").replace(/[^\d,]/g, "");
        finalInput.dataset.raw = raw.replace(/,/g, ".");
        let parts = raw.split(/[,]/);
        let intPart = parts[0];
        let decPart = parts[1] || "";
        let formattedInt = formatNumberWithDots(intPart);
        let formatted = decPart ? formattedInt + "," + decPart : formattedInt;
        finalInput.value = formatted;
        finalInput.setSelectionRange(finalInput.value.length, finalInput.value.length);
    });
    diasInput.addEventListener('input', function(e) {
        // Solo formatea, sin validar
    });

    // Exponer funciones para validar cuando se presiona el botón
    window.validateInversionFields = function() {
        validateCapital(true);
        validateFinal(true);
        validateDias(true);
    };
}
window.addEventListener('DOMContentLoaded', setupInputFormatting);


// Formateo para el campo dinero en el nuevo form
function setupDineroFormatting() {
    const dineroInput = document.getElementById('dinero');
    const tnaInput = document.getElementById('tna_rend');
    const tiempoInput = document.getElementById('tiempo');
    if (!dineroInput || !tnaInput || !tiempoInput) return;

    function validateDinero(showError = false) {
        const errorDiv = document.getElementById('error-dinero');
        const value = dineroInput.dataset.raw || "";
        if (showError && (!value || parseFloat(value) <= 0)) {
            errorDiv.textContent = "Ingresa un monto válido (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }
    function validateTNA(showError = false) {
        const errorDiv = document.getElementById('error-tna_rend');
        const value = tnaInput.value;
        if (showError && (!value || parseFloat(value) <= 0)) {
            errorDiv.textContent = "Ingresa una TNA válida (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }
    function validateTiempo(showError = false) {
        const errorDiv = document.getElementById('error-tiempo');
        const value = tiempoInput.value;
        if (showError && (!value || parseInt(value) <= 0)) {
            errorDiv.textContent = "Ingresa una cantidad de días válida (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }

    dineroInput.addEventListener('input', function(e) {
        let raw = dineroInput.value.replace(/\./g, "").replace(/[^\d,]/g, "");
        dineroInput.dataset.raw = raw.replace(/,/g, ".");
        let parts = raw.split(/[,]/);
        let intPart = parts[0];
        let decPart = parts[1] || "";
        let formattedInt = formatNumberWithDots(intPart);
        let formatted = decPart ? formattedInt + "," + decPart : formattedInt;
        dineroInput.value = formatted;
        dineroInput.setSelectionRange(dineroInput.value.length, dineroInput.value.length);
    });
    tnaInput.addEventListener('input', function(e) {
        // Solo formatea, sin validar
    });
    tiempoInput.addEventListener('input', function(e) {
        // Solo formatea, sin validar
    });

    // Exponer funciones para validar cuando se presiona el botón
    window.validateRendimientoFields = function() {
        validateDinero(true);
        validateTNA(true);
        validateTiempo(true);
    };
}

window.addEventListener('DOMContentLoaded', setupDineroFormatting);
// Calculadora de rendimiento e interés total
function calcularRendimiento() {
    // Validar campos primero
    window.validateRendimientoFields();

    const dineroInput = document.getElementById('dinero');
    const tnaInput = document.getElementById('tna_rend');
    const tiempoInput = document.getElementById('tiempo');

    const dinero = parseFloat(dineroInput.dataset.raw || "0");
    const tna = parseFloat(tnaInput.value);
    const tiempo = parseInt(tiempoInput.value);
    const diasAnio = 365;

    const resultadoRendimiento = document.getElementById('resultado_rendimiento');
    const resultadoInteres = document.getElementById('resultado_interes');

    const valoresValidos = !isNaN(dinero) && dinero > 0 && !isNaN(tna) && tna > 0 && !isNaN(tiempo) && tiempo > 0;

    if (valoresValidos) {
        // Fórmula de rendimiento total: dinero * (1 + (tna/100) * (tiempo/diasAnio))
        const rendimientoTotal = dinero * (1 + (tna / 100) * (tiempo / diasAnio));
        const interesGanado = rendimientoTotal - dinero;
        resultadoRendimiento.textContent = `Rendimiento total: $${rendimientoTotal.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
        resultadoInteres.textContent = `Interés total ganado: $${interesGanado.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
        resultadoRendimiento.classList.add('fade-in');
        resultadoInteres.classList.add('fade-in');
        setTimeout(() => {
            resultadoRendimiento.classList.remove('fade-in');
            resultadoInteres.classList.remove('fade-in');
        }, 800);
        // Guardar en historial
        agregarHistorial('rendimiento', {
            dinero,
            tna,
            tiempo,
            rendimientoTotal: rendimientoTotal.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2}),
            interesGanado: interesGanado.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})
        });
    } else {
        resultadoRendimiento.classList.add('fade-in');
        resultadoInteres.classList.add('fade-in');
        setTimeout(() => {
            resultadoRendimiento.classList.remove('fade-in');
            resultadoInteres.classList.remove('fade-in');
        }, 800);
    }
}

function calcularInversion() {
    // Validar campos primero
    window.validateInversionFields();

    // Tomar el valor sin puntos desde data-raw
    const capitalInput = document.getElementById('capital');
    const finalInput = document.getElementById('final');
    const capital = parseFloat(capitalInput.dataset.raw || "0");
    const montoFinal = parseFloat(finalInput.dataset.raw || "0");
    const dias = parseInt(document.getElementById('dias').value);
    const diasAnio = 365;

    const resultadoTNA = document.getElementById('resultado_tna');
    const resultadoTEA = document.getElementById('resultado_tea');
    const resultadoTNM = document.getElementById('resultado_tnm');
    const resultadoTEM = document.getElementById('resultado_tem');

    const valoresValidos = !isNaN(capital) && capital > 0 && !isNaN(montoFinal) && montoFinal > capital && !isNaN(dias) && dias > 0;

    if (valoresValidos) {
        // TNA
        const tna = ((montoFinal - capital) / capital) * (diasAnio / dias) * 100;
        resultadoTNA.textContent = `TNA: ${tna.toFixed(2)}%`;

        // TEA
        const tea = Math.pow((montoFinal / capital), (diasAnio / dias)) - 1;
        resultadoTEA.textContent = `TEA: ${(tea * 100).toFixed(2)}%`;

        const tnm = tna / 12;
        resultadoTNM.textContent = `TNM: ${tnm.toFixed(2)}%`;
        const tem = tea / 12;
        resultadoTEM.textContent = `TEM: ${(tem * 100).toFixed(2)}%`;

        [resultadoTNA, resultadoTEA, resultadoTNM, resultadoTEM].forEach(el => {
            el.classList.add('fade-in');
            setTimeout(() => el.classList.remove('fade-in'), 800);
        });

        // Guardar en historial
        agregarHistorial('inversion', {
            capital,
            montoFinal,
            dias,
            tna: tna.toFixed(2),
            tea: (tea * 100).toFixed(2),
            tnm: tnm.toFixed(2),
            tem: (tem * 100).toFixed(2)
        });
    } else {
        [resultadoTNA, resultadoTEA, resultadoTNM, resultadoTEM].forEach(el => {
            el.classList.add('fade-in');
            setTimeout(() => el.classList.remove('fade-in'), 800);
        });
    }
}

// --- Historial de cálculos ---
function agregarHistorial(tipo, datos) {
    const key = tipo === 'inversion' ? 'historialInversion' : 'historialRendimiento';
    let historial = JSON.parse(localStorage.getItem(key) || '[]');
    historial.unshift(datos);
    if (historial.length > 10) historial = historial.slice(0, 10); // Solo los últimos 10
    localStorage.setItem(key, JSON.stringify(historial));
    renderizarHistorial(tipo);
}

function renderizarHistorial(tipo) {
    const key = tipo === 'inversion' ? 'historialInversion' : 'historialRendimiento';
    const historial = JSON.parse(localStorage.getItem(key) || '[]');
    const ul = document.getElementById(tipo === 'inversion' ? 'historial-inversion' : 'historial-rendimiento');
    ul.innerHTML = '';
    if (historial.length === 0) {
        ul.innerHTML = '<li style="color:#888;font-size:0.95rem;background:transparent;border:none;padding:0;box-shadow:none;">Sin cálculos recientes.</li>';
        return;
    }
    const item = historial[0];
    if (tipo === 'inversion') {
        ul.innerHTML += `<li>
            <strong>Capital:</strong> $${item.capital.toLocaleString('es-AR')}<br>
            <strong>Final:</strong> $${item.montoFinal.toLocaleString('es-AR')}<br>
            <strong>Días:</strong> ${item.dias}<br>
            <strong>TNA:</strong> ${item.tna}%<br>
            <strong>TEA:</strong> ${item.tea}%<br>
            <strong>TNM:</strong> ${item.tnm}%<br>
            <strong>TEM:</strong> ${item.tem}%
        </li>`;
    } else {
        ul.innerHTML += `<li>
            <strong>Dinero:</strong> $${item.dinero.toLocaleString('es-AR')}<br>
            <strong>TNA:</strong> ${item.tna}%<br>
            <strong>Días:</strong> ${item.tiempo}<br>
            <strong>Rendimiento:</strong> $${item.rendimientoTotal}<br>
            <strong>Interés:</strong> $${item.interesGanado}
        </li>`;
    }
}

function borrarHistorial(tipo) {
    const key = tipo === 'inversion' ? 'historialInversion' : 'historialRendimiento';
    localStorage.removeItem(key);
    renderizarHistorial(tipo);
}

window.addEventListener('DOMContentLoaded', function() {
    renderizarHistorial('inversion');
    renderizarHistorial('rendimiento');
});
