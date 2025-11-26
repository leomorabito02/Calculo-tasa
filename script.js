// --- 1. UTILIDADES ---
function parsearValor(str) {
    if (!str) return 0;
    // Eliminamos puntos de miles y cambiamos coma por punto decimal
    let limpio = str.toString().replace(/\./g, '').replace(',', '.');
    let val = parseFloat(limpio);
    return isNaN(val) ? 0 : val;
}

function formatearMoneda(valor) {
    if (valor === "" || valor === undefined || isNaN(valor)) return "0,00";
    let numeroTecnico = parseFloat(valor).toFixed(2);
    let partes = numeroTecnico.split('.');
    let parteEntera = partes[0];
    let parteDecimal = partes[1];
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${parteEntera},${parteDecimal}`;
}

// --- 2. MÁSCARA DE ENTRADA ---
function setupInputMasks() {
    const inputs = document.querySelectorAll('.mascara-moneda');
    
    inputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let cursorPosition = this.selectionStart;
            let originalLength = this.value.length;

            // Limpiar: dejar solo números y coma
            let value = this.value.replace(/[^0-9,]/g, '');
            
            const parts = value.split(',');
            if (parts.length > 2) value = parts[0] + ',' + parts.slice(1).join('');

            let integerPart = parts[0];
            let decimalPart = parts.length > 1 ? ',' + parts[1].substring(0, 2) : '';
            
            if (value === '') { this.value = ''; return; }

            // Agregar puntos de miles
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            
            let newValue = integerPart + decimalPart;
            this.value = newValue;

            // Ajustar cursor
            let newLength = newValue.length;
            cursorPosition = cursorPosition + (newLength - originalLength);
            this.setSelectionRange(cursorPosition, cursorPosition);
        });
    });
}

// --- 3. INICIO Y VALIDACIONES ---
document.addEventListener('DOMContentLoaded', function() {
    setupInputMasks();
    setupValidations();
    ['inversion', 'rendimiento', 'compuesto', 'comparador'].forEach(tipo => renderizarHistorial(tipo));
});

function setupValidations() {
    // Helper para conectar validación usando el parser
    const connect = (id, errorId, checkFn) => {
        const el = document.getElementById(id);
        if(!el) return;
        el.addEventListener('input', () => {
            const val = parsearValor(el.value);
            const errDiv = document.getElementById(errorId);
            if(val > 0) {
                errDiv.textContent = "";
                if(checkFn) errDiv.textContent = checkFn(val);
            }
        });
    };

    connect('capital', 'error-capital');
    connect('final', 'error-final', (val) => {
        const cap = parsearValor(document.getElementById('capital').value);
        return val > cap ? "" : "El monto final debe ser mayor al capital";
    });
    connect('dinero', 'error-dinero');
    // Tasas ahora también se validan con parser
    connect('tna_rend', 'error-tna_rend');
    connect('compound-capital', 'error-compound-capital');
    connect('compound-tna', 'error-compound-tna');
    connect('comparador-capital', 'error-comparador-capital');
    connect('comparador-plazo-fijo-tna', 'error-comparador-plazo-fijo-tna');
    connect('comparador-billetera-tna', 'error-comparador-billetera-tna');
}

// --- 4. CALCULADORAS ---

// A. TASA
function calcularInversion() {
    const capital = parsearValor(document.getElementById('capital').value);
    const final = parsearValor(document.getElementById('final').value);
    const dias = parseFloat(document.getElementById('dias').value) || 0;

    const errCap = document.getElementById('error-capital');
    const errFin = document.getElementById('error-final');
    const errDias = document.getElementById('error-dias');
    
    errCap.textContent = capital <= 0 ? "Requerido" : "";
    errFin.textContent = final <= capital ? "Debe ser mayor al capital" : "";
    errDias.textContent = dias <= 0 ? "Requerido" : "";

    if (capital > 0 && final > capital && dias > 0) {
        const diasAnio = 365;
        const tna = ((final - capital) / capital) * (diasAnio / dias) * 100;
        const tea = Math.pow((final / capital), (diasAnio / dias)) - 1;
        const tnm = tna / 12;
        const tem = tea / 12;

        const elTNA = document.getElementById('resultado_tna');
        const elTEA = document.getElementById('resultado_tea');
        const elTNM = document.getElementById('resultado_tnm');
        const elTEM = document.getElementById('resultado_tem');

        elTNA.textContent = `TNA: ${formatearMoneda(tna)}%`;
        elTEA.textContent = `TEA: ${formatearMoneda(tea * 100)}%`;
        elTNM.textContent = `TNM: ${formatearMoneda(tnm)}%`;
        elTEM.textContent = `TEM: ${formatearMoneda(tem * 100)}%`;

        [elTNA, elTEA, elTNM, elTEM].forEach(el => animarResultado(el));

        agregarHistorial('inversion', {
            capital, montoFinal: final, dias, tna, tea: tea * 100
        });
    }
}

// B. RENDIMIENTO
function calcularRendimiento() {
    const dinero = parsearValor(document.getElementById('dinero').value);
    // IMPORTANTE: Ahora usamos parsearValor para la TNA
    const tna = parsearValor(document.getElementById('tna_rend').value);
    const tiempo = parseFloat(document.getElementById('tiempo').value) || 0;

    document.getElementById('error-dinero').textContent = dinero <= 0 ? "Requerido" : "";
    document.getElementById('error-tna_rend').textContent = tna <= 0 ? "Requerido" : "";

    if (dinero > 0 && tna > 0 && tiempo > 0) {
        const diasAnio = 365;
        const rendimientoTotal = dinero * (1 + (tna / 100) * (tiempo / diasAnio));
        const interesGanado = rendimientoTotal - dinero;

        const elRend = document.getElementById('resultado_rendimiento');
        const elInt = document.getElementById('resultado_interes');

        elRend.textContent = `Rendimiento total: $${formatearMoneda(rendimientoTotal)}`;
        elInt.textContent = `Interés total ganado: $${formatearMoneda(interesGanado)}`;
        
        animarResultado(elRend);
        animarResultado(elInt);

        agregarHistorial('rendimiento', {
            dinero, tna, tiempo, rendimientoTotal, interesGanado
        });
    }
}

// C. COMPUESTO
function calcularCompuesto() {
    const capital = parsearValor(document.getElementById('compound-capital').value);
    // IMPORTANTE: TNA con parser
    const tna = parsearValor(document.getElementById('compound-tna').value);
    const plazoMeses = parseFloat(document.getElementById('compound-plazo').value) || 0;
    const frecuenciaDias = parseInt(document.getElementById('compound-frecuencia').value);

    document.getElementById('error-compound-capital').textContent = capital <= 0 ? "Requerido" : "";
    document.getElementById('error-compound-tna').textContent = tna <= 0 ? "Requerido" : "";

    if (capital > 0 && tna > 0 && plazoMeses > 0) {
        const m = 365 / frecuenciaDias;
        const i = tna / 100;
        const periodosTotal = Math.round(plazoMeses / (frecuenciaDias / 30));
        const tasaPeriodo = i / m;

        let html = '<table class="compound-table"><thead><tr><th>Período</th><th>Días</th><th>Monto</th><th>Interés</th></tr></thead><tbody>';
        let montoActual = capital;
        let diasAcum = 0;

        for (let p = 1; p <= periodosTotal; p++) {
            montoActual = capital * Math.pow(1 + tasaPeriodo, p);
            const interesGanado = montoActual - capital;
            diasAcum = Math.round(p * frecuenciaDias);
            let nombre = frecuenciaDias === 30 ? `Mes ${p}` : `P.${p}`;

            html += `<tr>
                <td>${nombre}</td>
                <td>${diasAcum}</td>
                <td>$${formatearMoneda(montoActual)}</td>
                <td>$${formatearMoneda(interesGanado)}</td>
            </tr>`;
        }
        html += '</tbody></table>';

        const interesTotal = montoActual - capital;
        const rendPorc = ((montoActual - capital) / capital) * 100;

        html += `<div class="compound-summary">
            <strong>Monto final:</strong> $${formatearMoneda(montoActual)}<br>
            <strong>Interés total:</strong> $${formatearMoneda(interesTotal)}<br>
            <strong>Rendimiento:</strong> ${formatearMoneda(rendPorc)}%
        </div>`;

        document.getElementById('compound-results').innerHTML = html;

        agregarHistorial('compuesto', {
            capital, tna, plazoMeses,
            montoFinal: montoActual, interesTotal, rendimiento: rendPorc
        });
    }
}

// D. COMPARADOR
function calcularComparador() {
    const capital = parsearValor(document.getElementById('comparador-capital').value);
    // IMPORTANTE: TNAs con parser
    const tnaPF = parsearValor(document.getElementById('comparador-plazo-fijo-tna').value);
    const tnaBill = parsearValor(document.getElementById('comparador-billetera-tna').value);
    const diasTotal = parseFloat(document.getElementById('comparador-periodo').value) || 0;

    document.getElementById('error-comparador-capital').textContent = capital <= 0 ? "Requerido" : "";
    document.getElementById('error-comparador-plazo-fijo-tna').textContent = tnaPF <= 0 ? "Requerido" : "";
    document.getElementById('error-comparador-billetera-tna').textContent = tnaBill <= 0 ? "Requerido" : "";

    if (capital > 0 && tnaPF > 0 && tnaBill > 0 && diasTotal > 0) {
        const diasPF = 30;
        const renovaciones = Math.floor(diasTotal / diasPF);
        const diasRest = diasTotal % diasPF;
        let montoPF = capital;
        for(let i=0; i<renovaciones; i++) montoPF += montoPF * (tnaPF/100) * (diasPF/365);
        if(diasRest > 0) montoPF += montoPF * (tnaPF/100) * (diasRest/365);

        const tasaDiaria = (tnaBill/100)/365;
        const montoBill = capital * Math.pow(1 + tasaDiaria, diasTotal);

        const difAbs = montoPF - montoBill;
        const intPF = montoPF - capital;
        const intBill = montoBill - capital;

        let html = '<div class="comparador-container">';
        
        html += `<div class="escenario escenario-a">
            <h3>Plazo Fijo</h3>
            <p><strong>TNA:</strong> ${formatearMoneda(tnaPF)}%</p>
            <div class="resultado-monto">Final: $${formatearMoneda(montoPF)}</div>
            <p>Interés: $${formatearMoneda(intPF)}</p>
        </div>`;

        html += `<div class="escenario escenario-b">
            <h3>Billetera Virtual</h3>
            <p><strong>TNA:</strong> ${formatearMoneda(tnaBill)}%</p>
            <div class="resultado-monto">Final: $${formatearMoneda(montoBill)}</div>
            <p>Interés: $${formatearMoneda(intBill)}</p>
        </div>`;

        const mejor = difAbs > 0 ? "Plazo Fijo" : "Billetera Virtual";
        const cssClass = difAbs > 0 ? "ventaja-plazo-fijo" : "ventaja-billetera";
        
        html += `<div class="analisis-comparativo">
            <div class="${cssClass}">
                <strong>✓ Conviene ${mejor}</strong><br>
                Diferencia: $${formatearMoneda(Math.abs(difAbs))}
            </div>
        </div></div>`;

        document.getElementById('comparador-results').innerHTML = html;

        agregarHistorial('comparador', {
            capital, tnaPlazoFijo: tnaPF, tnaBilletera: tnaBill, diasTotal,
            montoPlazoFijo: montoPF, montoBilletera: montoBill, diferenciaAbsoluta: difAbs
        });
    }
}

// --- UTILIDADES VARIAS ---
function animarResultado(el) {
    el.classList.remove('fade-in');
    void el.offsetWidth;
    el.classList.add('fade-in');
}

function toggleMobileIndex() {
    document.getElementById('mobile-index-menu').classList.toggle('active');
}

function agregarHistorial(tipo, datos) {
    let key = getStorageKey(tipo);
    let historial = JSON.parse(localStorage.getItem(key) || '[]');
    historial.unshift(datos);
    if (historial.length > 5) historial = historial.slice(0, 5);
    localStorage.setItem(key, JSON.stringify(historial));
    renderizarHistorial(tipo);
}

function getStorageKey(tipo) {
    if(tipo === 'inversion') return 'historialInversion';
    if(tipo === 'rendimiento') return 'historialRendimiento';
    if(tipo === 'compuesto') return 'historialCompuesto';
    if(tipo === 'comparador') return 'historialComparador';
    return '';
}

function renderizarHistorial(tipo) {
    let key = getStorageKey(tipo);
    let ulId = `historial-${tipo}`;
    const ul = document.getElementById(ulId);
    if(!ul) return;

    const historial = JSON.parse(localStorage.getItem(key) || '[]');
    ul.innerHTML = '';
    
    if (historial.length === 0) {
        ul.innerHTML = '<li style="color:#888;font-size:0.85rem;">Sin historial reciente.</li>';
        return;
    }

    const item = historial[0]; 
    const fmt = (v) => formatearMoneda(v);

    if (tipo === 'inversion') {
        ul.innerHTML += `<li>
            <strong>Capital:</strong> $${fmt(item.capital)}<br>
            <strong>Final:</strong> $${fmt(item.montoFinal)}<br>
            <strong>TNA:</strong> ${fmt(item.tna)}% | <strong>TEA:</strong> ${fmt(item.tea)}%
        </li>`;
    } else if (tipo === 'rendimiento') {
        ul.innerHTML += `<li>
            <strong>Inv:</strong> $${fmt(item.dinero)}<br>
            <strong>Rend:</strong> $${fmt(item.rendimientoTotal)}
        </li>`;
    } else if (tipo === 'compuesto') {
        ul.innerHTML += `<li>
            <strong>Cap:</strong> $${fmt(item.capital)}<br>
            <strong>Final:</strong> $${fmt(item.montoFinal)}<br>
            <strong>Rend:</strong> ${fmt(item.rendimiento)}%
        </li>`;
    } else if (tipo === 'comparador') {
        const ganador = item.diferenciaAbsoluta > 0 ? 'Plazo Fijo' : 'Billetera';
        ul.innerHTML += `<li>
            <strong>Cap:</strong> $${fmt(item.capital)}<br>
            <strong>Mejor:</strong> ${ganador} (+$${fmt(Math.abs(item.diferenciaAbsoluta))})
        </li>`;
    }
}