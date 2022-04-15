let card = document.querySelectorAll('.card')

console.log(card);
const loader = () => {

    const TLLOAD = gsap.timeline();
    
    TLLOAD
    // Animation principal
    // --> containe image qui part de zéro
    // --> bloc-txt qui part de zéro
    // --> h2 qui part de bot -100px et qui remonte grace a y : 0
    .to('.contain-image', {height: 400, duration: 2, delay: .3, ease: 'power2.out'})
    .to('.bloc-txt', {height: 'auto', duration: 1.3, ease: 'power2.out'}, '-=.5')
    .to('.bloc-txt h2', { y:0, ease : 'power2.out'}, '-=0.6')
    
    // Animation du rideau
    // --> background-trans rideau noir aller
    // --> add qui change de background à la fin de l'animation rideau
    // --> background-trans rideau noir retour
    .to('.background-transition', {y: 0, ease : 'power2.out'}, '-=.2')
    .add(() => {
        document.querySelector('.flip-img1').style.backgroundImage = "url('./ressources/lionInSuitRed.jpg')"
    })
    .to('.background-transition', {y: '-100%', delay : .2})
    
    // Animation de fin 
    // --> opacity 0 disparition du Loader
    // --> Loader en display none
    
    .to('.loader-container', {opacity :0, duration: .8, delay: 0.7} )
    .add(() => {
        document.querySelector('.load-container').style.display = "none";
    })
}

gsap.registerEffect({
    name : "bounce",
    effect : (targets, config , y, x) => {
        return gsap.to(targets, {duration : config.duration, x : config.x, y : config.y, scale : config.scale, rotation : config.rotation, ease : config.ease, opacity : config.opacity})
    },
    defaults: {duration: 2}
})


gsap.to(card[0], { x: -25, delay : 8, duration: 2, ease : 'bounce'} )
gsap.to(card[1], { x: 25, delay : 8, duration: 2, ease : 'bounce'} )
gsap.to(card[2], { x: -25, delay : 9.5, duration: 2, ease : 'bounce'} )
gsap.to(card[3], { x: 25, delay : 9.5, duration: 2, ease : 'bounce'} )

window.onload = loader;