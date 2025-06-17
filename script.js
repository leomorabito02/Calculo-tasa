function calcularInversion() {
    const capital = parseFloat(document.getElementById('capital').value);
    const montoFinal = parseFloat(document.getElementById('final').value);
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
