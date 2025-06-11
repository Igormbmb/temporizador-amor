// Data do início do namoro: 19/11/2023 às 11:00 AM (no fuso horário do Rio de Janeiro, se necessário)
// É importante definir a data no formato ISO 8601 ou um formato que o JavaScript entenda globalmente.
// O "new Date()" automaticamente considera o fuso horário local do usuário.
// Para ser mais preciso com o Rio, você pode usar: "2023-11-19T11:00:00-03:00"
// No entanto, para fins de um temporizador de relacionamento, a diferença de fuso horário local geralmente não é crítica.
// Vamos usar um formato simples e confiável: YYYY, MM-1 (mês é 0-11), DD, HH, MM, SS
const startDate = new Date(2023, 10, 19, 11, 0, 0); // Ano, Mês (0-11), Dia, Hora, Minuto, Segundo

// Elementos HTML onde os tempos serão exibidos
const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

function updateCountdown() {
    const now = new Date(); // Data e hora atuais
    const diff = now.getTime() - startDate.getTime(); // Diferença em milissegundos

    // Se a data de início for no futuro, ou por algum erro, não mostrar negativo
    if (diff < 0) {
        yearsSpan.textContent = "00";
        monthsSpan.textContent = "00";
        daysSpan.textContent = "00";
        hoursSpan.textContent = "00";
        minutesSpan.textContent = "00";
        secondsSpan.textContent = "00";
        return;
    }

    // Calcular as diferenças
    // Para anos, meses e dias, a contagem simples de milissegundos pode ser imprecisa devido
    // a meses com diferentes números de dias e anos bissextos.
    // Uma forma mais precisa é comparar as datas diretamente e depois calcular as horas/minutos/segundos restantes.

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Ajustar segundos, minutos, horas, dias, meses
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    
    // Ajuste complexo para dias, meses e anos
    while (days < 0) {
        months--;
        // Calcula o número de dias no mês anterior ao mês atual de 'now'
        // (getMonth() retorna 0-11, então 0 é janeiro, 11 é dezembro)
        // new Date(ano, mes, 0) retorna o último dia do mes anterior
        const prevMonthDays = new Date(now.getFullYear(), now.getMonth() + months + 1, 0).getDate();
        days += prevMonthDays;
    }
    
    while (months < 0) {
        months += 12;
        years--;
    }


    // Formatar para ter sempre dois dígitos (ex: 05, 12)
    const formatTwoDigits = (num) => num < 10 ? '0' + num : num;

    yearsSpan.textContent = formatTwoDigits(years);
    monthsSpan.textContent = formatTwoDigits(months);
    daysSpan.textContent = formatTwoDigits(days);
    hoursSpan.textContent = formatTwoDigits(hours);
    minutesSpan.textContent = formatTwoDigits(minutes);
    secondsSpan.textContent = formatTwoDigits(seconds);
}

// Atualiza o temporizador a cada segundo
setInterval(updateCountdown, 1000);

// Chama a função uma vez imediatamente para evitar o atraso inicial
updateCountdown();
