export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

// Rough split between phones / low-power devices and everything else,
// used to scale the 3D scene down where it would cost battery or frames.
export function isLowPower() {
  const smallScreen = window.matchMedia('(max-width: 720px)').matches
  const fewCores = (navigator.hardwareConcurrency || 4) <= 4
  const saveData = navigator.connection && navigator.connection.saveData
  return smallScreen || fewCores || Boolean(saveData)
}
