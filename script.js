let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");//reinderiza o desenho que vai ter dentro do canvas
let box = 32;// tamanho de cada quadradinho
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    // Math.floor = retira a parte flutuante
    // Math.random mostra sempre um nº aleatório até 1
    // Locais aleatórios para a comidinha
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16*box, 16*box);
}

function criarCobrinha(){
    for (i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box,box);
    }

}
//desenhar a comidinha
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
//keydown = evento de clique do teclado
document.addEventListener('keydown',update);// pega o keydown e chama a função update

function update(event){
    // condicional & pois a cobrinha não consegue ir para a direção oposta
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo(){

    // para permitir que a cobrinha "atravesse" a parede
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16*box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y =0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16*box;

    
// para não deixar a cabeça da cobrinha encostar no corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo); // para o jogo
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

// coordenadas quando a cobrinha for andar 
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

// Aumentar o tamanho da cobrinha quando come
    if (snakeX != food.x || snakeY != food.y){
        snake.pop(); // retira o último elemento do array
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() *15 + 1) * box;
    } 
       

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);// A cada 100 milisegundos o iniciar vai estar sendo renovado,
// dando continuidade ao jogo sem travar

