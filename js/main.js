// TodaTrack System - Main JavaScript File

// ============================================
// DATA MODELS AND CLASSES
// ============================================

/**
 * Tricycle class - Represents a tricycle in the system
 * Demonstrates Object-Oriented Programming with encapsulation
 */
class Tricycle {
    constructor(plateNumber, driverName, capacity) {
        this.plateNumber = plateNumber;
        this.driverName = driverName;
        this.capacity = capacity;
        this.status = 'available'; // available, on-trip, off-duty
        this.currentTrip = null;
    }

    // Getter methods (encapsulation)
    getStatus() {
        return this.status;
    }

    getPlateNumber() {
        return this.plateNumber;
    }

    // Method to start a trip
    startTrip(trip) {
        if (this.status === 'available') {
            this.status = 'on-trip';
            this.currentTrip = trip;
            return true;
        }
        return false;
    }

    // Method to complete a trip
    completeTrip() {
        this.status = 'available';
        const completedTrip = this.currentTrip;
        this.currentTrip = null;
        return completedTrip;
    }

    // Method to go off duty
    goOffDuty() {
        if (this.status === 'available') {
            this.status = 'off-duty';
            return true;
        }
        return false;
    }
}

/**
 * Trip class - Represents a trip in the system
 */
class Trip {
    constructor(id, destination, passengerCount, fare, route) {
        this.id = id;
        this.destination = destination;
        this.passengerCount = passengerCount;
        this.fare = fare;
        this.route = route;
        this.status = 'waiting'; // waiting, active, completed
        this.createdAt = new Date();
        this.assignedTricycle = null;
    }

    // Assign a tricycle to the trip
    assignTricycle(tricycle) {
        this.assignedTricycle = tricycle;
        this.status = 'active';
    }

    // Complete the trip
    complete() {
        this.status = 'completed';
        this.completedAt = new Date();
    }
}

// ============================================
// GLOBAL DATA STORAGE (In-Memory Database)
// ============================================

let tricycles = [];
let trips = [];
let tripIdCounter = 1;

// ============================================
// EXAMPLE FUNCTIONS FOR KEY FUNCTIONALITY
// ============================================

/**
 * Register a new tricycle driver
 * @param {string} plateNumber - The plate number of the tricycle
 * @param {string} driverName - The name of the driver
 * @param {number} capacity - The passenger capacity
 * @returns {Object} Result object with success status and message
 */
function registerDriver(plateNumber, driverName, capacity) {
    // Validation
    if (!plateNumber || !driverName || !capacity) {
        return {
            success: false,
            message: 'All fields are required'
        };
    }

    // Check if plate number already exists
    const exists = tricycles.find(t => t.plateNumber === plateNumber);
    if (exists) {
        return {
            success: false,
            message: 'Tricycle with this plate number already exists'
        };
    }

    // Create new tricycle object
    const newTricycle = new Tricycle(plateNumber, driverName, capacity);
    tricycles.push(newTricycle);

    console.log(`Driver registered: ${driverName} with tricycle ${plateNumber}`);
    
    return {
        success: true,
        message: 'Driver registered successfully',
        tricycle: newTricycle
    };
}

/**
 * Create a new trip request
 * @param {string} destination - The destination of the trip
 * @param {number} passengerCount - Number of passengers
 * @param {number} fare - The fare amount
 * @param {string} route - The route description
 * @returns {Object} Result object with success status and trip details
 */
function createTrip(destination, passengerCount, fare, route) {
    // Validation
    if (!destination || !passengerCount || !fare || !route) {
        return {
            success: false,
            message: 'All fields are required'
        };
    }

    if (passengerCount < 1) {
        return {
            success: false,
            message: 'Passenger count must be at least 1'
        };
    }

    // Create new trip object
    const newTrip = new Trip(tripIdCounter++, destination, passengerCount, fare, route);
    trips.push(newTrip);

    console.log(`Trip created: ID ${newTrip.id} to ${destination}`);
    
    // Try to auto-assign an available tricycle
    const availableTricycle = findAvailableTricycle(passengerCount);
    if (availableTricycle) {
        assignTripToTricycle(newTrip.id, availableTricycle.plateNumber);
    }

    return {
        success: true,
        message: 'Trip created successfully',
        trip: newTrip
    };
}

/**
 * Find an available tricycle with sufficient capacity
 * @param {number} requiredCapacity - The required passenger capacity
 * @returns {Tricycle|null} Available tricycle or null
 */
function findAvailableTricycle(requiredCapacity) {
    return tricycles.find(t => 
        t.status === 'available' && 
        t.capacity >= requiredCapacity
    );
}

/**
 * Assign a trip to a specific tricycle
 * @param {number} tripId - The trip ID
 * @param {string} plateNumber - The tricycle plate number
 * @returns {Object} Result object
 */
function assignTripToTricycle(tripId, plateNumber) {
    const trip = trips.find(t => t.id === tripId);
    const tricycle = tricycles.find(t => t.plateNumber === plateNumber);

    if (!trip || !tricycle) {
        return {
            success: false,
            message: 'Trip or tricycle not found'
        };
    }

    if (trip.status !== 'waiting') {
        return {
            success: false,
            message: 'Trip is not in waiting status'
        };
    }

    if (!tricycle.startTrip(trip)) {
        return {
            success: false,
            message: 'Tricycle is not available'
        };
    }

    trip.assignTricycle(tricycle);
    
    console.log(`Trip ${tripId} assigned to tricycle ${plateNumber}`);
    
    return {
        success: true,
        message: 'Trip assigned successfully'
    };
}

/**
 * Complete a trip
 * @param {number} tripId - The trip ID
 * @returns {Object} Result object
 */
function completeTrip(tripId) {
    const trip = trips.find(t => t.id === tripId);
    
    if (!trip) {
        return {
            success: false,
            message: 'Trip not found'
        };
    }

    if (trip.status !== 'active') {
        return {
            success: false,
            message: 'Trip is not active'
        };
    }

    const tricycle = trip.assignedTricycle;
    if (tricycle) {
        tricycle.completeTrip();
    }

    trip.complete();
    
    console.log(`Trip ${tripId} completed`);
    
    return {
        success: true,
        message: 'Trip completed successfully',
        trip: trip
    };
}

/**
 * Get all waiting trips (for student side)
 * @returns {Array} Array of waiting trips
 */
function getWaitingTrips() {
    return trips.filter(t => t.status === 'waiting');
}

/**
 * Get all active trips (for monitoring)
 * @returns {Array} Array of active trips
 */
function getActiveTrips() {
    return trips.filter(t => t.status === 'active');
}

/**
 * Get all available tricycles
 * @returns {Array} Array of available tricycles
 */
function getAvailableTricycles() {
    return tricycles.filter(t => t.status === 'available');
}

// ============================================
// REAL-TIME UPDATE SIMULATION
// ============================================

/**
 * Simulate real-time updates for the system
 * In a real application, this would use WebSockets or Server-Sent Events
 */
function simulateRealTimeUpdates() {
    // Update waiting trips display
    if (typeof updateWaitingTripsDisplay === 'function') {
        updateWaitingTripsDisplay();
    }
    
    // Update driver dashboard
    if (typeof updateDriverDashboard === 'function') {
        updateDriverDashboard();
    }
}

// Set up real-time update interval (every 3 seconds)
let updateInterval;
function startRealTimeUpdates() {
    updateInterval = setInterval(simulateRealTimeUpdates, 3000);
    console.log('Real-time updates started');
}

function stopRealTimeUpdates() {
    if (updateInterval) {
        clearInterval(updateInterval);
        console.log('Real-time updates stopped');
    }
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

/**
 * Display a message/notification to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of message (success, error, info)
 */
function showMessage(message, type = 'info') {
    const alertClass = type === 'success' ? 'alert-success' : 
                      type === 'error' ? 'alert-warning' : 'alert-info';
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

/**
 * Format currency for display
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return `₱${amount.toFixed(2)}`;
}

/**
 * Format date/time for display
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDateTime(date) {
    return new Date(date).toLocaleString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application with sample data
 */
function initializeSampleData() {
    // Register sample tricycles
    registerDriver('ABC-123', 'Juan Dela Cruz', 4);
    registerDriver('XYZ-789', 'Maria Santos', 4);
    registerDriver('DEF-456', 'Pedro Reyes', 6);
    
    // Create sample trips
    createTrip('Main Campus', 3, 50, 'Gate 1 to Main Building');
    createTrip('Library', 2, 30, 'Dormitory to Library');
    
    console.log('Sample data initialized');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('TodaTrack System Initialized');
    });
} else {
    console.log('TodaTrack System Initialized');
}

// ============================================
// EXPORT FOR USE IN OTHER FILES
// ============================================

// Make functions available globally
window.TodaTrack = {
    // Classes
    Tricycle,
    Trip,
    
    // Core functions
    registerDriver,
    createTrip,
    assignTripToTricycle,
    completeTrip,
    
    // Query functions
    getWaitingTrips,
    getActiveTrips,
    getAvailableTricycles,
    
    // Real-time updates
    startRealTimeUpdates,
    stopRealTimeUpdates,
    
    // UI helpers
    showMessage,
    formatCurrency,
    formatDateTime,
    
    // Initialization
    initializeSampleData
};
