# 🚲 TodaTrack - Real-Time Tricycle Monitoring System

TodaTrack is a real-time digital monitoring web application designed for the TSU-SI TODA community to bridge the communication gap between students and tricycle drivers. It aims to reduce student uncertainty regarding ride availability, especially during peak hours (6:00 PM – 9:00 PM) or inclement weather.

## 🎯 Features

### Student View
- **Live Availability Dashboard**: Real-time display of available, busy, and offline tricycles
- **Tricycle Status Cards**: View detailed information about each tricycle including driver name and current status
- **Peak Hour Alerts**: Automatic alerts during high-demand hours (6:00 PM - 9:00 PM)
- **Weather Conditions**: Current weather status display to help plan trips
- **Auto-Refresh**: Dashboard updates every 5 seconds to show the latest information

### Driver View
- **Status Management**: Drivers can update their status (Available, On Trip, Offline)
- **Driver Registration**: New drivers can register their tricycle in the system
- **Real-Time Updates**: Status changes immediately reflect on the student dashboard

### Additional Features
- **Responsive Design**: Works seamlessly on mobile phones, tablets, and desktop computers
- **Intuitive Interface**: Easy-to-use interface with color-coded status indicators
- **No Backend Required**: Uses browser localStorage for data persistence (perfect for MVP/demo)

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
2. The default view shows all available tricycles
3. View the status cards at the top showing:
   - Number of available tricycles
   - Number on trip
   - Number offline
4. Scroll down to see detailed information about each tricycle
5. Check for peak hour alerts when applicable
6. Monitor weather conditions before planning your trip

### For Drivers
1. Click the "Driver View" button at the top
2. **To Register**: Fill in all fields (Driver ID, Driver Name, Tricycle Number) and click "Register New Driver"
3. **To Update Status**: 
   - Enter your Tricycle Number (e.g., TODA-001)
   - Select your current status (Available, On Trip, or Offline)
   - Click "Update Status"
4. Your status will immediately update on the student dashboard

## 🎨 Technology Stack

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with modern layouts (Grid, Flexbox) and animations
- **JavaScript (Vanilla)**: Real-time functionality and data management
- **LocalStorage API**: Client-side data persistence

## 📱 Screenshots

### Student View
![Student View](https://github.com/user-attachments/assets/ab489c9a-f376-4768-9b46-1f68dc1c6b10)

### Driver View
![Driver View](https://github.com/user-attachments/assets/9193f0da-571a-4d93-823a-d43e1accb3c6)

## 🔄 System Architecture

```
┌─────────────────────────────────────────┐
│         TodaTrack Web Application       │
├─────────────────────────────────────────┤
│  Frontend (HTML/CSS/JavaScript)         │
│  ├── Student Dashboard                  │
│  ├── Driver Control Panel               │
│  └── Real-time Updates                  │
├─────────────────────────────────────────┤
│  Data Layer (LocalStorage)              │
│  ├── Tricycle Information               │
│  ├── Driver Status                      │
│  └── Weather Conditions                 │
└─────────────────────────────────────────┘
```

## 🛠️ Future Enhancements

- Backend integration with database for persistent storage
- User authentication and authorization
- GPS tracking for real-time location
- Push notifications for status changes
- Historical data and analytics
- Booking/reservation system
- Driver ratings and reviews
- Multi-language support

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
