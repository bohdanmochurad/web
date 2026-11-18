const burger = document.querySelector('.burger')
const nav = document.querySelector('.nav')

const style = document.createElement('style')
style.innerHTML = `
  .burger.open span:nth-child(1) { transform: translateY(11px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity: 0; }
  .burger.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
  .nav.open { display: flex; }
`
document.head.appendChild(style)

burger.addEventListener('click', () => {
  nav.classList.toggle('open')
  burger.classList.toggle('open')
})

const modal = document.getElementById('contact-modal')
const openModalBtn = document.getElementById('open-modal')
const closeModalBtn = modal.querySelector('.modal-close')
let modalTrigger = openModalBtn
let previousOverflow = ''

function openProjectModal(e) {
  e.preventDefault()
  modalTrigger = e.currentTarget
  previousOverflow = document.body.style.overflow
  modal.style.display = 'flex'
  modal.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
  modal.querySelector('input').focus()
}

function closeProjectModal() {
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = previousOverflow
  modalTrigger.focus()
}

document.querySelectorAll('#open-modal, [data-open-project]').forEach(button => {
  button.addEventListener('click', openProjectModal)
})
closeModalBtn.addEventListener('click', closeProjectModal)
modal.addEventListener('click', e => {
  if (e.target === modal) closeProjectModal()
})
modal.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProjectModal()
  if (e.key !== 'Tab') return
  const controls = modal.querySelectorAll('button, input, select, textarea')
  const first = controls[0]
  const last = controls[controls.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
})

function validateProjectField(field) {
  const value = field.value.trim()
  let message = ''
  if (!value) {
    message = field.tagName === 'SELECT'
      ? 'Оберіть напрям майбутнього застосунку.'
      : 'Заповніть це поле.'
  } else if (field.type === 'email' &&
    (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || field.validity.typeMismatch)) {
    message = 'Вкажіть коректну електронну адресу, наприклад name@example.com.'
  } else if (field.minLength > 0 && value.length < field.minLength) {
    message = `Введіть щонайменше ${field.minLength} символів.`
  } else if (field.maxLength > 0 && value.length > field.maxLength) {
    message = `Використайте не більше ${field.maxLength} символів.`
  }
  const error = document.getElementById(`${field.id}-error`)
  error.textContent = message
  field.setAttribute('aria-invalid', String(Boolean(message)))
  return !message
}

document.querySelectorAll('form[data-validate]').forEach(form => {
  form.noValidate = true
  const fields = Array.from(form.querySelectorAll('input, select, textarea'))
  fields.forEach(field => {
    field.addEventListener('blur', () => validateProjectField(field))
    const revalidate = () => {
      if (field.getAttribute('aria-invalid') === 'true') validateProjectField(field)
    }
    field.addEventListener('input', revalidate)
    field.addEventListener('change', revalidate)
  })
  form.addEventListener('submit', e => {
    e.preventDefault()
    const results = fields.map(validateProjectField)
    const firstInvalid = results.indexOf(false)
    if (firstInvalid !== -1) {
      fields[firstInvalid].focus()
      return
    }
    if (form.id === 'contact-form') {
      closeProjectModal()
      form.reset()
      fields.forEach(field => field.removeAttribute('aria-invalid'))
    }
  })
})
const cardsData = [
  {
    "title": "Каталог товарів",
    "description": "Зберіть назви, описи й категорії, щоб відвідувачам було легко ознайомитися з асортиментом.",
    "image": "img/card-sm.png",
    "alt": "Ілюстрація картки цифрового каталогу"
  },
  {
    "title": "Клієнтський портал",
    "description": "Продумайте особисті розділи, у яких клієнт знаходить потрібні документи та інформацію.",
    "image": "img/card-sm4.png",
    "alt": "Ілюстрація розділу клієнтського порталу"
  },
  {
    "title": "Внутрішні задачі",
    "description": "Впорядкуйте задачі команди: визначте відповідальних, етапи та зрозумілі пріоритети.",
    "image": "img/card-sm2.png",
    "alt": "Ілюстрація картки внутрішньої задачі"
  },
  {
    "title": "База знань",
    "description": "Поєднайте інструкції та відповіді на питання у структурований довідник для команди.",
    "image": "img/card-sm5.png",
    "alt": "Ілюстрація інформаційного запису"
  },
  {
    "title": "Освітній простір",
    "description": "Сплануйте каталог матеріалів, навчальні розділи та послідовність проходження тем.",
    "image": "img/card-sm3.png",
    "alt": "Ілюстрація запису навчального простору"
  },
  {
    "title": "Робочий простір команди",
    "description": "Розділіть спільну інформацію та матеріали з обмеженим доступом за ролями учасників.",
    "image": "img/card-sm6.png",
    "alt": "Ілюстрація розділу з обмеженим доступом"
  }
]

// Функція для створення картки
function createCard(card) {
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card-sm')
  cardDiv.innerHTML = `
        <h3>${card.title}</h3>
        <p>${card.description}</p>
        <img src="${card.image}" alt="${card.alt}">
    `
  return cardDiv
}

function renderCards(cards) {
  const container = document.getElementById('cards-container')
  const columnsCount = 3
  const columns = Array.from({ length: columnsCount }, () =>
    document.createElement('div')
  )
  columns.forEach(column => column.classList.add('column-cards-sm'))
  cards.forEach((card, index) => {
    columns[index % columnsCount].appendChild(createCard(card))
  })

  if (container) {
    columns.forEach(column => container.appendChild(column))
  }
  
}

renderCards(cardsData)

document.addEventListener('DOMContentLoaded', function () {
  const videoBtn   = document.getElementById('openVideo');
  const videoModal = document.getElementById('videoModal');
  const closeVideo = document.getElementById('closeVideo');
  const videoFrame = document.getElementById('videoFrame');

  if (!videoBtn || !videoModal || !closeVideo || !videoFrame) {
    return;
  }

  const YT_URL = 'https://www.youtube.com/embed/aSte18D2_YE?autoplay=1&rel=0';

  const openVideoModal = function (e) {
    e.preventDefault(); // не стрибати до "#"
    videoModal.style.display = 'flex';
    videoFrame.src = YT_URL;
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = function () {
    videoModal.style.display = 'none';
    videoFrame.src = ''; 
    document.body.style.overflow = 'auto';
  };

  videoBtn.addEventListener('click', openVideoModal);
  closeVideo.addEventListener('click', closeVideoModal);

  videoModal.addEventListener('click', function (e) {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });
});


if (document.querySelector('.mySwiper')){
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1040: {
        slidesPerView: 3,
      },
    },
  })
}




document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      faqItems.forEach(function (other) {
        if (other === item) return;
        other.classList.remove('active');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
