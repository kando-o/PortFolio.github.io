/**
 * @description | Animation du loader
 */
function loader() {

    loadCards();
    let card = document.querySelectorAll('.card');

    const TLLOAD = gsap.timeline();

    TLLOAD
        // Animation principal
        // --> containe image qui part de zéro
        // --> bloc-txt qui part de zéro
        // --> h2 qui part de bot -100px et qui remonte grace a y : 0
        .to('.contain-image', { height: 400, duration: 2, delay: .3, ease: 'power2.out' })
        .to('.bloc-txt', { height: 'auto', duration: 1.3, ease: 'power2.out' }, '-=.5')
        .to('.bloc-txt h2', { y: 0, ease: 'power2.out' }, '-=0.6')

        // Animation du rideau
        // --> background-trans rideau noir aller
        // --> add qui change de background à la fin de l'animation rideau
        // --> background-trans rideau noir retour
        .to('.background-transition', { y: 0, ease: 'power2.out' }, '-=.2')
        .add(() => {
            document.querySelector('.flip-img1').style.backgroundImage = "url('./ressources/lionInSuitRed.jpg')";
        })
        .to('.background-transition', { y: '-100%', delay: .2 })

        // Animation de fin 
        // --> opacity 0 disparition du Loader
        // --> Loader en display none
        .to('.loader-container', { opacity: 0, duration: .8, delay: 0.7 })
        .add(() => {
            document.querySelector('.load-container').style.display = "none";
        });

    gsap.registerEffect({
        name : "bounce",
        effect : (targets, config , y, x) => {
            return gsap.to(targets, {duration : config.duration, x : config.x, y : config.y, scale : config.scale, rotation : config.rotation, ease : config.ease, opacity : config.opacity})
        },
        defaults: {duration: 2}
    })

    // Animation card partie PortFolio
    gsap.to(card[0], { x: -25, delay : 8, duration: 1.8, ease : 'bounce', yoyo:true, repeat : 1} )
    gsap.to(card[1], { x: 25, delay : 8, duration: 1.8, ease : 'bounce', yoyo:true, repeat : 1} )
    gsap.to(card[2], { x: -25, delay : 9.5, duration: 1.8, ease : 'bounce', yoyo:true, repeat : 1} )
    gsap.to(card[3], { x: 25, delay : 9.5, duration: 1.8, ease : 'bounce', yoyo:true, repeat : 1} )
}


// Display Card

const loadCards = ()=>{
    fetch("data.json")
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("cards").innerHTML = data.projets.map(card => loadCard(card)).join``
        document.getElementById("cards").innerHTML += '<p id="bt-empty">Click</p>';
        const bt = document.getElementById("bt-empty");
        bt.onclick = ()=> {
            document.querySelector(".smartphone__frame").innerHTML = "<h1>Oh My f...God !</h1>";
            document.querySelector(".smartphone__wrapper").classList.toggle("smart__hide");
        };
        displayPhone(data.projets);

    })
}

const loadCard = (card)=>{
    
    if(!card.id)return'';

    return `<div class="col-lg-4 col-md-6 col-12 card-wrapper">
                <div class="card mb-4 shadow-sm" id="${card.name}">
                        <img src="./ressources/${card.image}" alt="${card.alt}" class="card-img-top " style="height: 10.5rem" >
                        <div class="card-body">
                            <h4>${card.title}</h4>
                            <p class="card-text">${card.description}?</p>
                        </div>

                        <div class="d-flex justify-content-between m-3">
                            <div class="btn-group ">
                                <a href="${card.codeSource}" target="_blanc" class="text-dark">
                                    <button class="btn btn-sm btn-outline btn-secondary">
                                        Code source
                                    </button>
                                </a>
                                <a href="${card.viewProject}" target="_blanc" class="text-dark">
                                    <button class="btn btn-sm btn-outline btn-secondary ml-2">
                                        View Projet
                                    </button>
                                </a>
                                <button class="btn btn-sm btn-outline btn-secondary ml-2 projet_phone">
                                    View Projet phone
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
   
};
function displayPhone(card){

    const htmlPhone = document.querySelectorAll('.projet_phone');
    htmlPhone.forEach((item) => {
        console.log();
        item.onclick = () => {
            console.log('clicke vieuw');
            document.querySelector(".smartphone__wrapper").classList.remove('smart__hide')
            document.querySelector(".smartphone__wrapper").classList.add('smart__vieuw')

        }
    })
    let btnCloseSmartPhone = document.querySelector('.smartphone__close')
   btnCloseSmartPhone.onclick = () => {
       document.querySelector('.smartphone__wrapper').classList.add("smart__hide")
} 
       
};


window.onload = loader;