//------------------------
// Elementos DOM
//------------------------

const btnVerificar = document.getElementById("verificar")
const palavraInput = document.getElementById("palavra")
const divResultado = document.getElementById("resultado")

//-----------------------
// Tratamento de dados e Funções
//------------------------

// Bloqueia a entrada de númerose e caracteres especiais
function apenasLetras(event) {
    event.target.value = event.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
}

function verificarPalavra(){
    if(palavraInput.value === ""){
        alert("Digite a palavra.");
        palavraInput.focus();
        return false;
    }
    if(!/^[a-zA-ZÀ-ÿ\s]+$/.test(palavraInput.value)){
        alert("Digite Somente Letras.");
        palavraInput.value = "";
        palavraInput.focus();
        return false;
    }
    return true;
}


// Normaliza texto para ficar tudo padrão e Verifica se a palavra é um palinmedro

function normalizar(texto){
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove acestos
        .replace(/\s/g, "");// remove espaços
}

const ePalindromo = (texto) => {
    const t = normalizar(texto);
    return t === t.split("").reverse().join("");

}

// resultado no HTML
function exibirPalavra() {
    const original = palavraInput.value;
    const normalizada = normalizar(original);

    const ehPalindromo = ePalindromo(original); // ePalindromo já normaliza por dentro

    // reseta as classes pra não acumular
    divResultado.classList.remove("result--ok", "result--bad");

    // aplica cor
    divResultado.classList.add(ehPalindromo ? "result--ok" : "result--bad");

    // monta o bloco de resultado
    divResultado.innerHTML = `
    <p>Original: <b>${original}</b></p>
    <p>Normalizada: <b>${normalizada}</b></p>
    <p>Resultado: <b>${ehPalindromo ? "É palíndromo ✅" : "Não é palíndromo ❌"}</b></p>
    `;
}



btnVerificar.addEventListener("click", () => {
    if(verificarPalavra()){
        exibirPalavra();
    }
} )

function handleEnter(event){
    if(event.key === "Enter"){
        btnVerificar.click();
    }
}

addEventListener("keydown", handleEnter);
palavraInput.addEventListener("input", apenasLetras);

