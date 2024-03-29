/* var json = require('../data/cidades.json') */
var json = {
    "categoria": "Densidade Demográfica",
    "cidades": [{
            "id": "fortaleza",
            "value": 240,
            "nome": "Fortaleza"
        },
        {
            "id": "acarau",
            "value": 265,
            "nome": "Acaraú"
        },
        {
            "id": "marco",
            "value": 380,
            "nome": "Marco"
        },
        {
            "id": "sobral",
            "value": 325,
            "nome": "Sobral"
        },
        {
            "id": "santa-quiteria",
            "value": 200,
            "nome": "Santa quitéria"
        },
        {
            "id": "caninde",
            "value": 289,
            "nome": "Canindé"
        },
        {
            "id": "trairi",
            "value": 384,
            "nome": "Trairí"
        },
        {
            "id": "acarape",
            "value": 400,
            "nome": "Acarape"
        },
        {
            "id": "quixeramobim",
            "value": 50,
            "nome": "Quixeramobim"
        },
        {
            "id": "taua",
            "value": 400,
            "nome": "Tauá"
        },
        {
            "id": "jaguaretama",
            "value": 100,
            "nome": "Jaguaretama"
        }

    ]
}

/* array de escalas */
var scale = []
//var intervalScale = [];

function percorrerArray() {
    json.cidades.forEach(e => {
        // changeColor(e.id, e.value)

        // gera escala
        scale.push(e.value)
        generatePopover(json.categoria, e.id, e.nome, e.value)
    });

    console.log('scale: ' + scale.sort())
}

function generateScale() {

    // Instancía maior e menor valor do Array
    let maiorValor = Math.max(...scale)
    let menorValor = Math.min(...scale)

    // Gerando razão da progressão aritmética
    let interval = maiorValor / 9;
    console.log(' intervals average:' + interval.toFixed(2))

    // Array de intervalos
    intervalScale = [menorValor]
    console.log(intervalScale);
    for (let i = 0; i < 9; i++) {
        intervalScale.push(Math.floor(interval) + intervalScale[i])
    }
    console.log('interval scale: ' + intervalScale)
    
    // CRIADOR DE GRADIENTE DAS ESCALAS
    // selecionando elementos da escala
    const elems = document.querySelectorAll('.escala div')

    //mudando a opacidade conforme o numero de elementos
    for (i = 0; i < 9; i++) {
        
        // muda a cor de cada elemento da escala
        const elem = elems[i]
        elem.style.backgroundColor = `rgba(0, 80, 240, 0.${i+1})`
    }

    document.querySelector('.InitialValue').innerHTML = menorValor
    document.querySelector('.LastValue').innerHTML = maiorValor

    //intervalScale = intervalScale;    
    return intervalScale, scale;
}

// Gera e posiciona o popover com interação do mouse
function generatePopover(categoria, id, nome, value) {
    document.getElementById(`${id}`).addEventListener("mouseover", function (event) {
        var posX = event.clientX
        var posY = event.clientY

        document.querySelector('.pop').style.top = `${posY}px`
        document.querySelector('.pop').style.left = `${posX/2}px`
        document.querySelector('.pop').style.display = 'block'
        document.querySelector('.pop .city').innerHTML = `${nome}`
        document.querySelector('.pop .category').innerHTML = `${categoria}: ${value}`
    })
}

function closePopover() {
    const popOver = document.querySelector('.pop')
    const btnClose = document.querySelector('.pop .btn-close')
    btnClose.addEventListener('click', function(){
        popOver.style.display = 'none'
    })
}

// Função que gera escala visual na parte de baixo do mapa
function setScale() {
    json.cidades.forEach(e => {
        const elem = document.getElementById(`${e.id}`)
        const elemsScale = document.querySelectorAll('.escala div')

        // quando cursor passa em cima do elemento é ativada a função
        elem.addEventListener("mouseover", function() {
            
            // primeiro retira a borda de todos
            elemsScale.forEach( e => {
                e.style.border = 'none'
            })

            // poe a borda no elemento específico
            for (const i in intervalScale) {
                if (e.value <= intervalScale[Number(i)+1]) {        
                    elemsScale[i].style.border = '1px solid rgba(0, 0, 0, 1)'
                    break
                }
            }
        })
    })
}

// Muda cor do elemento do mapa de acordo com a value do mesmo elemento
function changeColor() {
    // percorre o array
    json.cidades.forEach((e) => {
        // captura o elemento pelo id e 
        const elem = document.getElementById(`${e.id}`)
        if(e.value <= intervalScale[1]){
            elem.style.fill = 'rgba(0, 80, 240, 0.1)'
        } else if(e.value <= intervalScale[2]) {
            elem.style.fill = 'rgba(0, 80, 240, 0.2)'
        } else if(e.value <= intervalScale[3]) {
            elem.style.fill = 'rgba(0, 80, 240, 0.3)'
        } else if(e.value <= intervalScale[4]) {
            elem.style.fill = 'rgba(0, 80, 240, 0.4)'
        } else if(e.value <= intervalScale[5]) {
            elem.style.fill = 'rgba(0, 80, 240, 0.5)'
        } else if(e.value <= intervalScale[6]) {
            elem.style.fill = 'rgba(0, 80, 240, 0.6)'
        } else if(e.value <= intervalScale[7]) {
            elem.style.fill = 'rgba(0, 80, 240, 0.7)'
        } else if(e.value <= intervalScale[8]) {
            elem.style.fill = 'rgba(0, 80, 240, 0.8)'
        } else if(e.value <= intervalScale[9]) {
            elem.style.fill = 'rgba(0, 80, 240, 0.9)'
        } else if(e.value <= intervalScale[10]) {
            elem.style.fill = 'rgba(0, 80, 240, 1)'
        }
    })
}

percorrerArray()
generateScale()
changeColor()
setScale()
closePopover()