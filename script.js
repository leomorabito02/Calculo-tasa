
// Función para toggle del menú de índice en mobile
function toggleMobileIndex() {
    const menu = document.getElementById('mobile-index-menu');
    menu.classList.toggle('active');
}

// Cerrar menú al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', function() {
    const indexLinks = document.querySelectorAll('.index-link');
    indexLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('mobile-index-menu');
            menu.classList.remove('active');
        });
    });
});

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

// Formateo y validación para interés compuesto
function setupCompoundFormatting() {
    const capitalInput = document.getElementById('compound-capital');
    const tnaInput = document.getElementById('compound-tna');
    const plazoInput = document.getElementById('compound-plazo');
    
    if (!capitalInput || !tnaInput || !plazoInput) return;

    function validateCompoundCapital(showError = false) {
        const errorDiv = document.getElementById('error-compound-capital');
        const value = capitalInput.dataset.raw || "";
        if (showError && (!value || parseFloat(value) <= 0)) {
            errorDiv.textContent = "Ingresa un capital válido (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }
    function validateCompoundTNA(showError = false) {
        const errorDiv = document.getElementById('error-compound-tna');
        const value = tnaInput.value;
        if (showError && (!value || parseFloat(value) <= 0)) {
            errorDiv.textContent = "Ingresa una TNA válida (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }
    function validateCompoundPlazo(showError = false) {
        const errorDiv = document.getElementById('error-compound-plazo');
        const value = plazoInput.value;
        if (showError && (!value || parseInt(value) <= 0)) {
            errorDiv.textContent = "Ingresa un plazo válido (> 0)";
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
    tnaInput.addEventListener('input', function(e) {
        // Solo formatea, sin validar
    });
    plazoInput.addEventListener('input', function(e) {
        // Solo formatea, sin validar
    });

    // Exponer funciones para validar cuando se presiona el botón
    window.validateCompoundFields = function() {
        validateCompoundCapital(true);
        validateCompoundTNA(true);
        validateCompoundPlazo(true);
    };
}

window.addEventListener('DOMContentLoaded', setupCompoundFormatting);
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

function renderizarHistorialCompuesto(tipo = 'compuesto') {
    const historial = JSON.parse(localStorage.getItem('historialCompuesto') || '[]');
    const ul = document.getElementById('historial-compuesto');
    ul.innerHTML = '';
    if (historial.length === 0) {
        ul.innerHTML = '<li style="color:#888;font-size:0.95rem;background:transparent;border:none;padding:0;box-shadow:none;">Sin cálculos recientes.</li>';
        return;
    }
    const item = historial[0];
    ul.innerHTML = `<li>
        <strong>Capital:</strong> $${item.capital.toLocaleString('es-AR')}<br>
        <strong>Final:</strong> $${item.montoFinal.toLocaleString('es-AR')}<br>
        <strong>Interés:</strong> $${item.interesGanado.toLocaleString('es-AR')}<br>
        <strong>Plazo:</strong> ${item.meses} mes/es<br>
        <strong>Frecuencia:</strong> ${item.frecuencia}<br>
        <strong>Tasa:</strong> ${item.tasa}% ${item.tipoTasa}
    </li>`;
}

function renderizarHistorialComparador(tipo = 'comparador') {
    const historial = JSON.parse(localStorage.getItem('historialComparador') || '[]');
    const ul = document.getElementById('historial-comparador');
    ul.innerHTML = '';
    if (historial.length === 0) {
        ul.innerHTML = '<li style="color:#888;font-size:0.95rem;background:transparent;border:none;padding:0;box-shadow:none;">Sin cálculos recientes.</li>';
        return;
    }
    const item = historial[0];
    const mejor = item.diferenciaAbsoluta > 0 ? 'Plazo Fijo' : 'Billetera Virtual';
    ul.innerHTML = `<li>
        <strong>Capital:</strong> $${item.capital.toLocaleString('es-AR')}<br>
        <strong>Plazo Fijo Final:</strong> $${item.montoFinalPlazoFijo.toLocaleString('es-AR')}<br>
        <strong>Billetera Final:</strong> $${item.montoFinalBilletera.toLocaleString('es-AR')}<br>
        <strong>Diferencia:</strong> $${Math.abs(item.diferenciaAbsoluta).toLocaleString('es-AR')}<br>
        <strong>Mejor:</strong> ${mejor}<br>
        <strong>Período:</strong> ${item.periodo} días
    </li>`;
}

window.addEventListener('DOMContentLoaded', function() {
    renderizarHistorial('inversion');
    renderizarHistorial('rendimiento');
    renderizarHistorialCompuesto();
    renderizarHistorialComparador();
});

// Simulador de Interés Compuesto
function calcularCompuesto() {
    // Validar campos primero
    window.validateCompoundFields();

    const capitalInput = document.getElementById('compound-capital');
    const tnaInput = document.getElementById('compound-tna');
    const plazoInput = document.getElementById('compound-plazo');
    const frecuenciaInput = document.getElementById('compound-frecuencia');
    
    const capital = parseFloat(capitalInput.dataset.raw || "0");
    const tna = parseFloat(tnaInput.value);
    const plazoMeses = parseInt(plazoInput.value);
    const frecuenciaDias = parseInt(frecuenciaInput.value);
    
    // Validar
    if (!capital || capital <= 0 || !tna || tna <= 0 || !plazoMeses || plazoMeses <= 0) {
        return;
    }
    
    // Convertir plazo de meses a años
    const plazoAnios = plazoMeses / 12;
    
    // Calcular parámetros
    const m = 365 / frecuenciaDias; // Frecuencia de capitalización anual (puede ser decimal)
    const n = plazoAnios; // Años
    const i = tna / 100; // Tasa anual en decimal
    const periodosTotal = Math.round(plazoMeses / (frecuenciaDias / 30)); // Total de períodos
    const tasaPeriodo = i / m; // Tasa por período
    
    // Generar tabla
    let html = '<table class="compound-table"><thead><tr>';
    html += '<th>Período</th><th>Días acumulados</th><th>Monto</th><th>Interés ganado</th>';
    html += '</tr></thead><tbody>';
    
    let montoActual = capital;
    let diasAcumulados = 0;
    
    for (let p = 1; p <= periodosTotal; p++) {
        const montoAnterior = montoActual;
        montoActual = capital * Math.pow(1 + tasaPeriodo, p);
        const interesGanado = montoActual - capital;
        diasAcumulados = Math.round(p * frecuenciaDias);
        
        let nombrePeriodo = '';
        if (frecuenciaDias === 1) nombrePeriodo = `Día ${p}`;
        else if (frecuenciaDias === 7) nombrePeriodo = `Semana ${p}`;
        else if (frecuenciaDias === 14) nombrePeriodo = `Quincena ${p}`;
        else if (frecuenciaDias === 30) nombrePeriodo = `Mes ${p}`;
        else if (frecuenciaDias === 60) nombrePeriodo = `Bimestre ${p}`;
        else if (frecuenciaDias === 90) nombrePeriodo = `Trimestre ${p}`;
        else if (frecuenciaDias === 180) nombrePeriodo = `Semestre ${p}`;
        else if (frecuenciaDias === 365) nombrePeriodo = `Año ${p}`;
        
        html += '<tr>';
        html += `<td>${nombrePeriodo}</td>`;
        html += `<td>${diasAcumulados}</td>`;
        html += `<td>$${montoActual.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>`;
        html += `<td>$${interesGanado.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>`;
        html += '</tr>';
    }
    
    html += '</tbody></table>';
    
    // Resumen
    const interesTotal = montoActual - capital;
    const rendimientoPorcentaje = ((montoActual - capital) / capital) * 100;
    
    html += `<div class="compound-summary">
        <strong>Monto final:</strong> $${montoActual.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}<br>
        <strong>Interés total ganado:</strong> $${interesTotal.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}<br>
        <strong>Rendimiento:</strong> ${rendimientoPorcentaje.toFixed(2)}%
    </div>`;
    
    // Agregar al historial
    const datosCompuesto = {
        capital: capital,
        tna: tna,
        tasa: tna,
        tipoTasa: 'TNA',
        meses: plazoMeses,
        plazoMeses: plazoMeses,
        frecuenciaDias: frecuenciaDias,
        frecuencia: frecuenciaInput.options[frecuenciaInput.selectedIndex].text,
        montoFinal: montoActual,
        interesGanado: interesTotal,
        interesTotal: interesTotal,
        rendimiento: rendimientoPorcentaje
    };
    agregarHistorialCompuesto(datosCompuesto);
    renderizarHistorialCompuesto();
    
    document.getElementById('compound-results').innerHTML = html;
}

// --- Historial de Interés Compuesto ---
function agregarHistorialCompuesto(datos) {
    let historial = JSON.parse(localStorage.getItem('historialCompuesto') || '[]');
    historial.unshift(datos);
    if (historial.length > 10) historial.pop(); // Solo los últimos 10
    localStorage.setItem('historialCompuesto', JSON.stringify(historial));
}

// --- Historial de Comparador ---
function agregarHistorialComparador(datos) {
    let historial = JSON.parse(localStorage.getItem('historialComparador') || '[]');
    historial.unshift(datos);
    if (historial.length > 10) historial.pop(); // Solo los últimos 10
    localStorage.setItem('historialComparador', JSON.stringify(historial));
}

// Formateo y validación para comparador de instrumentos
function setupComparadorFormatting() {
    const capitalInput = document.getElementById('comparador-capital');
    const plazoFijoInput = document.getElementById('comparador-plazo-fijo-tna');
    const bilgeteraInput = document.getElementById('comparador-billetera-tna');
    const periodoInput = document.getElementById('comparador-periodo');
    
    if (!capitalInput || !plazoFijoInput || !bilgeteraInput || !periodoInput) return;

    function validateComparadorCapital(showError = false) {
        const errorDiv = document.getElementById('error-comparador-capital');
        const value = capitalInput.dataset.raw || "";
        if (showError && (!value || parseFloat(value) <= 0)) {
            errorDiv.textContent = "Ingresa un monto válido (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }
    function validateComparadorPlazoFijo(showError = false) {
        const errorDiv = document.getElementById('error-comparador-plazo-fijo-tna');
        const value = plazoFijoInput.value;
        if (showError && (!value || parseFloat(value) <= 0)) {
            errorDiv.textContent = "Ingresa una TNA válida (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }
    function validateComparadorBilletera(showError = false) {
        const errorDiv = document.getElementById('error-comparador-billetera-tna');
        const value = bilgeteraInput.value;
        if (showError && (!value || parseFloat(value) <= 0)) {
            errorDiv.textContent = "Ingresa una TNA válida (> 0)";
        } else {
            errorDiv.textContent = "";
        }
    }
    function validateComparadorPeriodo(showError = false) {
        const errorDiv = document.getElementById('error-comparador-periodo');
        const value = periodoInput.value;
        if (showError && (!value || parseInt(value) <= 0)) {
            errorDiv.textContent = "Ingresa un período válido (> 0)";
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

    // Exponer funciones para validar cuando se presiona el botón
    window.validateComparadorFields = function() {
        validateComparadorCapital(true);
        validateComparadorPlazoFijo(true);
        validateComparadorBilletera(true);
        validateComparadorPeriodo(true);
    };
}

window.addEventListener('DOMContentLoaded', setupComparadorFormatting);

// Función para calcular la comparación de instrumentos
function calcularComparador() {
    // Validar campos primero
    window.validateComparadorFields();

    const capitalInput = document.getElementById('comparador-capital');
    const plazoFijoInput = document.getElementById('comparador-plazo-fijo-tna');
    const bilgeteraInput = document.getElementById('comparador-billetera-tna');
    const periodoInput = document.getElementById('comparador-periodo');
    
    const capital = parseFloat(capitalInput.dataset.raw || "0");
    const tnaPlazoFijo = parseFloat(plazoFijoInput.value);
    const tnaBilletera = parseFloat(bilgeteraInput.value);
    const diasTotal = parseInt(periodoInput.value);
    
    // Validar
    if (!capital || capital <= 0 || !tnaPlazoFijo || tnaPlazoFijo <= 0 || !tnaBilletera || tnaBilletera <= 0 || !diasTotal || diasTotal <= 0) {
        return;
    }

    // Escenario A: Plazo Fijo a 30 días renovable
    const diasPlazoFijo = 30;
    const renovaciones = Math.floor(diasTotal / diasPlazoFijo);
    const diasRestantes = diasTotal % diasPlazoFijo;
    
    let montoPlazoFijo = capital;
    
    // Aplicar renovaciones completas de 30 días
    for (let i = 0; i < renovaciones; i++) {
        const interes = montoPlazoFijo * (tnaPlazoFijo / 100) * (diasPlazoFijo / 365);
        montoPlazoFijo += interes;
    }
    
    // Aplicar días restantes
    if (diasRestantes > 0) {
        const interes = montoPlazoFijo * (tnaPlazoFijo / 100) * (diasRestantes / 365);
        montoPlazoFijo += interes;
    }
    
    // Escenario B: Billetera Virtual con interés diario
    // Fórmula: M = C × (1 + TNADiaria/100)^días, donde TNADiaria = TNA/365
    const tasaDiariaDecimal = (tnaBilletera / 100) / 365;
    const montoBilletera = capital * Math.pow(1 + tasaDiariaDecimal, diasTotal);
    
    // Calcular diferencias
    const diferenciaAbsoluta = montoPlazoFijo - montoBilletera;
    const diferenciaRelativa = (diferenciaAbsoluta / montoBilletera) * 100;
    
    const interesesPlazoFijo = montoPlazoFijo - capital;
    const interesesBilletera = montoBilletera - capital;
    
    // Generar HTML de resultados
    let html = '<div class="comparador-container">';
    
    // Escenario A
    html += '<div class="escenario escenario-a">';
    html += '<h3>Plazo Fijo</h3>';
    html += `<p><strong>TNA:</strong> ${tnaPlazoFijo}%</p>`;
    html += `<p><strong>Renovaciones de 30 días:</strong> ${renovaciones}</p>`;
    if (diasRestantes > 0) {
        html += `<p><strong>Días adicionales:</strong> ${diasRestantes}</p>`;
    }
    html += `<div class="resultado-monto">
        <strong>Monto Final:</strong> $${montoPlazoFijo.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}
    </div>`;
    html += `<p><strong>Interés ganado:</strong> $${interesesPlazoFijo.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</p>`;
    html += `<p><strong>Rendimiento:</strong> ${((interesesPlazoFijo / capital) * 100).toFixed(2)}%</p>`;
    html += '</div>';
    
    // Escenario B
    html += '<div class="escenario escenario-b">';
    html += '<h3>Billetera Virtual</h3>';
    html += `<p><strong>TNA:</strong> ${tnaBilletera}%</p>`;
    html += `<p><strong>Capitalización:</strong> Diaria</p>`;
    html += `<p><strong>Período:</strong> ${diasTotal} días</p>`;
    html += `<div class="resultado-monto">
        <strong>Monto Final:</strong> $${montoBilletera.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}
    </div>`;
    html += `<p><strong>Interés ganado:</strong> $${interesesBilletera.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</p>`;
    html += `<p><strong>Rendimiento:</strong> ${((interesesBilletera / capital) * 100).toFixed(2)}%</p>`;
    html += '</div>';
    
    // Análisis comparativo
    html += '<div class="analisis-comparativo">';
    html += '<h3>Análisis Comparativo</h3>';
    
    if (diferenciaAbsoluta > 0) {
        html += `<div class="ventaja-plazo-fijo">
            <strong>✓ Plazo Fijo es más rentable</strong><br>
            <strong>Diferencia:</strong> $${diferenciaAbsoluta.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})} (${diferenciaRelativa.toFixed(2)}% más)
        </div>`;
    } else {
        html += `<div class="ventaja-billetera">
            <strong>✓ Billetera Virtual es más rentable</strong><br>
            <strong>Diferencia:</strong> $${Math.abs(diferenciaAbsoluta).toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})} (${Math.abs(diferenciaRelativa).toFixed(2)}% más)
        </div>`;
    }
    
    html += `<p><strong>Costo de oportunidad:</strong> Por cada día, la diferencia de rendimiento es de $${(Math.abs(diferenciaAbsoluta) / diasTotal).toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</p>`;
    html += '</div>';
    
    html += '</div>';
    
    // Agregar al historial
    const datosComparador = {
        capital: capital,
        tnaPlazoFijo: tnaPlazoFijo,
        tnaBilletera: tnaBilletera,
        diasTotal: diasTotal,
        periodo: diasTotal,
        montoPlazoFijo: montoPlazoFijo,
        montoFinalPlazoFijo: montoPlazoFijo,
        montoBilletera: montoBilletera,
        montoFinalBilletera: montoBilletera,
        diferenciaAbsoluta: diferenciaAbsoluta,
        interesesPlazoFijo: interesesPlazoFijo,
        interesesBilletera: interesesBilletera
    };
    agregarHistorialComparador(datosComparador);
    renderizarHistorialComparador();
    
    document.getElementById('comparador-results').innerHTML = html;
}
