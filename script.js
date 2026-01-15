// TodaTrack - Real-Time Monitoring System
// Initialize system on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    updateDisplay();
    checkPeakHour();
    
    // Auto-refresh every 5 seconds
    setInterval(updateDisplay, 5000);
    setInterval(checkPeakHour, 60000); // Check every minute
});

// Initialize default data if not exists
function initializeSystem() {
    if (!localStorage.getItem('tricycles')) {
        const defaultTricycles = [
            { id: 'TODA-001', driverName: 'Juan Dela Cruz', status: 'available' },
            { id: 'TODA-002', driverName: 'Maria Santos', status: 'available' },
            { id: 'TODA-003', driverName: 'Pedro Reyes', status: 'busy' },
            { id: 'TODA-004', driverName: 'Ana Garcia', status: 'available' },
            { id: 'TODA-005', driverName: 'Jose Mendoza', status: 'offline' },
            { id: 'TODA-006', driverName: 'Rosa Flores', status: 'available' },
            { id: 'TODA-007', driverName: 'Carlos Ramos', status: 'busy' },
            { id: 'TODA-008', driverName: 'Linda Cruz', status: 'available' }
        ];
        localStorage.setItem('tricycles', JSON.stringify(defaultTricycles));
    }
    
    if (!localStorage.getItem('weather')) {
        localStorage.setItem('weather', 'Fair Weather');
    }
}

// Get all tricycles from storage
function getTricycles() {
    return JSON.parse(localStorage.getItem('tricycles')) || [];
}

// Save tricycles to storage
function saveTricycles(tricycles) {
    localStorage.setItem('tricycles', JSON.stringify(tricycles));
}

// Update all displays
function updateDisplay() {
    updateStatusCounts();
    updateTricycleList();
    updateLastUpdatedTime();
}

// Update status count cards
function updateStatusCounts() {
    const tricycles = getTricycles();
    const available = tricycles.filter(t => t.status === 'available').length;
    const busy = tricycles.filter(t => t.status === 'busy').length;
    const offline = tricycles.filter(t => t.status === 'offline').length;
    
    document.getElementById('available-count').textContent = available;
    document.getElementById('busy-count').textContent = busy;
    document.getElementById('offline-count').textContent = offline;
}

// Update tricycle list for student view
function updateTricycleList() {
    const tricycles = getTricycles();
    const listContainer = document.getElementById('tricycle-list');
    listContainer.innerHTML = '';
    
    if (tricycles.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: #666;">No tricycles registered yet.</p>';
        return;
    }
    
    tricycles.forEach(tricycle => {
        const card = document.createElement('div');
        card.className = `tricycle-card ${tricycle.status}`;
        card.innerHTML = `
            <h3>${tricycle.id}</h3>
            <p class="tricycle-info">Driver: ${tricycle.driverName}</p>
            <span class="status-badge ${tricycle.status}">${getStatusLabel(tricycle.status)}</span>
        `;
        listContainer.appendChild(card);
    });
}

// Get status label
function getStatusLabel(status) {
    const labels = {
        'available': 'Available',
        'busy': 'On Trip',
        'offline': 'Offline'
    };
    return labels[status] || status;
}

// Update last updated time
function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('last-updated-time').textContent = timeString;
}

// Check if current time is peak hour
function checkPeakHour() {
    const now = new Date();
    const hour = now.getHours();
    const alertSection = document.getElementById('peak-hour-alert');
    
    // Peak hours: 6:00 PM (18:00) to 9:00 PM (21:00)
    if (hour >= 18 && hour < 21) {
        alertSection.style.display = 'block';
    } else {
        alertSection.style.display = 'none';
    }
}

// View Toggle Functionality
document.getElementById('student-view-btn').addEventListener('click', function() {
    document.getElementById('student-view').style.display = 'block';
    document.getElementById('driver-view').style.display = 'none';
    this.classList.add('active');
    document.getElementById('driver-view-btn').classList.remove('active');
});

document.getElementById('driver-view-btn').addEventListener('click', function() {
    document.getElementById('student-view').style.display = 'none';
    document.getElementById('driver-view').style.display = 'block';
    this.classList.add('active');
    document.getElementById('student-view-btn').classList.remove('active');
});

// Weather Toggle
document.getElementById('weather-toggle').addEventListener('click', function() {
    const weatherStatus = document.getElementById('weather-status');
    const currentWeather = localStorage.getItem('weather');
    
    const weatherOptions = ['Fair Weather', 'Rainy', 'Cloudy', 'Sunny'];
    const currentIndex = weatherOptions.indexOf(currentWeather);
    const nextIndex = (currentIndex + 1) % weatherOptions.length;
    
    const newWeather = weatherOptions[nextIndex];
    localStorage.setItem('weather', newWeather);
    weatherStatus.textContent = newWeather;
});

// Load weather on start
document.getElementById('weather-status').textContent = localStorage.getItem('weather');

// Register New Driver
document.getElementById('register-driver-btn').addEventListener('click', function() {
    const driverId = document.getElementById('driver-id').value.trim();
    const driverName = document.getElementById('driver-name').value.trim();
    const tricycleNumber = document.getElementById('tricycle-number').value.trim();
    const status = document.getElementById('status-select').value;
    const messageDiv = document.getElementById('driver-message');
    
    if (!driverId || !driverName || !tricycleNumber) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    const tricycles = getTricycles();
    
    // Check if tricycle already exists
    const existingIndex = tricycles.findIndex(t => t.id === tricycleNumber);
    if (existingIndex !== -1) {
        showMessage('Tricycle number already exists!', 'error');
        return;
    }
    
    // Add new tricycle
    tricycles.push({
        id: tricycleNumber,
        driverName: driverName,
        status: status
    });
    
    saveTricycles(tricycles);
    updateDisplay();
    
    showMessage('Driver registered successfully!', 'success');
    
    // Clear form
    document.getElementById('driver-id').value = '';
    document.getElementById('driver-name').value = '';
    document.getElementById('tricycle-number').value = '';
});

// Update Driver Status
document.getElementById('update-status-btn').addEventListener('click', function() {
    const tricycleNumber = document.getElementById('tricycle-number').value.trim();
    const status = document.getElementById('status-select').value;
    const messageDiv = document.getElementById('driver-message');
    
    if (!tricycleNumber) {
        showMessage('Please enter tricycle number', 'error');
        return;
    }
    
    const tricycles = getTricycles();
    const tricycleIndex = tricycles.findIndex(t => t.id === tricycleNumber);
    
    if (tricycleIndex === -1) {
        showMessage('Tricycle not found! Please register first.', 'error');
        return;
    }
    
    // Update status
    tricycles[tricycleIndex].status = status;
    saveTricycles(tricycles);
    updateDisplay();
    
    showMessage(`Status updated to: ${getStatusLabel(status)}`, 'success');
});

// Show message helper
function showMessage(message, type) {
    const messageDiv = document.getElementById('driver-message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
