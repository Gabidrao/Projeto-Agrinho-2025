1	INTRODUÇÃO
Este projeto apresenta um jogo digital interativo, intitulado "A Jornada da Colheita!", desenvolvido utilizando a biblioteca p5.js para JavaScript. O objetivo principal é simular, de forma lúdica e engajadora, o ciclo de produção e distribuição de alimentos, conectando o campo (origem dos produtos) à cidade (destino dos produtos, como o mercado). Através de uma jogabilidade de plataforma 2D, o jogador é imerso em um cenário que representa as etapas da colheita e entrega, abordando conceitos de cadeia produtiva de maneira acessível e divertida.

OBJETIVOS DO PROJETO
Onde se pretende chegar com o projeto.
Objetivo Geral:
•	Desenvolver um jogo de plataforma 2D funcional e interativo em p5.js que represente a conexão entre a produção agrícola e o consumo urbano, proporcionando uma experiência de aprendizado engajadora sobre a cadeia de alimentos.
Objetivos Específicos:
•	Implementar mecânicas de jogo de plataforma: Incluindo movimento de personagem (esquerda, direita, pulo), física básica (gravidade) e detecção de colisões (hitboxes) precisas com plataformas e objetos interativos.
•	Criar um sistema de coleta de itens: Permitindo que o jogador colete produtos agrícolas (maçã, leite, milho) espalhados pelo cenário.
•	Desenvolver um sistema de entrega e pontuação: Onde o jogador leva os itens coletados a um ponto de entrega (mercado) para acumular pontos.
•	Estruturar o jogo em fases progressivas: Apresentando diferentes layouts de cenário, quantidade de itens e desafios em cada fase para aumentar a complexidade e o engajamento.
•	Adicionar elementos de dificuldade: Introduzindo inimigos simples que patrulham o cenário e penalizam o jogador ao contato, exigindo estratégia para evitá-los.
•	Aprimorar a experiência visual: Utilizando imagens para o personagem, itens, inimigos e elementos de cenário, transformando a interface de formas básicas para um ambiente gráfico mais rico.

JUSTIFICATIVA DO PROJETO
É a parte que se fundamentam as motivações para realizar do projeto. Como o próprio nome diz, é o elemento que justifica o projeto. Pode-se pensar a justificativa como a maneira pela qual se explica para alguém sobre a importância do projeto. É o porquê está realizando este projeto.
A realização do projeto "A Jornada da Colheita!" justifica-se pela crescente necessidade de abordar temas complexos como a conexão entre o campo e a cidade e a cadeia produtiva de alimentos de uma forma inovadora e acessível. Tradicionalmente, esses temas podem ser abstratos ou pouco envolventes para públicos mais jovens ou leigos.
O desenvolvimento de um jogo digital oferece uma plataforma dinâmica e interativa para:
•	Educação Lúdica: Transformar conceitos importantes sobre a origem dos alimentos e seu trajeto até o consumidor em uma experiência divertida, facilitando a compreensão e a memorização.
•	Engajamento: Jogos são inerentemente engajadores. Ao permitir que o jogador participe ativamente do processo de coleta e entrega, o projeto estimula a curiosidade e o interesse pelo tema.
•	Desenvolvimento de Habilidades: A jogabilidade de plataforma exige raciocínio lógico, coordenação motora, planejamento e tomada de decisão rápida para superar obstáculos e gerenciar recursos (itens coletados).
•	Inovação Pedagógica: Oferecer uma ferramenta alternativa e tecnológica para educadores, que pode ser utilizada como um complemento didático para discutir sustentabilidade, agronegócio e consumo consciente.
•	Aplicabilidade Tecnológica: Demonstrar a aplicação prática de conceitos de programação e lógica de desenvolvimento de jogos utilizando p5.js, uma biblioteca versátil e de código aberto, incentivando o estudo de novas tecnologias.
Portanto, "A Jornada da Colheita!" não é apenas um jogo, mas uma ferramenta educacional e um exemplo prático de como a tecnologia pode ser utilizada para comunicar ideias de forma eficaz e divertida, justificando-se como um projeto relevante e com potencial impacto social e educacional.

LINK DO PROJETO
Incluir o link do projeto.
•	[Inserir o link para o seu projeto aqui] :https://editor.p5js.org/gabriel.caceres.teixeira/sketches/e21CzPw--

DESCRIÇÃO DO PROJETO
Apresentação de forma escrita, indicando todo o processo de construção, elementos, tema e funcionalidades do projeto.
O jogo "A Jornada da Colheita!" é um jogo de plataforma 2D onde o jogador assume o papel de um personagem que deve coletar produtos agrícolas no "campo" e entregá-los em um "mercado" na "cidade", superando obstáculos e desafios.
Processo de Construção: O desenvolvimento foi iterativo, começando com as mecânicas básicas e adicionando camadas de complexidade:
1.	Estrutura Inicial: Definição das áreas de "campo" e "cidade" no canvas do p5.js.
2.	Mecânicas de Plataforma: Implementação do movimento do jogador (horizontal e pulo), aplicação de gravidade e detecção de colisão com superfícies (plataformas), permitindo que o personagem se mova e pule realisticamente.
3.	Sistema de Coleta: Criação de itens coletáveis (maçã, leite, milho) que desaparecem ao contato com o jogador e são adicionados a um inventário.
4.	Sistema de Entrega e Pontuação: Estabelecimento de um "mercado" como ponto de entrega. Ao chegar com itens no inventário, o jogador entrega os produtos, ganha pontos e os itens coletáveis da fase são resetados para a próxima jogada ou fase.
5.	Gerenciamento de Fases: Criação de um array de objetos, onde cada objeto representa uma fase com sua própria configuração de plataformas, itens, inimigos e ponto de partida do jogador. O jogo avança para a próxima fase ao cumprir o objetivo de entrega. Atualmente, o jogo possui 5 fases distintas.
6.	Adição de Dificuldade: Introdução de inimigos (representados por pássaros ladrões) que patrulham plataformas específicas. O contato com um inimigo resulta na perda dos itens coletados e no reinício da fase.
7.	Melhorias de Usabilidade e Polimento: Refinamento da lógica de colisão para subida em plataformas, aumento da altura do pulo para melhor navegação e centralização do canvas para evitar o scroll da página, otimizando a experiência do usuário.
8.	Integração Visual (Gráficos): Implementação do carregamento e exibição de imagens para o personagem, itens, inimigos, mercado e um plano de fundo, substituindo as formas geométricas simples por elementos gráficos mais ricos e atraentes.
Elementos e Funcionalidades:
•	Tema: Conexão Campo-Cidade, cadeia produtiva de alimentos, e os desafios do transporte.
•	Controles: Teclas de seta (esquerda/direita) para movimento horizontal e barra de espaço para pular.
•	Personagem: Um fazendeiro(a) controlado pelo jogador.
•	Plataformas: Superfícies onde o jogador pode se mover e pular.
•	Itens Coletáveis: Maçãs, leite, milho (representados por imagens) que o jogador deve coletar.
•	Inimigos: Pássaros patrulhadores que, ao colidir com o jogador, resetam a fase e o inventário atual.
•	Ponto de Entrega (Mercado): Local onde os itens são entregues para acumular pontos e avançar de fase.
•	Sistema de Fases: Progressão através de 5 níveis de dificuldade crescente, com diferentes layouts e objetivos de coleta.
•	Pontuação: O jogador ganha pontos ao entregar os itens coletados no mercado.
•	Feedback Visual: Utilização de imagens para todos os elementos interativos, proporcionando uma experiência visual mais imersiva e divertida.

CONSIDERAÇÕES FINAIS
O desenvolvimento de "A Jornada da Colheita!" demonstrou a capacidade de criar uma experiência de jogo completa e envolvente utilizando o p5.js, aplicando conceitos de lógica de programação, física 2D e design de jogos. O projeto não só atinge seus objetivos de funcionalidade e jogabilidade, mas também serve como uma ferramenta didática para conscientizar sobre a importância do ciclo campo-cidade na produção de alimentos.
A jornada de desenvolvimento, marcada pela implementação incremental de funcionalidades como hitboxes precisas, sistema de fases, elementos de dificuldade (inimigos) e aprimoramentos visuais com gráficos, reforça a importância do planejamento e da iteração em projetos de software. O jogo final é uma prova de que a programação pode ser uma poderosa ferramenta para a educação e o entretenimento, transformando ideias abstratas em experiências interativas e memoráveis.
Futuras melhorias poderiam incluir: adição de efeitos sonoros, animações mais complexas para o personagem e inimigos, um temporizador para as fases e uma tela de início/fim de jogo mais elaborada, aprofundando ainda mais a imersão e o desafio.
