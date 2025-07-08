// --- Variáveis Globais do Jogo ---
let jogador;
let fases = []; // Array que armazenará todas as fases do jogo
let faseAtual = 0; // Índice da fase atual (começa na Fase 0)

let pontuacao = 0;
let itensNoInventario = 0; // Quantidade de itens que o jogador está carregando

// --- Constantes de Jogo ---
const GRAVIDADE = 0.6;
const FORCA_PULO = -13;
const VELOCIDADE_HORIZONTAL = 4;

// --- FUNÇÃO DE COLISÃO REUSÁVEL (HITBOX) ---
// Verifica se dois retângulos estão colidindo
function checarColisaoRetangulo(obj1X, obj1Y, obj1L, obj1A, obj2X, obj2Y, obj2L, obj2A) {
    return (obj1X < obj2X + obj2L &&
            obj1X + obj1L > obj2X &&
            obj1Y < obj2Y + obj2A &&
            obj1Y + obj1A > obj2Y);
}

// --- Classe Jogador ---
class Jogador {
    constructor(x, y, largura, altura) {
        this.initialX = x; // Salva a posição inicial da fase
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.velocidadeX = 0;
        this.velocidadeY = 0;
        this.noChao = false;
        this.itensColetadosFase = 0; // Itens coletados nesta fase
    }

    resetarPosicao() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.velocidadeX = 0;
        this.velocidadeY = 0;
        this.noChao = false;
        itensNoInventario = 0; // Zera inventário ao resetar
        this.itensColetadosFase = 0; // Zera contagem de itens para a fase
        // Reinicia os itens da fase para que possam ser pegos novamente
        for (let item of fases[faseAtual].itens) {
            item.coletado = false;
            item.coletadoAnteriormente = false; // Garante que pode ser pego de novo
        }
    }

    mostrar() {
        fill(150, 75, 0); // Marrom para o jogador
        rect(this.x, this.y, this.largura, this.altura);
    }

    atualizar() {
        // Aplica gravidade
        this.velocidadeY += GRAVIDADE;
        this.y += this.velocidadeY;

        // Aplica movimento horizontal
        this.x += this.velocidadeX;

        // Limita o jogador dentro da tela
        if (this.x < 0) this.x = 0;
        if (this.x + this.largura > width) this.x = width - this.largura;

        // --- Lógica de Colisão com Plataformas (APRIMORADA) ---
        let colidiuComPlataforma = false;
        for (let plat of fases[faseAtual].plataformas) {
            // Verifica se há colisão e se o jogador está caindo (ou parado)
            if (this.velocidadeY >= 0 &&
                checarColisaoRetangulo(this.x, this.y, this.largura, this.altura, plat.x, plat.y, plat.largura, plat.altura)) {
                
                // Se a parte de baixo do jogador estava ACIMA ou na mesma linha da plataforma no frame anterior
                if (this.y + this.altura - this.velocidadeY <= plat.y) {
                    this.y = plat.y - this.altura; // Coloca o jogador no topo da plataforma
                    this.velocidadeY = 0; // Para de cair
                    colidiuComPlataforma = true; // Colidiu por cima
                }
            }
        }
        this.noChao = colidiuComPlataforma; // Atualiza se está no chão

        // Se cair para fora da tela, reinicia a fase
        if (this.y > height) {
            this.resetarPosicao();
        }
    }

    moverEsquerda() {
        this.velocidadeX = -VELOCIDADE_HORIZONTAL;
    }

    moverDireita() {
        this.velocidadeX = VELOCIDADE_HORIZONTAL;
    }

    pararMovimento() {
        this.velocidadeX = 0;
    }

    pular() {
        if (this.noChao) {
            this.velocidadeY = FORCA_PULO;
            this.noChao = false;
        }
    }
}

// --- Classe Item Coletável (Mantida como antes) ---
class ItemColetavel {
    constructor(x, y, tamanho, tipo) {
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.tipo = tipo; // Ex: "maca", "leite", "cenoura"
        this.coletado = false;
        this.coletadoAnteriormente = false; // Flag para garantir que só conte uma vez
    }

    mostrar() {
        if (!this.coletado) {
            if (this.tipo === "maca") {
                fill(255, 0, 0); // Vermelho para maçã
                ellipse(this.x + this.tamanho / 2, this.y + this.tamanho / 2, this.tamanho, this.tamanho);
            } else if (this.tipo === "leite") {
                fill(255); // Branco para leite (caixa simples)
                rect(this.x, this.y, this.tamanho * 0.7, this.tamanho * 1.2);
            } else if (this.tipo === "milho") {
                fill(255, 255, 0); // Amarelo para milho
                rect(this.x, this.y, this.tamanho * 0.5, this.tamanho * 1.5);
            }
        }
    }

    colisaoComJogador(jogador) {
        if (!this.coletado &&
            checarColisaoRetangulo(jogador.x, jogador.y, jogador.largura, jogador.altura, this.x, this.y, this.tamanho, this.tamanho)) {
            
            this.coletado = true;
            return true;
        }
        return false;
    }
}

// --- Classe Ponto de Entrega (Mantida como antes) ---
class PontoDeEntrega {
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }

    mostrar() {
        fill(0, 100, 200); // Azul para o mercado/ponto de entrega
        rect(this.x, this.y, this.largura, this.altura);
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("MERCADO", this.x + this.largura / 2, this.y + this.altura / 2);
    }

    colisaoComJogador(jogador) {
        return checarColisaoRetangulo(jogador.x, jogador.y, jogador.largura, jogador.altura, this.x, this.y, this.largura, this.altura);
    }
}

// --- Nova Classe: Inimigo (Passarinho Ladrão) ---
class Inimigo {
    constructor(x, y, tamanho, alcanceMin, alcanceMax, velocidade) {
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.alcanceMin = alcanceMin; // Onde ele começa a patrulhar
        this.alcanceMax = alcanceMax; // Onde ele termina a patrulha
        this.velocidade = velocidade;
        this.direcao = 1; // 1 para direita, -1 para esquerda
    }

    mostrar() {
        fill(255, 165, 0); // Laranja para o passarinho
        ellipse(this.x + this.tamanho / 2, this.y + this.tamanho / 2, this.tamanho, this.tamanho);
        fill(0);
        textSize(10);
        textAlign(CENTER, CENTER);
        text("!", this.x + this.tamanho / 2, this.y + this.tamanho / 2); // Simples "!" para indicar perigo
    }

    atualizar() {
        this.x += this.velocidade * this.direcao;

        // Inverte a direção se atingir os limites do alcance
        if (this.x + this.tamanho > this.alcanceMax || this.x < this.alcanceMin) {
            this.direcao *= -1; // Inverte a direção
            this.x = constrain(this.x, this.alcanceMin, this.alcanceMax - this.tamanho); // Garante que não saia do limite
        }
    }

    // Verifica colisão com o jogador
    colisaoComJogador(jogador) {
        return checarColisaoRetangulo(jogador.x, jogador.y, jogador.largura, jogador.altura, this.x, this.y, this.tamanho, this.tamanho);
    }
}


// --- Definição das Fases do Jogo ---
// --- Definição das Fases do Jogo ---
function configurarFases() {
    // Fase 0 (Mantida como antes)
    fases.push({
        numero: 0,
        jogadorInicioX: 50,
        jogadorInicioY: height - 70,
        plataformas: [
            {x: 0, y: height - 40, largura: width, altura: 40}, // Chão principal
            {x: 150, y: height - 150, largura: 100, altura: 20}, // Plataforma 1
            {x: 300, y: height - 250, largura: 120, altura: 20}  // Plataforma 2
        ],
        itens: [
            new ItemColetavel(200, height - 190, 20, "maca"),
            new ItemColetavel(350, height - 290, 20, "leite")
        ],
        inimigos: [
            new Inimigo(300, height - 280, 25, 300, 420, 1.5) // Passarinho na plataforma 2
        ],
        pontoDeEntrega: new PontoDeEntrega(width - 100, height - 100, 80, 60),
        itensNecessarios: 2
    });

    // Fase 1 (Mantida como antes)
    fases.push({
        numero: 1,
        jogadorInicioX: 50,
        jogadorInicioY: height - 70,
        plataformas: [
            {x: 0, y: height - 40, largura: width, altura: 40}, // Chão principal
            {x: 250, y: height - 120, largura: 150, altura: 20}, // Plataforma 1 (mais alta)
            {x: 500, y: height - 220, largura: 180, altura: 20}, // Plataforma 2
            {x: 100, y: height - 250, largura: 80, altura: 20}   // Plataforma 3
        ],
        itens: [
            new ItemColetavel(300, height - 160, 20, "milho"),
            new ItemColetavel(580, height - 260, 20, "maca"),
            new ItemColetavel(120, height - 290, 20, "leite")
        ],
        inimigos: [
            new Inimigo(250, height - 150, 25, 250, 400, 1),
            new Inimigo(500, height - 250, 25, 500, 680, 2)
        ],
        pontoDeEntrega: new PontoDeEntrega(width - 150, height - 280, 80, 60),
        itensNecessarios: 3
    });

    // Fase 2 (Mantida como antes)
    fases.push({
        numero: 2,
        jogadorInicioX: 50,
        jogadorInicioY: height - 70,
        plataformas: [
            {x: 0, y: height - 40, largura: width, altura: 40},
            {x: 100, y: height - 100, largura: 100, altura: 20},
            {x: 300, y: height - 180, largura: 150, altura: 20},
            {x: 550, y: height - 250, largura: 120, altura: 20},
            {x: 700, y: height - 150, largura: 80, altura: 20}
        ],
        itens: [
            new ItemColetavel(150, height - 140, 20, "leite"),
            new ItemColetavel(380, height - 220, 20, "milho"),
            new ItemColetavel(600, height - 290, 20, "maca"),
            new ItemColetavel(730, height - 190, 20, "leite")
        ],
        inimigos: [
            new Inimigo(100, height - 130, 25, 100, 200, 1.2),
            new Inimigo(550, height - 280, 25, 550, 670, 1.8)
        ],
        pontoDeEntrega: new PontoDeEntrega(50, height - 160, 80, 60),
        itensNecessarios: 4
    });

    // --- Nova Fase 3 ---
    fases.push({
        numero: 3,
        jogadorInicioX: 50,
        jogadorInicioY: height - 70,
        plataformas: [
            {x: 0, y: height - 40, largura: width, altura: 40}, // Chão principal
            {x: 100, y: height - 120, largura: 80, altura: 20},  // Plataforma baixa esquerda
            {x: 300, y: height - 200, largura: 100, altura: 20}, // Plataforma média central
            {x: 550, y: height - 100, largura: 150, altura: 20}, // Plataforma baixa direita
            {x: 200, y: height - 300, largura: 120, altura: 20}, // Plataforma alta
            {x: 650, y: height - 250, largura: 80, altura: 20}  // Plataforma inimigo
        ],
        itens: [
            new ItemColetavel(120, height - 160, 20, "maca"),
            new ItemColetavel(350, height - 240, 20, "milho"),
            new ItemColetavel(600, height - 140, 20, "leite"),
            new ItemColetavel(250, height - 340, 20, "maca")
        ],
        inimigos: [
            new Inimigo(550, height - 130, 25, 550, 700, 1.5), // Patrulha na plataforma baixa direita
            new Inimigo(200, height - 330, 25, 200, 320, 2)    // Patrulha na plataforma alta
        ],
        pontoDeEntrega: new PontoDeEntrega(width - 80, height - 160, 80, 60), // Ponto de entrega mais elevado à direita
        itensNecessarios: 4
    });

    // --- Nova Fase 4 ---
    fases.push({
        numero: 4,
        jogadorInicioX: 50,
        jogadorInicioY: height - 70,
        plataformas: [
            {x: 0, y: height - 40, largura: width, altura: 40}, // Chão principal
            {x: 150, y: height - 100, largura: 80, altura: 20},
            {x: 250, y: height - 180, largura: 100, altura: 20},
            {x: 400, y: height - 250, largura: 120, altura: 20},
            {x: 600, y: height - 180, largura: 100, altura: 20},
            {x: 700, y: height - 100, largura: 80, altura: 20}
        ],
        itens: [
            new ItemColetavel(180, height - 140, 20, "leite"),
            new ItemColetavel(280, height - 220, 20, "maca"),
            new ItemColetavel(450, height - 290, 20, "milho"),
            new ItemColetavel(630, height - 220, 20, "leite"),
            new ItemColetavel(730, height - 140, 20, "maca")
        ],
        inimigos: [
            new Inimigo(250, height - 210, 25, 250, 350, 1.8),
            new Inimigo(400, height - 280, 25, 400, 520, 2.5), // Inimigo mais rápido
            new Inimigo(600, height - 210, 25, 600, 700, 1.8)
        ],
        pontoDeEntrega: new PontoDeEntrega(350, height - 320, 80, 60), // Ponto de entrega no alto, no centro
        itensNecessarios: 5
    });
}

// --- Funções Essenciais do P5.js ---

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent('game-container');
    
    configurarFases(); // Carrega as configurações de todas as fases

    // Inicia o jogador na posição da primeira fase
    jogador = new Jogador(fases[faseAtual].jogadorInicioX, fases[faseAtual].jogadorInicioY, 30, 30);
}

function draw() {
    background(135, 206, 235); // Céu azul claro para o fundo

    // Desenha o solo (plataforma principal)
    fill(100, 150, 50); // Verde para o solo
    rect(0, height - 40, width, 40);

    // Desenha as plataformas da fase atual
    fill(139, 69, 19); // Marrom para as plataformas
    for (let plat of fases[faseAtual].plataformas) {
        rect(plat.x, plat.y, plat.largura, plat.altura);
    }

    // Desenha e atualiza o jogador
    jogador.atualizar();
    jogador.mostrar();

    // Desenha os itens coletáveis e verifica colisão
    for (let item of fases[faseAtual].itens) {
        item.mostrar();
        if (item.colisaoComJogador(jogador) && !item.coletadoAnteriormente) { 
            itensNoInventario++; 
            jogador.itensColetadosFase++; 
            item.coletadoAnteriormente = true; 
            console.log(`Item coletado! Inventário: ${itensNoInventario}, Coletados nesta fase: ${jogador.itensColetadosFase}`);
        }
    }

    // Desenha e atualiza os inimigos da fase atual
    for (let inimigo of fases[faseAtual].inimigos) {
        inimigo.atualizar();
        inimigo.mostrar();
        if (inimigo.colisaoComJogador(jogador)) {
            console.log("Colisão com inimigo! Reiniciando fase.");
            jogador.resetarPosicao(); // Reinicia a fase se colidir com inimigo
            break; // Sai do loop para evitar múltiplas colisões no mesmo frame
        }
    }

    // Desenha o ponto de entrega da fase atual
    fases[faseAtual].pontoDeEntrega.mostrar();

    // Verifica se o jogador está no ponto de entrega, tem itens e atingiu o objetivo da fase
    if (fases[faseAtual].pontoDeEntrega.colisaoComJogador(jogador) && 
        itensNoInventario > 0 && 
        jogador.itensColetadosFase >= fases[faseAtual].itensNecessarios) {
        
        pontuacao += itensNoInventario * 10; 
        itensNoInventario = 0; 
        jogador.itensColetadosFase = 0; 

        console.log(`Fase ${faseAtual} Concluída! Pontuação total: ${pontuacao}`);

        // Avança para a próxima fase
        faseAtual++;
        if (faseAtual < fases.length) {
            // Reinicia o jogador na nova fase
            jogador.initialX = fases[faseAtual].jogadorInicioX;
            jogador.initialY = fases[faseAtual].jogadorInicioY;
            jogador.resetarPosicao(); // Reseta para a nova fase
            console.log(`Iniciando Fase ${faseAtual + 1}`);
        } else {
            // Todas as fases concluídas!
            console.log("FIM DE JOGO! Todas as fases concluídas!");
            background(0, 200, 0);
            fill(255);
            textSize(40);
            textAlign(CENTER, CENTER);
            text("PARABÉNS! VOCÊ COMPLETOU O JOGO!", width / 2, height / 2 - 30);
            text(`Pontuação Final: ${pontuacao}`, width / 2, height / 2 + 20);
            noLoop(); // Para o jogo
        }
    }

    // Exibe a pontuação e o inventário na tela
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text(`Fase: ${faseAtual + 1}/${fases.length}`, 10, 10);
    text(`Pontuação: ${pontuacao}`, 10, 40);
    text(`Itens: ${itensNoInventario} / ${fases[faseAtual].itensNecessarios}`, 10, 70); 
}

// --- Controles do Teclado (Mantidos como antes) ---
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        jogador.moverEsquerda();
    } else if (keyCode === RIGHT_ARROW) {
        jogador.moverDireita();
    } else if (keyCode === 32) { // Código da barra de espaço
        jogador.pular();
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        jogador.pararMovimento();
    }
}