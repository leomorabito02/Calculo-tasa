
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

    [capitalInput, finalInput].forEach(input => {
        input.addEventListener('input', function(e) {
            // Permitir solo dígitos y opcionalmente coma/punto decimal
            let raw = input.value.replace(/\./g, "").replace(/[^\d,]/g, "");
            // Guardar el valor sin puntos en data-raw
            input.dataset.raw = raw.replace(/,/g, "."); // Si usas coma como decimal, conviértelo a punto
            // Formatear para mostrar puntos de miles
            let parts = raw.split(/[,]/);
            let intPart = parts[0];
            let decPart = parts[1] || "";
            let formattedInt = formatNumberWithDots(intPart);
            let formatted = decPart ? formattedInt + "," + decPart : formattedInt;
            input.value = formatted;
            // Mantener el cursor al final
            input.setSelectionRange(input.value.length, input.value.length);
        });
    });
}

window.addEventListener('DOMContentLoaded', setupInputFormatting);

function calcularInversion() {
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
    } else {
        resultadoTNA.textContent = "Por favor, ingresa valores válidos.";
        resultadoTEA.textContent = "Por favor, ingresa valores válidos.";
        resultadoTNM.textContent = "Por favor, ingresa valores válidos.";
        resultadoTEM.textContent = "Por favor, ingresa valores válidos.";
    }
}
