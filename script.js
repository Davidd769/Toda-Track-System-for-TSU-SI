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
            { 
                plateNumber: 'TODA-001', 
                driverName: 'Juan Dela Cruz', 
                contactNumber: '09171234567',
                status: 'waiting',
                defaultRoute: 'TSU-SI to Market',
                fare: 15.00
            },
            { 
                plateNumber: 'TODA-002', 
                driverName: 'Maria Santos', 
                contactNumber: '09181234568',
                status: 'waiting',
                defaultRoute: 'TSU-SI to Downtown',
                fare: 15.00
            },
            { 
                plateNumber: 'TODA-003', 
                driverName: 'Pedro Reyes', 
                contactNumber: '09191234569',
                status: 'on_trip',
                defaultRoute: 'TSU-SI to Plaza',
                fare: 20.00
            },
            { 
                plateNumber: 'TODA-004', 
                driverName: 'Ana Garcia', 
                contactNumber: '09201234570',
                status: 'waiting',
                defaultRoute: 'TSU-SI to Hospital',
                fare: 25.00
            },
            { 
                plateNumber: 'TODA-005', 
                driverName: 'Jose Mendoza', 
                contactNumber: '09211234571',
                status: 'unavailable',
                defaultRoute: 'TSU-SI to Terminal',
                fare: 15.00
            },
            { 
                plateNumber: 'TODA-006', 
                driverName: 'Rosa Flores', 
                contactNumber: '09221234572',
                status: 'waiting',
                defaultRoute: 'TSU-SI to Mall',
                fare: 30.00
            },
            { 
                plateNumber: 'TODA-007', 
                driverName: 'Carlos Ramos', 
                contactNumber: '09231234573',
                status: 'on_trip',
                defaultRoute: 'TSU-SI to Station',
                fare: 20.00
            },
            { 
                plateNumber: 'TODA-008', 
                driverName: 'Linda Cruz', 
                contactNumber: '09241234574',
                status: 'waiting',
                defaultRoute: 'TSU-SI to Airport',
                fare: 50.00
            }
        ];
        localStorage.setItem('tricycles', JSON.stringify(defaultTricycles));
    }
    
    if (!localStorage.getItem('weather')) {
        localStorage.setItem('weather', 'Fair Weather');
    }
    
    if (!localStorage.getItem('trips')) {
        localStorage.setItem('trips', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('broadcastMessage')) {
        localStorage.setItem('broadcastMessage', 'Welcome to TodaTrack! Stay updated on tricycle availability.');
    }
    
    if (!localStorage.getItem('tripCounter')) {
        localStorage.setItem('tripCounter', '1');
    }
}

// Get all tricycles from storage
function getTricycles() {
    try {
        return JSON.parse(localStorage.getItem('tricycles')) || [];
    } catch (error) {
        console.error('Error parsing tricycle data:', error);
        // Return empty array and reset storage if data is corrupted
        localStorage.removeItem('tricycles');
        return [];
    }
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
    updateBroadcastMessage();
}

// Update broadcast message
function updateBroadcastMessage() {
    const message = localStorage.getItem('broadcastMessage') || 'Welcome to TodaTrack!';
    document.getElementById('broadcast-message').textContent = message;
}

// Update status count cards
function updateStatusCounts() {
    const tricycles = getTricycles();
    const waiting = tricycles.filter(t => t.status === 'waiting').length;
    const onTrip = tricycles.filter(t => t.status === 'on_trip').length;
    const unavailable = tricycles.filter(t => t.status === 'unavailable').length;
    
    document.getElementById('available-count').textContent = waiting;
    document.getElementById('busy-count').textContent = onTrip;
    document.getElementById('offline-count').textContent = unavailable;
}

// Update tricycle list for student view
function updateTricycleList() {
    const tricycles = getTricycles();
    const listContainer = document.getElementById('tricycle-list');
    listContainer.innerHTML = '';
    
    if (tricycles.length === 0) {
        listContainer.innerHTML = '<p class="empty-message">No tricycles registered yet.</p>';
        return;
    }
    
    // Show only waiting (available) tricycles in student view
    const waitingTricycles = tricycles.filter(t => t.status === 'waiting');
    
    if (waitingTricycles.length === 0) {
        listContainer.innerHTML = '<p class="empty-message">No tricycles currently available. Please check back later.</p>';
        return;
    }
    
    waitingTricycles.forEach(tricycle => {
        const card = document.createElement('div');
        card.className = `tricycle-card ${tricycle.status}`;
        card.innerHTML = `
            <h3>${tricycle.plateNumber}</h3>
            <p class="tricycle-info">Driver: ${tricycle.driverName}</p>
            <p class="tricycle-info">📞 ${tricycle.contactNumber}</p>
            <p class="tricycle-info">📍 ${tricycle.defaultRoute}</p>
            <p class="tricycle-info">💵 ₱${tricycle.fare.toFixed(2)}</p>
            <span class="status-badge ${tricycle.status}">${getStatusLabel(tricycle.status)}</span>
        `;
        listContainer.appendChild(card);
    });
}

// Get status label
function getStatusLabel(status) {
    const labels = {
        'waiting': 'Waiting',
        'on_trip': 'On Trip',
        'unavailable': 'Unavailable'
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
    const driverName = document.getElementById('driver-name').value.trim();
    const contactNumber = document.getElementById('contact-number').value.trim();
    const tricycleNumber = document.getElementById('tricycle-number').value.trim();
    const defaultRoute = document.getElementById('default-route').value.trim();
    const fare = parseFloat(document.getElementById('fare').value);
    const status = document.getElementById('status-select').value;
    
    if (!driverName || !contactNumber || !tricycleNumber || !defaultRoute || !fare) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Validate Philippine mobile number format
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(contactNumber)) {
        showMessage('Please enter a valid Philippine mobile number (11 digits starting with 09)', 'error');
        return;
    }
    
    if (isNaN(fare) || fare < 0) {
        showMessage('Please enter a valid fare amount', 'error');
        return;
    }
    
    const tricycles = getTricycles();
    
    // Check if tricycle already exists
    const existingIndex = tricycles.findIndex(t => t.plateNumber === tricycleNumber);
    if (existingIndex !== -1) {
        showMessage('Plate number already exists! Use "Update Status" to change status.', 'error');
        return;
    }
    
    // Add new tricycle
    tricycles.push({
        plateNumber: tricycleNumber,
        driverName: driverName,
        contactNumber: contactNumber,
        defaultRoute: defaultRoute,
        fare: fare,
        status: status
    });
    
    saveTricycles(tricycles);
    updateDisplay();
    
    showMessage('Driver registered successfully!', 'success');
    
    // Clear form
    document.getElementById('driver-name').value = '';
    document.getElementById('contact-number').value = '';
    document.getElementById('tricycle-number').value = '';
    document.getElementById('default-route').value = '';
    document.getElementById('fare').value = '';
});

// Update Driver Status
document.getElementById('update-status-btn').addEventListener('click', function() {
    const tricycleNumber = document.getElementById('tricycle-number').value.trim();
    const status = document.getElementById('status-select').value;
    
    if (!tricycleNumber) {
        showMessage('Please enter plate number', 'error');
        return;
    }
    
    const tricycles = getTricycles();
    const tricycleIndex = tricycles.findIndex(t => t.plateNumber === tricycleNumber);
    
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

// Update Broadcast Message
document.getElementById('update-broadcast-btn').addEventListener('click', function() {
    const message = document.getElementById('broadcast-input').value.trim();
    
    if (!message) {
        showMessage('Please enter a broadcast message', 'error');
        return;
    }
    
    localStorage.setItem('broadcastMessage', message);
    updateBroadcastMessage();
    
    showMessage('Broadcast message updated successfully!', 'success');
    document.getElementById('broadcast-input').value = '';
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
