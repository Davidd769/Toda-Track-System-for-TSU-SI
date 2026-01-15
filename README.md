# 🚲 TodaTrack - Real-Time Tricycle Monitoring System

TodaTrack is a real-time digital monitoring web application designed for the TSU-SI TODA community to bridge the communication gap between students and tricycle drivers. It aims to reduce student uncertainty regarding ride availability, especially during peak hours (6:00 PM – 9:00 PM) or inclement weather.

## 🎯 Features

### Student View
- **Live Availability Dashboard**: Real-time display of tricycles waiting for passengers, on trip, and unavailable
- **Waiting Queue Display**: View only available tricycles with detailed information
- **Tricycle Information Cards**: Comprehensive details for each tricycle:
  - Plate number (e.g., TODA-001)
  - Driver name
  - Contact number for direct communication
  - Default route information
  - Base fare pricing
  - Current status badge
- **Broadcast Announcements**: Receive important messages from TODA management
- **Peak Hour Alerts**: Automatic alerts during high-demand hours (6:00 PM - 9:00 PM)
- **Weather Conditions**: Current weather status display to help plan trips
- **Auto-Refresh**: Dashboard updates every 5 seconds to show the latest information

### Driver View
- **Complete Registration**: Register with full details:
  - Driver name
  - Contact number (mobile)
  - Plate number
  - Default route
  - Base fare
  - Initial status
- **Status Management**: Drivers can update their status:
  - **Waiting for Passengers**: Available in queue
  - **On Trip**: Currently transporting passengers
  - **Unavailable**: Off duty or not available
- **Broadcast Messaging**: Send announcements to all students viewing the system
- **Real-Time Updates**: Status changes immediately reflect on the student dashboard

### Additional Features
- **Responsive Design**: Works seamlessly on mobile phones, tablets, and desktop computers
- **Intuitive Interface**: Easy-to-use interface with color-coded status indicators and emoji icons
- **No Backend Required**: Uses browser localStorage for data persistence (perfect for MVP/demo)
- **Data Persistence**: All information saved locally and survives page reloads

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation or server setup required for basic usage

### Running the Application

#### Option 1: Open Directly
Simply open `index.html` in your web browser:
```bash
# Navigate to the project directory
cd Toda-Track-System-for-TSU-SI

# Open in browser (choose one based on your system)
# For Linux
xdg-open index.html

# For macOS
open index.html

# For Windows
start index.html
```

#### Option 2: Using a Local Web Server
For better performance and testing:

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then open: http://localhost:8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000

# Then open: http://localhost:8000
```

## 📖 How to Use

### For Students
1. Open the application in your browser
2. The default view shows all tricycles waiting for passengers (in the queue)
3. View the status cards at the top showing:
   - Number of tricycles waiting for passengers
   - Number on trip
   - Number unavailable
4. Check the **Announcements** section for important messages from TODA
5. Scroll down to see detailed information about each available tricycle:
   - Plate number
   - Driver name and contact number
   - Default route
   - Base fare
6. Check for peak hour alerts when applicable
7. Monitor weather conditions before planning your trip
8. Contact drivers directly using the displayed phone numbers

### For Drivers
1. Click the "Driver View" button at the top
2. **To Register as a New Driver**: 
   - Fill in all fields:
     - Driver Name
     - Contact Number (e.g., 09171234567)
     - Plate Number (e.g., TODA-001)
     - Default Route (e.g., TSU-SI to Market)
     - Base Fare (in pesos)
   - Select your initial status
   - Click "Register New Driver"
3. **To Update Your Status**: 
   - Enter your Plate Number (e.g., TODA-001)
   - Select your current status:
     - **Waiting for Passengers**: You're available and in queue
     - **On Trip**: You're currently transporting passengers
     - **Unavailable**: You're off duty or not available
   - Click "Update Status"
4. **To Send Broadcast Messages**:
   - Scroll to the "Broadcast Message" section
   - Enter your announcement for students
   - Click "Update Broadcast"
   - The message will appear on all student dashboards
5. Your status updates immediately on the student dashboard

## 🎨 Technology Stack

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with modern layouts (Grid, Flexbox) and animations
- **JavaScript (Vanilla)**: Real-time functionality and data management
- **LocalStorage API**: Client-side data persistence

## 📱 Screenshots

### Enhanced Student View
Shows available tricycles with complete information including contact numbers, routes, and fares.
![Student View](https://github.com/user-attachments/assets/6eeff38d-7ab0-4a3d-a0f2-0b31ad58792e)

### Enhanced Driver Control Panel
Complete registration and status management with broadcast messaging.
![Driver View](https://github.com/user-attachments/assets/5250245d-a61f-4acf-a808-5f5c3bdbaba9)

### Broadcast Message System
Real-time announcements visible to all students.
![Broadcast Messages](https://github.com/user-attachments/assets/afa2d25c-704f-4f36-8fcc-118a9d9e1c32)

## 🔄 System Architecture

```
┌─────────────────────────────────────────────────┐
│         TodaTrack Web Application               │
├─────────────────────────────────────────────────┤
│  Frontend (HTML/CSS/JavaScript)                 │
│  ├── Student Dashboard                          │
│  │   ├── Waiting Queue Display                 │
│  │   ├── Tricycle Cards (with contact info)    │
│  │   └── Broadcast Messages                    │
│  ├── Driver Control Panel                       │
│  │   ├── Registration Form                      │
│  │   ├── Status Updates                         │
│  │   └── Broadcast Management                   │
│  └── Real-time Updates (5s refresh)             │
├─────────────────────────────────────────────────┤
│  Data Layer (LocalStorage)                      │
│  ├── Tricycle Information                       │
│  │   ├── Plate Numbers                          │
│  │   ├── Driver Details & Contact               │
│  │   ├── Routes & Fares                         │
│  │   └── Status (waiting/on_trip/unavailable)   │
│  ├── Broadcast Messages                         │
│  └── Weather Conditions                         │
└─────────────────────────────────────────────────┘
```

## 🛠️ Future Enhancements

- Backend integration with database for persistent storage across devices
- User authentication and authorization for drivers
- GPS tracking for real-time location
- Push notifications for status changes and announcements
- Trip management system (start/end trips with passenger count and destinations)
- Historical data and analytics dashboard
- Booking/reservation system
- Driver ratings and reviews
- Multi-language support (English, Filipino)
- SMS notifications for broadcast messages
- Payment integration for fares

## 👥 Target Users

- **Students**: TSU-SI students needing tricycle transportation
- **Drivers**: TODA tricycle drivers providing transportation services
- **Administrators**: TODA management monitoring the system

## 📄 License

This project is created for the TSU-SI TODA community.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📧 Support

For support or questions, please contact the TSU-SI TODA administration.

---

© 2026 TodaTrack - TSU-SI TODA Community
