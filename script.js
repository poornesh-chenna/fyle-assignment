let slideIndex = 0
const slides = document.querySelectorAll('.slide')
const dots = document.querySelectorAll('.dot')
const carousel = document.querySelector('.carousel')
let slideTimeout

function updateDots() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active')
    dots[i].classList.add('black-dot')
  }
  dots[slideIndex % dots.length].classList.add('active')
  dots[slideIndex % dots.length].classList.remove('black-dot')
}

function showSlides() {
  slideIndex++
  if (slideIndex >= 3) {
    carousel.style.transition = 'none'
    slideIndex = 0
    carousel.style.transform = 'translateX(0)'
    setTimeout(() => {
      carousel.style.transition = 'transform 2s ease-in-out'
      carousel.style.transform = 'translateX(' + -slideIndex * 100 + '%)'
    }, 50)
  } else {
    carousel.style.transform = 'translateX(' + -slideIndex * 100 + '%)'
  }
  updateDots()
  slideTimeout = setTimeout(showSlides, 5000)
}

function currentSlide(n) {
  clearTimeout(slideTimeout)
  slideIndex = n
  carousel.style.transition = 'transform 2s ease-in-out'
  carousel.style.transform = 'translateX(' + -slideIndex * 100 + '%)'
  updateDots()
  slideTimeout = setTimeout(showSlides, 5000)
}

document.addEventListener('DOMContentLoaded', (event) => {
  slideTimeout = setTimeout(showSlides, 5000)
})

const cards = document.querySelectorAll('.OP-card')
const image = document.getElementById('changableImage')

const imageSources = {
  project1: 'Assets/image.png',
  project2: 'Assets/projectImg2.jpg',
  project3: 'Assets/projectImg3.jpg',
}

cards.forEach((card) => {
  card.addEventListener('click', function () {
    cards.forEach((c) => c.classList.remove('selected-card'))

    this.classList.add('selected-card')

    const projectId = this.id
    image.src = imageSources[projectId]
  })
})

document.getElementById('myForm').addEventListener('submit', function (event) {
  event.preventDefault()

  const form = event.target
  const formData = new FormData(form)

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        form.reset()
        alert('Form submitted successfully!')
      } else {
        alert('Form submission failed. Please try again.')
      }
    })
    .catch((error) => {
      alert('An error occurred. Please try again.')
    })
})
