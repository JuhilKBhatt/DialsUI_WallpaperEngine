// ./main.js

function updateTime() {
  const now = new Date();
  document.getElementById('time').textContent = now.toLocaleTimeString();
  document.getElementById('date').textContent = now.toDateString();
}
setInterval(updateTime, 1000);
updateTime();

// Wallpaper Engine bindings
window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
    // Optional: if using color or toggle settings
  },
  setCpuUsage: function (cpu) {
    document.getElementById('cpuUsage').textContent = Math.round(cpu * 100) + '%';
  },
  setMemoryUsage: function (mem) {
    document.getElementById('ramUsage').textContent = Math.round(mem * 100) + '%';
  },
  setFanSpeed: function (speed) {
    document.getElementById('fanSpeed').textContent = speed + ' RPM';
  }
};
