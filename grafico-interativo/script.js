const ctx = document.getElementById('pedagogiaChart').getContext('2d');

const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
gradient1.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
gradient1.addColorStop(1, 'rgba(239, 68, 68, 0.15)');

const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
gradient2.addColorStop(0, 'rgba(245, 158, 11, 0.85)');
gradient2.addColorStop(1, 'rgba(245, 158, 11, 0.15)');

const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
gradient3.addColorStop(0, 'rgba(6, 182, 212, 0.85)');
gradient3.addColorStop(1, 'rgba(6, 182, 212, 0.15)');

const gradient4 = ctx.createLinearGradient(0, 0, 0, 300);
gradient4.addColorStop(0, 'rgba(168, 85, 247, 0.85)');
gradient4.addColorStop(1, 'rgba(168, 85, 247, 0.15)');

const borderColors = ['#ef4444', '#f59e0b', '#06b6d4', '#a855f7'];

// Rastrear quais barras já foram clicadas para completar o SCORM automaticamente
const barrasClicadas = new Set();

const pedagogiaChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Expositiva Tradicional', 'Multimídia/Vídeo', 'Gamificação Ativa', 'Ecossistemas IA'],
        datasets: [{
            label: 'Retenção Média Estimada (%)',
            data: [20, 50, 75, 93],
            backgroundColor: [gradient1, gradient2, gradient3, gradient4],
            borderColor: borderColors,
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { color: 'rgba(255, 255, 255, 0.05)', drawTicks: false },
                ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans', size: 11 } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 12 } }
            }
        },
        onClick: (e, activeElements) => {
            if (activeElements.length > 0) {
                const index = activeElements[0].index;
                barrasClicadas.add(index);
                atualizarFeedbackPedagogico(index);
                
                // Se o aluno explorar todas as opções, o SCORM conclui automaticamente sem precisar do botão
                if (barrasClicadas.size === 4) {
                    completeSCORM();
                }
            }
        }
    }
});

function atualizarFeedbackPedagogico(index) {
    const panel = document.getElementById('feedback-panel');
    const titulos = [
        "Abordagem Expositiva Tradicional (20% de Retenção)",
        "Instrução Multimídia & Vídeo-aulas (50% de Retenção)",
        "Gamificação Educacional Ativa (75% de Retenção)",
        "Resolução de Problemas com Mentoria IA (93% de Retenção)"
    ];
    const feedbacks = [
        "O estudante atua em estado passivo de recepção. A tecnologia aplicada de forma meramente substitutiva não rompe as barreiras estruturais do aprendizado.",
        "A introdução de mídias dinâmicas e o controle do ritmo de consumo pelo estudante aumentam os inputs cognitivos, permitindo uma ancoragem inicial de conceitos teóricos.",
        "O engajamento é impulsionado por loops de feedback imediatos. O erro perde o caráter punitivo e assume papel construtivo e iterativo na jornada gamificada.",
        "O ápice do design pedagógico contemporâneo. Agentes inteligentes customizam trajetórias de aprendizagem baseadas em dados em tempo real, impulsionando a autonomia."
    ];
    panel.style.borderLeftColor = borderColors[index];
    panel.innerHTML = `<strong>${titulos[index]}</strong><p>${feedbacks[index]}</p>`;
}

window.onload = function() { initSCORM(); };
