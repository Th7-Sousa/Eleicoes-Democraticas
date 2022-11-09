window.onload = function () {
  var AreaQuestao = document.getElementsByClassName("questoes")[0],
    AreaDeResposta = document.getElementsByClassName("respostas")[0],
    verificar = document.getElementsByClassName("verificar")[0],
    current = 0,
    // Um objeto que contém todas as perguntas + respostas possíveis.
    // No array --> último dígito dá a posição de resposta correta
    BancoQuestoes = {
      " A urna eletrônica, como se concebe hoje, foi desenvolvida em...": [
        "1995",
        "1993",
        "1988",
        0,
      ],

      "Quais são os beneficios da urna eletrônica?": [
        "Rapidez e Menor segurança",
        "Rapidez e Maior segurança",
        "Nenhum beneficio",
        1,
      ],

      "Qual tecnologia foi recentemente implementada para verificar ou identificar uma pessoa por meio de um Scanner? ":
        [
          "Sistema de Biometria",
          "Reconhecimento Facial",
          "Reconhecimento por voz",
          0,
        ],

      "Em qual intervalo de idade o voto NÃO é obrigatorio?": [
        "maiores de 16 anos e menores de 18 anos",
        "maiores de 16 anos e menores de 21 anos;",
        "menores de 70 anos",
        0,
      ],
    };

  function carregaQuestao(curr) {
    // Esta função carrega toda a pergunta na questionArea
    // Ele pega a pergunta atual com base na variável 'atual'

    var question = Object.keys(BancoQuestoes)[curr];

    AreaQuestao.innerHTML = "";
    AreaQuestao.innerHTML = question;
  }

  function carregaResposta(curr) {
    // Esta função carrega todas as respostas possíveis da pergunta dada
    // Ele pega a matriz de resposta necessária com a ajuda da variável atual
    // Cada resposta é adicionada com uma função 'onclick'

    var answers = BancoQuestoes[Object.keys(BancoQuestoes)[curr]];

    AreaDeResposta.innerHTML = "";

    for (var i = 0; i < answers.length - 1; i += 1) {
      var createDiv = document.createElement("div"),
        text = document.createTextNode(answers[i]);

      createDiv.appendChild(text);
      createDiv.addEventListener("click", checkAnswer(i, answers));

      AreaDeResposta.appendChild(createDiv);
    }
  }

  function checkAnswer(i, arr) {
    // Esta é a função que será executada, ao clicar em uma das respostas
    // Verifica se resposta é o indice como o correto
    // Depois disso, verifique se é a última pergunta:
    // Se for: esvazie a answerArea e deixe-os saber que está feito.

    return function () {
      var recebe = i,
        acerto = arr[arr.length - 1];

      if (recebe === acerto) {
        addCorrecao(true);
      } else {
        addCorrecao(false);
      }

      if (current < Object.keys(BancoQuestoes).length - 1) {
        current += 1;

        carregaQuestao(current);
        carregaResposta(current);
      } else {
        AreaQuestao.innerHTML = "FIM";
        AreaDeResposta.innerHTML = "";
        document.getElementById("de-novo").style.display = "block";
      }
    };
  }

  function addCorrecao(bool) {
    // Esta função adiciona um elemento div à página
    // Usado para ver se estava correto ou falso

    var createDiv = document.createElement("div"),
      txt = document.createTextNode(current + 1);

    createDiv.appendChild(txt);

    if (bool) {
      createDiv.className += "correct";
      verificar.appendChild(createDiv);
    } else {
      createDiv.className += "false";
      verificar.appendChild(createDiv);
    }
  }

  // Inicia o quiz
  carregaQuestao(current);
  carregaResposta(current);

  document.getElementById("de-novo").onclick = () => location.reload();
};
