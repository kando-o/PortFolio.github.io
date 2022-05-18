/**
 * @description | Animation du loader
 */
function loader(card) {
    let cardPortFolio = document.querySelectorAll('.card__portfolio');
    console.log(cardPortFolio);

    const TLLOAD = gsap.timeline();

    TLLOAD
        // Animation principal
        // --> containe image qui part de zéro
        // --> bloc-txt qui part de zéro
        // --> h2 qui part de bot -100px et qui remonte grace a y : 0
        .to('.contain__image', { height: 400, duration: 2, delay: .3, ease: 'power2.out' })
        .to('.bloc__txt', { height: 'auto', duration: 1.3, ease: 'power2.out' }, '-=.5')
        .to('.bloc__txt h2', { y: 0, ease: 'power2.out' }, '-=0.6')

        // Animation du rideau
        // --> background-trans rideau noir aller
        // --> add qui change de background à la fin de l'animation rideau
        // --> background-trans rideau noir retour
        .to('.bg__transition', { y: 0, ease: 'power2.out' }, '-=.2')
        .add(() => {
            document.querySelector('.flip-img1').style.backgroundImage = "url('./ressources/lionInSuitRed.jpg')";
        })
        .to('.bg__transition', { y: '-100%', delay: .2 })

        // Animation de fin 
        // --> opacity 0 disparition du Loader
        // --> Loader en display none
        .to('.loader__container', { opacity: 0, duration: .8, delay: 0.7 })
        .add(() => {
            document.querySelector('.loader__container').style.display = "none";
        })

        gsap.registerEffect({
        name : "bounce",
        effect : (targets, config , y, x) => {
            return gsap.to(targets, {duration : config.duration, x : config.x, y : config.y, scale : config.scale, rotation : config.rotation, ease : config.ease, opacity : config.opacity})
        },
        defaults: {duration: 2}
    })

    // Animation card partie PortFolio
        // gsap.to(test225[0], { x: -25, delay : 8, duration: 1.8, ease : 'bounce', yoyo:true, repeat : 1} )
        // gsap.to(test[1], { x: 25, delay : 8, duration: 1.8, ease : 'bounce', yoyo:true, repeat : 1} ),
        // gsap.to(cardPortFolio[2], { x: -25, delay : 9.5, duration: 1.8, ease : 'bounce', yoyo:true, repeat : 1} )
        // gsap.to(cardPortFolio[3], { x: 25, delay : 9.5, duration: 1.8, ease : 'bounce', yoyo:true, repeat : 1} )

}
// Display card PortFlolio
(function loadCards() {
    fetch("data.json")
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("cards").innerHTML = data.projets.map(card => loadCard(card)).join``
        render(data)
        return data
    })
})()
/** */
function loadCard(card) {
    
    if(!card.id)return'';
    return `
    <div class="col-lg-4 col-md-6 col-12 card-wrapper translateDroite translateGauche">

        <div class="card  card__portfolio mb-4 shadow" id="${card.name}">

            <span class="card__imagePortfolio">
            <img src="./ressources/${card.image}" alt="${card.alt}" class="card-img-top " style="height: 10.5rem">
            </span>

                <div class="card-body">
                    <h4>${card.title}</h4>
                    <p class="card-text">${card.description}?</p>
                </div>

                <div class="d-flex justify-content-between m-3">
                    <div class="btn-group ">

                    <a href="${card.codeSource}" target="blanc" class="text-dark">
                        <button class="btn btn-sm btn-outline btn-secondary">
                            Code source
                        </button>
                    </a>

                    <a href="${card.viewProjet}" target="blanc" class="text-dark">
                        <button class="btn btn-sm btn-outline btn-secondary ml-2">
                            View Projet
                        </button>
                    </a>
                    
                    <button class="btn btn-sm btn-outline btn-secondary btn__smartVieu ml-2" onclick="launchSmartPhone('${card.viewProjet}')" id="${card.id}">
                        Vieuw Projet SmartPhone
                    </button>            
                </div>
            </div>
        </div>
    </div>
    `;   
};

function render(card) {
    loadCardStacks(card.stacks)
    displaySmartPhone(card.projets);
    renderCardStacks(card.stacks)
    initscrollMagic()

}

function loadCardStacks(cards) {
    // console.log(cards);
    cards.map((card) => {
        console.log();
        document.getElementById('container__stack').innerHTML += `
        <span class="rainbow text-center d-flex m-4 flex-column justify-content-center align-items-center col-md-6 col-lg-3" >

            <div class=" card__stack flex-column align-items-center justify-content-center text-center" style="height: 22rem;">
                <img src="./ressources/${card.image}" alt="" width="140" height="130">
                    <h2 class="text-uppercase text-center">${card.name}</h2>
                        <p>
                            ${card.description}
                        </p>
            </div>
        </span>

        `
        ;
    })
}

// Parallax scollMaggic and GreenSock
let body = document.querySelector('body')

// console.log(body.offsetWidth);

function initscrollMagic() {
    // if (body.offsetWidth > 990) {
    console.log("sup 1200px");

    $(document).ready(function(){
        
        let controller = new ScrollMagic.Controller();
                
        let scenePortfolio = new ScrollMagic.Scene({
            triggerElement: '.titreport',
            reverse : true,
            triggerHook : .2,
            duration:'125%'
        })
        // .addIndicators({
        //     name: 'debut card',
        //     indent: 300,
        //     colorStart: 'green',
        //     colorEnd: 'red',
        //     colorTrigger: 'blue'
        // }) 
        .setClassToggle('.card-wrapper', 'fade-in-translateX')
        .addTo(controller)

       let sceneParallax = new ScrollMagic.Scene({
            triggerElement: '.parallax__stack',
            triggerHook : .5,
            duration:"50%",
            // offset: 3400
        })
        .setClassToggle('.parallaxStack__content', 'fade-in-in-opacity')

        // .addIndicators({
        // name:'débutStackSroll',
        // indent: 200,
        // colorStart: 'green',
        // colorEnd: 'red',
        // colorTrigger: 'blue'
        // })
        .addTo(controller)
    })
    // } else {
    //     console.log("scrollMagic portFolio non activer");
    // }

}

// Displaycard Stacks

function launchSmartPhone(src){
    console.log('test');
    let srcIframe = document.getElementById('srcIframe');
    document.querySelector(".smartphone__wrapper").classList.remove('smart__hide');
    document.querySelector(".smartphone__wrapper").classList.add('smart__vieuw');
    srcIframe.src = src
}

function displaySmartPhone(card){

    const btnVieuwSmartPhone = document.querySelectorAll('.projet_phone');
    let arraymap = []
    let btnCloseSmartPhone = document.querySelector('.smartphone__close');
    
    card.map(vp => console.log(vp.viewProjet))
    btnCloseSmartPhone.onclick = () => {
        console.log("click");
        document.querySelector(".smartphone__wrapper").classList.add('smart__hide');
    }
};

function loadCardsStack(elem, elParent = null, elClass, obj) {
   
    let createEl = document.createElement(elem);
    if (elClass && elClass.length > 0){elClass.split(" ").map(c => createEl.classList.add(c)) };
    if (elParent) {
        elParent.appendChild(createEl)
        return createEl;
    } else { 
        console.log("No parent");
    }
};

function parsElDom(obj, parent = null){
    let createdEl = document.createElement(obj.name)

    if (obj.classes && obj.classes > 0 ) {
        obj.classes.map((c) => createdEl.classList.add(c));
    }
    if (obj.description || obj.name) {
        createdEl.textContent = obj.description
        createdEl.textContent = obj.name
    }
    if (obj.children) {
        parsElDom(c, createdEl)
    }
    return createdEl
}

function renderCardStacks(arrayStack){
    // const containerStack = document.getElementById('container__stack');

    // loadCardStack("div", containerStack, "test", arrayStack)
    let id = -1;
    arrayStack.map((arraymap) => {
        id++;
        arraymap.index = id
        const objStack = {
        }
    })
    parsElDom(arrayStack)
}


window.onload = loader;