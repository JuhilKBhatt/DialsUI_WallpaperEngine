// ./main.js

function updateTime() {
  const now = new Date();
  document.getElementById('time').textContent = now.toLocaleTimeString();
  document.getElementById('date').textContent = now.toDateString();
}
setInterval(updateTime, 1000);
updateTime();

// ========== Initialize Knobs ==========
function createKnob(label, min, max, color) {
  const knob = pureknob.createKnob(150, 150);
  knob.setProperty('angleStart', -0.75 * Math.PI);
  knob.setProperty('angleEnd', 0.75 * Math.PI);
  knob.setProperty('colorFG', color);
  knob.setProperty('colorBG', '#333');
  knob.setProperty('trackWidth', 0.5);
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

// ========== Wallpaper Engine Bindings ==========
window.wallpaperPropertyListener = {
  setCpuUsage: function (cpu) {
    const value = Math.round(cpu * 100);
    cpuKnob.setValue(value);
  },
  setMemoryUsage: function (mem) {
    const value = Math.round(mem * 100);
    ramKnob.setValue(value);
  },
  setFanSpeed: function (speed) {
    fanKnob.setValue(speed);
  }
};