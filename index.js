// script.js
let slideIndex = 0 // Déclarer slideIndex en dehors des fonctions

carousel()

function carousel() {
    const slides = document.querySelector('.slides')
    const slideWidth = slides.firstElementChild.clientWidth
    const slidesArray = Array.from(slides.children) // Convertir la liste des enfants en tableau
    slidesArray.forEach((slide, index) => {
        if (index === slideIndex) {
            $(slide).show()
        } else {
            $(slide).hide()
        }
    })

    // Mettre à jour les points de suivi
    const pagination = document.querySelector('.pagination')
    pagination.innerHTML = '' // Effacez les points de suivi existants
    slidesArray.forEach((slide, index) => {
        const dot = document.createElement('span')
        dot.classList.add('dot')
        if (index === slideIndex) {
            dot.classList.add('active') // Ajoutez la classe "active" au point de suivi correspondant à la diapositive actuelle
        }
        dot.setAttribute('onclick', `goToSlide(${index})`)
        pagination.appendChild(dot)
    })
}

function plusSlides(n) {
    slideIndex += n
    const slides = document.querySelector('.slides')
    if (slideIndex < 0) {
        slideIndex = slides.children.length - 1
    } else if (slideIndex >= slides.children.length) {
        slideIndex = 0
    }
    carousel()
}

function goToSlide(index) {
    slideIndex = index
    carousel()
}

linkElementsA = $('.slides a') // premier carrousel
// const carrouselContainerA = $('.carousel-container')
// const carrouselContentA = $('.carousel-content')

linkElements = $('.galery-div a') // second carrousel
const carrouselContainer = $('.carousel-container')
const carrouselContent = $('.carousel-content')
const btnCloseCarrousel = $('.btn-close-carrousel')

btnCloseCarrousel.on('click', function () {
    carrouselContainer.hide()
})

//console.log(carrouselContainer)
//console.log(linkElementsA)
carrouselContent.hide()
carrouselContainer.hide()

function carousselImg(linkImg, section, div) {
    for (const link of linkImg) {
        $(link).on('click', function (e) {
            e.preventDefault()

            // Afficher le carrousel
            section.show()
            div.show()
            section.addClass('active')

            // Sélectionner l'élément <img> à l'intérieur de l'élément <a>
            imgSrc = $(this).find('img')

            // Ajouter une classe à l'élément <img>
            imgSrc.addClass('link-img')

            // Copier l'élément <img> pour l'ajouter au carrousel
            const clonedImg = imgSrc.clone()

            // Ajouter l'image clonée au conteneur de carrousel
            div.empty().append(clonedImg)

            let currentIndex = 0

            // Gestionnaire d'événement clic pour le bouton suivant
            $('.nextBtn').on('click', function () {
                currentIndex++
                if (currentIndex >= linkImg.length) {
                    currentIndex = 0
                }
                const nextImgSrc = $(linkImg[currentIndex])
                    .find('img')
                    .attr('src')
                div.empty().append(`<img src="${nextImgSrc}" class="link-img">`)
            })

            // Gestionnaire d'événement clic pour le bouton précédent
            $('.prevBtn').on('click', function () {
                currentIndex--
                if (currentIndex < 0) {
                    currentIndex = linkImg.length - 1
                }
                const prevImgSrc = $(linkImg[currentIndex])
                    .find('img')
                    .attr('src')
                div.empty().append(`<img src="${prevImgSrc}" class="link-img">`)
            })

            // Cache le caroussel si on click à l'extérieur de l'image affichée
            document.addEventListener('click', function (event) {
                const isInsideCarousel =
                    event.target.closest('#carouselContainer')
                const isInsideImageLink = event.target.closest('.link-img')
                const isInsideButton =
                    event.target.closest('.nextBtn, .prevBtn')

                if (
                    !isInsideCarousel &&
                    !isInsideImageLink &&
                    !isInsideButton
                ) {
                    carrouselContainer.hide()
                    carrouselContent.hide()
                    imgSrc.removeClass('link-img').addClass('link-img-reduce')
                }
            })
        })
    }
}

carousselImg(linkElementsA, carrouselContainer, carrouselContent)

carousselImg(linkElements, carrouselContainer, carrouselContent)

// Gestion du Dropdown

$('.dropdown-ul').hide()

let toggleMenu = true

$('.toggle-menu-span').on('click', function (e) {
    if (toggleMenu) {
        $('.dropdown-ul').show()
        toggleMenu = false
    } else {
        $('.dropdown-ul').hide()
        toggleMenu = true
    }
})

$('.dropdown-ul a').on('click', function () {
    $('.dropdown-ul').hide()
    $('.toggle-menu-span').show()
    console.log('test click')
})
