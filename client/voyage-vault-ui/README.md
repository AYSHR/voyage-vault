# Voyage Vault

[![Angular Version](https://img.shields.io/badge/Angular-19-red.svg)](https://angular.io/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-API-green.svg)](https://developers.google.com/maps)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash%20Lite-blue.svg)](https://ai.google.dev/)

A smart travel itinerary planning application that helps you create the perfect trip itinerary in seconds.

## 🌟 Overview

Voyage Vault is an intelligent travel planning application that generates personalized itineraries for your trips. Simply provide your destination and the number of days you plan to travel, and the app will create a detailed itinerary that you can further customize to match your preferences. Once satisfied with your itinerary, seamlessly navigate to Google Maps for directions to all the landmarks in your trip.

## ✨ Features

- **AI-Powered Itinerary Generation**: Leverages Google Gemini 2.5 Flash Lite for intelligent travel recommendations
- **Customizable Itineraries**: Edit and personalize generated itineraries to suit your preferences
- **Google Maps Integration**: Direct navigation to landmarks and destinations
- **Responsive Design**: Modern UI with dark and light mode support
- **Fast & Efficient**: Quick itinerary generation with real-time updates

## 📋 Prerequisites

Before getting started, ensure the following tools are installed:

- **Node.js**: Version 22.x.x or higher
- **npm**: Version 10.x.x or higher
- **Angular CLI**: Compatible with Angular version 19.x.x

To verify your installations, run:

```bash
node --version
npm --version
ng --version
```

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd voyage-vault/client/voyage-vault-ui
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file or configure your environment with the following API keys:
- Google Gemini API Key
- Google Maps API Key

### Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🏗️ Building

To build the project for production, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

To build for development with source maps:

```bash
ng build --configuration development
```

## 🧪 Testing

### Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use:

```bash
ng test
```

### Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For issues, questions, or contributions, please open an issue in the repository.

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Google Gemini API](https://ai.google.dev/)
- [Google Maps Platform](https://developers.google.com/maps)
