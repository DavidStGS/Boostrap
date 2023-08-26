// Valores de entrada (similares a D5, D6, D7 y D9)
const tasaInteresAnual = 0.02; // Tasa de interés anual (5%)
const numeroPeriodos = 2;     // Número de períodos (meses)
const montoPrincipal = 100000;   // Monto principal o inversión inicial
const valorFuturo = 0;         // Valor futuro (en este caso, 0)

// Convertir la tasa de interés anual a tasa periódica
const tasaInteresPeriodica = 0.07; // Suponiendo pagos mensuales

// Calcular el pago periódico utilizando la fórmula de amortización
const pagoPeriodico = (montoPrincipal * tasaInteresPeriodica) / (1 - Math.pow(1 + tasaInteresPeriodica, -numeroPeriodos));

console.log(pagoPeriodico); // Imprimir el pago periódico con el signo invertido
