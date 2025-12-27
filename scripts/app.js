document.addEventListener('DOMContentLoaded', () => {
	// --- 3D Tilt Effect ---
	const card = document.getElementById('tilt-card')
	const container = document.body

	// Only apply tilt on desktop to save battery/performance on mobile
	if (window.matchMedia('(min-width: 768px)').matches) {
		container.addEventListener('mousemove', e => {
			const xAxis = (window.innerWidth / 2 - e.pageX) / 25 // Угол поворота X
			const yAxis = (window.innerHeight / 2 - e.pageY) / 25 // Угол поворота Y

			// Применяем вращение
			card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
		})

		// Сброс при уходе мыши
		container.addEventListener('mouseleave', () => {
			card.style.transform = `rotateY(0deg) rotateX(0deg)`
		})

		// Более плавный вход мыши в карточку
		container.addEventListener('mouseenter', () => {
			card.style.transition = 'none' // Убираем задержку при движении
		})
	}

	// --- Modal Logic ---
	const downloadBtn = document.getElementById('download-btn')
	const modal = document.getElementById('dl-modal')
	const closeBtn = document.getElementById('close-btn')

	downloadBtn.addEventListener('click', () => {
		modal.classList.add('active')
	})

	closeBtn.addEventListener('click', closeModal)
	modal.addEventListener('click', e => {
		if (e.target === modal) closeModal()
	})

	function closeModal() {
		modal.classList.remove('active')
	}

	// --- Button Click Ripple Effect ---
	// Добавляет эффект "волны" при клике на кнопки
	document.querySelectorAll('.btn').forEach(btn => {
		btn.addEventListener('click', function (e) {
			// Если это ссылка, не блокируем переход, но показываем эффект
			let x = e.clientX - e.target.getBoundingClientRect().left
			let y = e.clientY - e.target.getBoundingClientRect().top

			let ripples = document.createElement('span')
			ripples.style.left = x + 'px'
			ripples.style.top = y + 'px'
			ripples.classList.add('ripple')

			// CSS для ripple нужно добавить динамически или в CSS файл
			// Для чистоты я оставил основной CSS в файле styles/main.css,
			// но этот JS добавит элемент, который пока не стилизован.
			// Добавим простую стилизацию инлайном для демонстрации:
			ripples.style.position = 'absolute'
			ripples.style.background = 'rgba(255,255,255,0.3)'
			ripples.style.transform = 'translate(-50%, -50%)'
			ripples.style.pointerEvents = 'none'
			ripples.style.borderRadius = '50%'
			ripples.style.animation = 'ripple-effect 0.6s linear'
			ripples.style.width = '0px'
			ripples.style.height = '0px'

			// Keyframe animation injection for ripple
			if (!document.getElementById('ripple-style')) {
				const style = document.createElement('style')
				style.id = 'ripple-style'
				style.innerHTML = `
                    @keyframes ripple-effect {
                        0% { width: 0px; height: 0px; opacity: 0.5; }
                        100% { width: 300px; height: 300px; opacity: 0; }
                    }
                `
				document.head.appendChild(style)
			}

			this.appendChild(ripples)

			setTimeout(() => {
				ripples.remove()
			}, 600)
		})
	})
})
