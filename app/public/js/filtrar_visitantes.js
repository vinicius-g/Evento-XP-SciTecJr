const filtroVisitante = document.getElementById("filtrar");
const listaVisitantes = document.querySelectorAll("#visitantes div");

filtroVisitante.addEventListener('input', function() {
    const filtro = filtroVisitante.value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "");

    listaVisitantes.forEach(visitante => {
        const nomeCompleto = visitante.querySelector('span').textContent
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "");

        if (nomeCompleto.startsWith(filtro)) {
            visitante.style.display = '';
        } else {
            visitante.style.display = 'none';
        }
    });
});