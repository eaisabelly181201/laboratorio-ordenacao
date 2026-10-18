function bubbleSort(numeros, crescente) {
    let lista = [...numeros];

    for (let i = 0; i < lista.length - 1; i++) {
        for (let j = 0; j < lista.length - 1 - i; j++) {
            let trocar = crescente
                ? lista[j] > lista[j + 1]
                : lista[j] < lista[j + 1];

            if (trocar) {
                let temporario = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = temporario;
            }
        }
    }

    return lista;
}

function selectionSort(numeros, crescente) {
    let lista = [...numeros];

    for (let i = 0; i < lista.length - 1; i++) {
        let escolhido = i;

        for (let j = i + 1; j < lista.length; j++) {
            let deveEscolher = crescente
                ? lista[j] < lista[escolhido]
                : lista[j] > lista[escolhido];

            if (deveEscolher) {
                escolhido = j;
            }
        }

        let temporario = lista[i];
        lista[i] = lista[escolhido];
        lista[escolhido] = temporario;
    }

    return lista;
}

document.getElementById("botaoOrdenar")
    .addEventListener("click", function () {
        const entrada = document
            .getElementById("numeros").value.trim();

        const resultado = document.getElementById("resultado");

        if (entrada === "") {
            resultado.textContent =
                "Digite alguns números primeiro!";
            return;
        }

        // Permite espaços ao redor das vírgulas.
        const texto = entrada.replace(/\s*,\s*/g, ",");

        // Rejeita vírgulas repetidas ou nas extremidades.
        if (/^,|,$|,,/.test(texto)) {
            resultado.textContent =
                "Erro: separe os números corretamente.";
            return;
        }

        const partes = texto.split(/[,\s]+/);
        const numeros = partes.map(Number);

        if (partes.some(parte => parte === "") ||
            numeros.some(numero => !Number.isFinite(numero))) {
            resultado.textContent =
                "Erro: digite somente números válidos.";
            return;
        }

        const crescente =
            document.getElementById("ordem").value === "crescente";

        const algoritmo =
            document.getElementById("algoritmo").value;

        let listaOrdenada;

        if (algoritmo === "bubble") {
            listaOrdenada = bubbleSort(numeros, crescente);
        } else if (algoritmo === "selection") {
            listaOrdenada = selectionSort(numeros, crescente);
        } else {
            resultado.textContent =
                "Erro: selecione um algoritmo válido.";
            return;
        }

        resultado.textContent =
            "Original: " + numeros.join(", ") +
            " | Ordenado: " + listaOrdenada.join(", ");
    });

