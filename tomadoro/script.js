const TOTAL = 30 * 60

const STAGES = [
  { at: 0,    image: 'assets/Tomato-one.png',   label: 'keep going!!' },
  { at: 360,  image: 'assets/Tomato-two.png',   label: 'keep going!!' },
  { at: 720,  image: 'assets/Tomato-three.png', label: 'keep going!!' },
  { at: 1080,  image: 'assets/Tomato-four.png',  label: 'keep going!!' },
  { at: 1440, image: 'assets/Tomato-five.png',  label: 'keep going!!' },
  { at: 1800, image: 'assets/Tomato-six.png',   label: 'almost there!!' },
]

let remaining = TOTAL
let paused = false
let interval = null
let currentStageIndex = 0

// --- EKRAN ---

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  document.getElementById(id).classList.add('active')
}

function goHome() {
  clearInterval(interval)
  remaining = TOTAL
  paused = false
  currentStageIndex = 0
  updateDisplay()
  showScreen('screen-home')
}

// --- BAŞLAT ---

function startTimer() {
  remaining = TOTAL
  paused = false
  currentStageIndex = 0
  showScreen('screen-timer')
  updateDisplay()
  updateStage(0, true)
  interval = setInterval(tick, 1000)
}

// --- TICK ---

function tick() {
  if (remaining <= 0) {
    clearInterval(interval)
    showScreen('screen-end')
    startTomatoAnimation()
    return
  }

  remaining--
  const elapsed = TOTAL - remaining
  updateDisplay()
  checkStage(elapsed)
}

// --- DURAKLAT / DEVAM ---

function togglePause() {
  const pauseBtn = document.getElementById('pauseBtn')
  const continueBtn = document.getElementById('continueBtn')
  if (paused) {
    interval = setInterval(tick, 1000)
    paused = false
    pauseBtn.style.display = 'flex'
    continueBtn.style.display = 'none'
  } else {
    clearInterval(interval)
    paused = true
    pauseBtn.style.display = 'none'
    continueBtn.style.display = 'flex'
  }
}

// --- ÇIKIŞ ---

function quitTimer() {
  clearInterval(interval)
  goHome()
}


// --- EKRAN GÜNCELLE ---

function updateDisplay() {
  const m = String(Math.floor(remaining / 60)).padStart(2, '0')
  const s = String(remaining % 60).padStart(2, '0')
  document.getElementById('timer').textContent = `${m} : ${s}`
}

// --- AŞAMA KONTROL ---

function checkStage(elapsed) {
  let newIndex = 0
  for (let i = 0; i < STAGES.length; i++) {
    if (elapsed >= STAGES[i].at) newIndex = i
  }
  if (newIndex !== currentStageIndex) {
    currentStageIndex = newIndex
    updateStage(newIndex, false)
  }
}

function updateStage(index, instant) {
  const stage = STAGES[index]
  const img = document.getElementById('plant-img')
  const label = document.getElementById('stage-label')

  if (instant) {
    img.src = stage.image
    label.textContent = stage.label
    return
  }

  img.classList.add('fade')
  setTimeout(() => {
    img.src = stage.image
    label.textContent = stage.label
    img.classList.remove('fade')
  }, 400)
}

function startTomatoAnimation() {
  const img = document.querySelector('#screen-end img')
  const images = ['assets/Tomato-six.png', 'assets/tomato-six-one.png']
  let i = 0
  let count = 0
  const anim = setInterval(() => {
    if (count >= 5) { clearInterval(anim); return }
    i = (i + 1) % 2
    img.src = images[i]
    count++
  }, 1000)
}