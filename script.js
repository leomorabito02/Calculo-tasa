function calcularInversion() {
    // Obtener valores de entrada
    const rendimiento = parseFloat(document.getElementById('rendimiento').value);
    const tna = parseFloat(document.getElementById('tna').value) / 100;
    const dias = parseInt(document.getElementById('dias').value);
    const diasAnio = 365;

    // Calcular TEA
    const tea = Math.pow(1 + tna / diasAnio, diasAnio) - 1;

    // Calcular cantidad necesaria
    const cantidad = rendimiento / (Math.pow(1 + tea / diasAnio, dias) - 1);

    // Mostrar resultado
    const resultadoDiv = document.getElementById('resultado');
    if (!isNaN(cantidad) && cantidad > 0) {
        resultadoDiv.textContent = `Necesitas invertir: $${cantidad.toFixed(2)}`;
    } else {
        resultadoDiv.textContent = "Por favor, ingresa valores válidos.";
    }
}
