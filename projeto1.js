window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //Inicialização-----------------------------------------------------------------------------------------------------------------------------------------------
        //BACKGROUND-----------------------------------------------------------------------------------------------------------------------
        var background = new Image();
        background.src = "newback.png";
        var passaro = new Image();
        passaro.src = "passaro22.png";
        var frame = 0;
        var grao = new Image();
        grao.src = "giphy.gif";
        var posxgrao = canvas.width;
        var posygrao = Math.random() * canvas.height;
        //vidas------------------------------------------------------------------------
        var vidas = 3;
        var vidasImg = new Image();
        vidasImg.src = "Heart-Bird.png";
        var colisao = false;
        //explosão--------------------------------------------
        var explosao = new Image();
        explosao.src = "explosion.png";
        var repete = 0;
        var frameExpl = 0;
        var larguraExp = 512
        //TARTARUGA---------------------------------------------------------------------------
        var tartaruga = new Image();
        tartaruga.src = "tartaruga final.png";
        var frameTartaruga = 0;
        var xTartaruga = canvas.width;
        var yTartaruga = Math.random() * (canvas.height - 100 - 300) + 300;
        var pontuacao = 0; //variavel pontuacao
        var xExp;
        var yExp;
        var alturaTarturaga = 302 / 2;
        var larguraTartaruga = 416 / 2;
        var g = 0.1;
        var b = yTartaruga; //variavel que guarda a altura da tartaruga para fazer os saltoTartarugas
        var vYTartaruga = 0;
        //Aviao-----------------------------------------------------------------AJUSTAR O AVIAO PARA TER A MESMA DISTACIA EM TODOS OS FRAMES
        var aviao = new Image();
        aviao.src = "aviao final.png";
        var frameAviao = 0;
        var xAviao = canvas.width;
        var yAviao = Math.random() * 250;
        var alturaAviao = 747 / 2;
        var larguraAviao = 738 / 2;
        var c = yAviao+50; //variavel que guarda a altura do aviao para fazer o movimento
        var vYAviao = 0.02*Math.sin(180 * (Math.PI / 180));
        var colisaoPassaroAviao = false;
        var colisaoPassaroTartaruga = false;
        canvas.addEventListener("click", on_click, false);
        tartaruga.addEventListener('load', function () {
            // window.setInterval(Anima,1000);
        });
        //TODO: no onload da imagem, Anima();
        passaro.addEventListener('load', function () {
            //window.setInterval(Anima,1000/0.5)
        });
        document.addEventListener('load', Anima);
        var frameIndex = 0; //frame atual
        //MOVER BOLA COM O TECLADO--------------------------------------------------------------------------------------------------------
        //variáveis globais
        var x = 100;
        var y = 100;
        var alturaframe = 169.6;
        var larguraframe = 182.2;
        var rightkey = false;
        var leftkey = false;
        var upkey = false;
        var downkey = false;
        //pausa
        var gamePaused = false;
        var novoJogo = false;
        var mouseX, mouseY;
        //Fim de inicializações--------------------------------------------------------------------------------------------------------------------------------------------------------------
        function KeyDown(evt) {
            if (evt.keyCode == 39)
                rightkey = true;
            if (evt.keyCode == 37)
                leftkey = true;
            if (evt.keyCode == 38)
                upkey = true;
            if (evt.keyCode == 40)
                downkey = true;
            if (evt.keyCode == 80) {
                gamePaused = !gamePaused;
            }
        }
        function KeyUp(evt) {
            if (evt.keyCode == 39)
                rightkey = false;
            if (evt.keyCode == 37)
                leftkey = false;
            if (evt.keyCode == 38)
                upkey = false;
            if (evt.keyCode == 40)
                downkey = false;
        }
        //deteta 
        window.addEventListener('keydown', KeyDown);
        window.addEventListener('keyup', KeyUp);
        //FIM DE MOVIMENTO TECLADO---------------------------------------------------------------------------------------------------------------------------------
        //MOVIMENTO RATO
        function on_click(e) {
            mouseX = e.pageX - canvas.offsetLeft;
            mouseY = e.pageY - canvas.offsetTop;

            //click dentro do botao do novo jogo
            if (mouseX > 650 && mouseX < 925 && mouseY > 325 && mouseY < 375) {
                novoJogo = true;
                if (novoJogo) {
                    window.location = "projeto1.html";
                }
            }
            if (mouseX > 650 && mouseX < 925 && mouseY > 400 && mouseY < 450) {
                window.location = "index.html";
            }
            canvas.addEventListener("click", on_click, false);
        }
        function backgroundAnimation() {
            //BACKGROUND------------------------------------------------------------------------------------------------------------------------------------------
            ctx.drawImage(background, frameIndex, 0, 1550, 740, 0, 0, canvas.width, canvas.height);
            frameIndex++;
            if (frameIndex == 1550) {
                frameIndex = 0;
            }//reiniciar o número da frame
        }
        function DesenhaPassaro() {
            //PASSARO------------------------------------------------------------------------------------------------------------------------------------------------
            //desenha passaro
            ctx.beginPath();

            if (rightkey && x + 100 < canvas.width) {
                x = x + 15;
            }
            if (leftkey && x > 0) {
                x = x - 15;
            }
            if (upkey && y > 0) {
                y = y - 15;
            }
            if (downkey && y + 90 < canvas.height) {
                y = y + 15;
            }
            //Sprite passaro----------------------------------------------------------------------------------------------------------------------------------------
            if (frame <= 5) {
                ctx.drawImage(passaro, frame * larguraframe, 0, larguraframe, alturaframe, x, y, 100, 100);
                frame++;
            }
            if (frame > 5 && frame <= 10) {
                ctx.drawImage(passaro, (frame - 5) * larguraframe, alturaframe, larguraframe, alturaframe, x, y, 100, 100);
                frame++;
            }
            if (frame > 10 && frame <= 14) {
                ctx.drawImage(passaro, (frame - 10) * larguraframe, 2 * alturaframe, larguraframe, alturaframe, x, y, 100, 100);
                frame++;
            }
            if (frame == 14) {
                frame = 0;
            }
        }
        function desenhaGrao() {
            //grão----------------------------------------------------------------------------------------------------------------------------------------------------
            ctx.drawImage(grao, 0, 0, 527, 484, posxgrao, posygrao, 80, 80);
            posxgrao = posxgrao - 7;
        }
        function saltoTartaruga() { //movimento de saltoTartaruga da tartaruga
            console.log(yTartaruga);
            if (yTartaruga <= b) {
                vYTartaruga = -vYTartaruga;
            }
            else {
                vYTartaruga += g;
                yTartaruga += vYTartaruga;
            }
            if (yTartaruga >= canvas.height - 100) vYTartaruga = -vYTartaruga;
            if (yTartaruga >= b && yTartaruga <= canvas.height) {
                vYTartaruga += g;
                yTartaruga += vYTartaruga;
                console.log("b: " + b);
            }
        }
        function FuncTartaruga() {
            saltoTartaruga();
            if (frameTartaruga <= 2) {
                ctx.drawImage(tartaruga, frameTartaruga * larguraTartaruga, 0, larguraTartaruga, alturaTarturaga, xTartaruga, yTartaruga, 100, 100);
                xTartaruga = xTartaruga - 3;
                frameTartaruga++;
            }
            if (frameTartaruga > 2 && frameTartaruga <= 4) {
                ctx.drawImage(tartaruga, (frameTartaruga - 3) * larguraTartaruga, alturaTarturaga, larguraTartaruga, alturaTarturaga, xTartaruga, yTartaruga, 100, 100);
                xTartaruga = xTartaruga - 3;
                frameTartaruga++;
            }
            if (frameTartaruga == 5) {
                frameTartaruga = 0;
            }

        }
        function FuncAviao() {
            if (yAviao <= c) {
                vYAviao = -vYAviao;
            }
            else {
                vYAviao += g;
                yAviao += vYAviao;
            }
            if (yAviao >= 400) vYAviao = -vYAviao;
            if (yAviao >= c && yAviao <= canvas.height/2) {
                vYAviao += g;
                yAviao += vYAviao;
            }
            if (frameAviao <= 2) {
                ctx.drawImage(aviao, frameAviao * larguraAviao, 0, larguraAviao, alturaAviao, xAviao, yAviao, 150, 150);
                xAviao = xAviao - 4;
                frameAviao++;
            }
            if (frameAviao > 2 && frameAviao <= 4) {
                ctx.drawImage(aviao, (frameAviao - 3) * larguraAviao, alturaAviao, larguraAviao, alturaAviao, xAviao, yAviao, 150, 150);
                xAviao = xAviao - 4;
                frameAviao++;
            }
            if (frameAviao == 5) {
                frameAviao = 0;
            }
        }
    }
    function DesenhaExplosao() {
        if (frameExpl <= 3) {
            ctx.drawImage(explosao, frameExpl * larguraExp, 0, larguraExp, larguraExp, xExp - 50, yExp - 50, 200, 200);
            frameExpl++;
        }
        if (frameExpl > 3 && frameExpl <= 6) {
            ctx.drawImage(explosao, (frameExpl - 3) * larguraExp, larguraExp, larguraExp, larguraExp, xExp - 50, yExp - 50, 200, 200);
            frameExpl++;
        }
        if (frameExpl > 6 && frameExpl < 10) {
            ctx.drawImage(explosao, (frameExpl - 9) * larguraExp, 2 * larguraExp, larguraExp, larguraExp, xExp - 50, yExp - 50, 200, 200);
            frameExpl++;
        }
        if (frameExpl = 9) {
            frameExpl = 0;
        }
    }

    //COLISOES-------------------------------------------------------------------------------------------------------------------------------------------------------
    function colisaoGraoPassaro(colisaoPassaroGrao) {
        if (!(posxgrao >= x + 25) && !(posxgrao + 25 <= x) && !(posygrao >= y + 100) && !(posygrao + 30 <= y)) {
            colisaoPassaroGrao = true;
        }
        if (colisaoPassaroGrao === true) {
            posxgrao = canvas.width;
            posygrao = Math.random() * canvas.height;
            desenhaGrao();
            pontuacao = pontuacao + 10;
            colisaoPassaroGrao = false;
        }
        //  }
        return colisaoPassaroGrao;
    }
    function colisaoAviaoPassaro(colisaoPassaroAviao) {
        frameExpl = 0;
        if (!(xAviao >= x + 100) && !(xAviao + 150 <= x) && !(yAviao >= y + 100) && !(yAviao + 150 <= y)) {
            colisaoPassaroAviao = true;
            console.log("BUMMM")
        }

        if (colisaoPassaroAviao === true) {
            xExp = x;
            yExp = y;
            vidas--;
            DesenhaExplosao();
            xAviao = canvas.width;
            yAviao = Math.random() * 250;
            c=vYAviao;
            vYAviao=0;
            FuncAviao();
        }
        return colisaoPassaroAviao;
    }
    function colisaoTartarugaPassaro(colisaoPassaroTartaruga) {
        //ctx.strokeRect(xTartaruga, yTartaruga, 100, 100)
        frameExpl = 0;
        if (!(xTartaruga >= x + 100) && !(xTartaruga + 150 <= x) && !(yTartaruga >= y + 100) && !(yTartaruga + 150 <= y)) {
            colisaoPassaroTartaruga = true;
            console.log("BUMMM")
        }

        if (colisaoPassaroTartaruga === true) {
            xExp = x;
            yExp = y;
            vidas--;
            DesenhaExplosao();
            xTartaruga = canvas.width;
            yTartaruga = Math.random() * 250;
            b = yTartaruga;
            vYTartaruga = 0;
            FuncAviao();
        }
        return colisaoPassaroTartaruga;
    }
    function Pontuação() {
        ctx.font = 'bold 40px Verdana';
        ctx.fillStyle = "white";
        ctx.fillText(pontuacao, 25, 715, 100);
    }
    function Vidas() {
        for (var i = 0; i < vidas; i++) {
            ctx.drawImage(vidasImg, 0, 0, 2322, 898, 130 + 100 * i + 10 * i, 680, 100, 40);
        }
    }
    if (yTartaruga <= posygrao + 150 || yTartaruga <= yAviao + 200 || yTartaruga <= 150 || yTartaruga >= canvas.height - 300) {
        yTartaruga = Math.random() * (canvas.height - 100 - 300) + 300;
        b = yTartaruga;
        vYTartaruga = 0;
    }
    if (yAviao < 300 || yAviao > canvas.height - 600) {
        yAviao = Math.random() * 250;
        c= yAviao;
        vYAviao=0;
        // (max - min) + min
    }
    function Perder() {
        //JANELA DE PERDEU COM OPÇÔES
        ctx.beginPath();
        ctx.lineTo(1000, 200);
        ctx.lineTo(1000, 550);
        ctx.lineTo(570, 550);
        ctx.lineTo(570, 200);
        ctx.fillStyle = 'lightblue';
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.font = 'bold 40px Helvetica';
        ctx.fillStyle = "white";
        ctx.fillText("Perdeu!", 790, 250);
        ctx.fillText("O seu Score foi " + pontuacao, 790, 295);
        //Novo Jogo Opção1
        ctx.moveTo(350, 250);
        ctx.beginPath();
        ctx.lineTo(650, 325);
        ctx.lineTo(650, 375);
        ctx.lineTo(925, 375);
        ctx.lineTo(925, 325);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
        //Novo Jogo Opção
        ctx.moveTo(925, 400);
        ctx.beginPath();
        ctx.lineTo(650, 400);
        ctx.lineTo(650, 450);
        ctx.lineTo(925, 450);
        ctx.lineTo(925, 400);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = 'cornflowerblue';
        ctx.textAlign = "center";
        ctx.font = 'bold 25px Helvetica';
        ctx.fillText("Novo Jogo", 780, 358);
        ctx.fillStyle = 'cornflowerblue';
        ctx.fillText("Voltar ao Menu", 780, 433);

    }

    //ANIMACOES-------------------------------------------------------------------------------------------------------------------------------------------------------
    function Anima() {
        if ((yTartaruga >= yAviao + 300) && (yTartaruga + 300 <= yAviao)) {
            yTartaruga = Math.random() * (canvas.height - 100 - 300) + 300;
        }
        if ((posygrao >= yAviao + 300) && (posygrao + 30 <= yAviao)) {
            yAviao = Math.random() * 300;
        }
        if (posygrao > canvas.height-100) {
                    posxgrao = canvas.width;
                    posygrao = Math.random() * canvas.height;
                    desenhaGrao();
                }
        console.log(gamePaused);
        if (vidas >= 1) {
            if (gamePaused == false) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                backgroundAnimation();
                Vidas();
                desenhaGrao();
                DesenhaPassaro();
                colisaoGraoPassaro(colisao);
                colisaoAviaoPassaro(colisaoPassaroAviao);
                colisaoTartarugaPassaro(colisaoPassaroTartaruga);
                if (posxgrao < 5) {
                    posxgrao = canvas.width;
                    posygrao = Math.random() * canvas.height;
                    desenhaGrao();
                }
                //TARTARUGA
                FuncTartaruga();

                if (xTartaruga < 0 - larguraTartaruga) {
                    xTartaruga = canvas.width;
                    yTartaruga = Math.random() * (canvas.height - 100 - 300) + 300;
                    b = yTartaruga;
                    vYTartaruga = 0;
                }
                //aviao
                FuncAviao();
                if (xAviao < 0 - larguraAviao) {
                    xAviao = canvas.width;
                    yAviao = Math.random() * 300;
                    c=yAviao;
                    vYAviao=0;
                }
                Pontuação();
            }
        }
        else if (vidas < 1) {
            Perder();
        }
    }
    var myReq = window.setInterval(Anima, 20);
}
