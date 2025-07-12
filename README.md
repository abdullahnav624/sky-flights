Here's the restructured and enhanced README with all the components integrated:

```markdown
# ✈️ SkyFlights - Flight Booking App

A mobile application for searching and booking flights with intuitive UI and seamless navigation.

## 📱 Features

### Flight Search
- **Trip Options**: Round-trip/One-way/Multi-city selection
- **Smart Airport Selection**: Modal picker with search suggestions
- **Date Handling**: Validation with minimum date constraints
- **Travel Configuration**: Passenger count and class selection

### User Flow
- **Authentication**: Secure signup/login with form validation
- **Search Process**:
  ```mermaid
  graph TD
    A[Home Screen] --> B[Select Airports]
    B --> C[View Flight Results]
  ```
- **Booking Management**: Future booking viewing/cancellation

### Technical Highlights
- **State Management**: Redux for shared location data
- **Form Handling**: Formik + Yup validation
- **Navigation**: Expo Router with type-safe params
- **Error Handling**: Automatic retries for API failures

## 🛠 Tech Stack

| Category           | Technologies                          |
|--------------------|---------------------------------------|
| Framework          | React Native (Expo)                   |
| State Management   | Redux Toolkit                         |
| Navigation         | Expo Router                           |
| Form Handling      | Formik + Yup                          |
| UI Components      | Custom-built components               |
| API Client         | Fetch                                 |


## ✈️ Flight Results Screen Details

**Key Features**:
- Displays flight cards with:
  - Airline logos
  - Flight times (departure/arrival)
  - Duration and stops
  - Pricing information
- Automatic retry mechanism (2 attempts)
- Loading/empty/error state handling

**Data Flow**:
<img width="591" height="540" alt="image" src="https://github.com/user-attachments/assets/4102b663-e568-47d7-a27d-ec8425eb316f" />


## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo CLI (`npm install -g expo-cli`)
- Yarn or npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/abdullahnav624/sky-flights
   cd sky--flights
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   #1d87572b80msh3584e2b927ed3fbp107f41jsn83f614b1a609
   # This is my API key. If not works then probably I have reached free requests limit.
   ```

4. Start development:
   ```bash
   npx expo start
   ```

## 🔧 Configuration

### Environment Variables
`.env` file requirements:
```ini
API_BASE_URL=https://your-flight-api.com
MAPS_API_KEY=your_google_maps_key
MAX_RETRIES=2 # Flight search retry attempts
```

### Redux Setup
The store includes:
- Location state persistence
- Middleware for API calls
- Slice for airport data

## � Testing

Run test suite:
```bash
yarn test
```

Test coverage includes:
- Form validation
- Redux actions
- Utility functions

## 📄 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Code Standards**:
- TypeScript strict mode
- ESLint + Prettier enforced
- Meaningful component documentation

## ✉️ Support

For issues or questions: abdullahnaveed044@gmail.com
```

