/* ============================================
   Shared JS - LMS ↔ HyperConnect Prototype
   ============================================ */

// Toast notifications
function showToast(message, type = 'info', duration = 3000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Sync indicator
function showSyncIndicator(message = 'Syncing to HyperConnect...') {
  let indicator = document.querySelector('.sync-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'sync-indicator';
    indicator.innerHTML = `<div class="spinner"></div><span></span>`;
    document.body.appendChild(indicator);
  }
  indicator.querySelector('span').textContent = message;
  indicator.classList.add('show');
  return indicator;
}

function hideSyncIndicator() {
  const indicator = document.querySelector('.sync-indicator');
  if (indicator) indicator.classList.remove('show');
}

// Navigation crosshair
function showNavCrosshair(text = 'Opening HyperConnect...') {
  let crosshair = document.querySelector('.nav-crosshair');
  if (!crosshair) {
    crosshair = document.createElement('div');
    crosshair.className = 'nav-crosshair';
    crosshair.innerHTML = `<div class="nav-spinner"></div><div class="nav-text"></div>`;
    document.body.appendChild(crosshair);
  }
  crosshair.querySelector('.nav-text').textContent = text;
  crosshair.classList.add('show');
  return crosshair;
}

function hideNavCrosshair() {
  const crosshair = document.querySelector('.nav-crosshair');
  if (crosshair) crosshair.classList.remove('show');
}

// Simulate cross-navigation
function navigateToHC(guestName) {
  showNavCrosshair(`Opening HyperConnect → ${guestName}'s profile...`);
  setTimeout(() => {
    hideNavCrosshair();
    window.location.href = `hc.html?guest=${encodeURIComponent(guestName)}&from=lms`;
  }, 1200);
}

function navigateToLMS(leadName) {
  showNavCrosshair(`Opening AI Lead Manager → ${leadName}...`);
  setTimeout(() => {
    hideNavCrosshair();
    window.location.href = `lms.html?lead=${encodeURIComponent(leadName)}&from=hc`;
  }, 1200);
}

// Call timer
function startCallTimer(timerEl) {
  let seconds = 0;
  const interval = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    timerEl.textContent = `${mins}:${secs}`;
  }, 1000);
  return interval;
}

// Get URL params
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Timestamp formatter
function formatTime(date) {
  return date.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true
  });
}

function relativeTime(ms) {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
