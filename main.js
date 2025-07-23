// ./main.js

function updateTime() {
  const now = new Date();

  // Format time
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert to 12-hour format

  const padded = (n) => n.toString().padStart(2, '0');
  const timeString = `${padded(hours)}:${padded(minutes)}:${padded(seconds)} ${ampm}`;

  // Format date
  const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = weekdayNames[now.getDay()];
  const dateString = `${weekday}, ${padded(now.getDate())}/${padded(now.getMonth() + 1)}/${now.getFullYear()}`;

  document.getElementById('time').textContent = timeString;
  document.getElementById('date').textContent = dateString;
}

setInterval(updateTime, 1000);
updateTime();

// Initialize Knobs
function createKnob(label, min, max, color) {
  const dialSize = Math.min(window.innerWidth, window.innerHeight) * 0.15;
  const knob = pureknob.createKnob(dialSize, dialSize);
  knob.setProperty('angleStart', -0.75 * Math.PI);
  knob.setProperty('angleEnd', 0.75 * Math.PI);
  knob.setProperty('colorFG', color);
  knob.setProperty('colorBG', '#333');
  knob.setProperty('trackWidth', 0.4);
  knob.setProperty('valMin', min);
  knob.setProperty('valMax', max);
  knob.setProperty('val', 0);
  knob.setProperty('label', label);
  knob.setProperty('readonly', true);
  return knob;
}

const cpuKnob = createKnob('CPU', 0, 100, '#00ffcc');
const ramKnob = createKnob('RAM', 0, 100, '#ff0099');
const fanKnob = createKnob('FAN', 0, 5000, '#ffaa00');

// Mount knobs
document.getElementById('cpuDial').appendChild(cpuKnob.node());
document.getElementById('ramDial').appendChild(ramKnob.node());
document.getElementById('fanDial').appendChild(fanKnob.node());

// Simulate system values with semi-random updates
function simulateUsage(knob, min, max, step = 5) {
  let value = Math.random() * (max - min) + min;

  setInterval(() => {
    // Add small variation
    const delta = (Math.random() * step * 2) - step;
    value = Math.min(max, Math.max(min, value + delta));
    knob.setValue(Math.round(value));
  }, 1000);
}

// Start simulation
simulateUsage(cpuKnob, 10, 90);      // CPU %
simulateUsage(ramKnob, 20, 80);      // RAM %
simulateUsage(fanKnob, 800, 3600);   // Fan RPM