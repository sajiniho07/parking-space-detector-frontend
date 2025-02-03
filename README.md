# Parking Space Detector

The Parking Space Detector is a web-based application designed to assist users in detecting available parking slots through a series of image processing and model training steps. Users can upload images, identify parking slots, set their status as empty or full, train a detection model, and analyze video files to view detection results.

## Features

- **Image Upload**: Upload images from target video frames to initiate the parking slot detection process.
- **Parking Slot Selection**: Interactively select parking slots on the uploaded image.
- **Status Assignment**: Mark each selected slot as empty or full.
- **Model Training**: Train a detection model based on the labeled data.
- **Video Analysis**: Upload video files to detect and display available parking slots using the trained model.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)

## Installation

1. **Clone the Frontend Repository**:

   ```bash
   git clone https://github.com/sajiniho07/parking-space-detector-frontend.git
   cd parking-space-detector-frontend
   ```

2. **Install Frontend Dependencies**:

   ```bash
   npm install
   ```

3. **Clone the Backend Repository**:

   In a separate directory, clone the backend repository:

   ```bash
   git clone https://github.com/sajiniho07/ParkingSpaceDetector.git
   cd ParkingSpaceDetector
   ```

4. **Build and Run the Backend Server**:

   Assuming the backend is a Java application, build and run it using Maven:

   ```bash
   ./mvnw spring-boot:run
   ```

   Ensure the backend server is running before starting the frontend application.

## Development Server

With the backend server running, start the frontend development server:

```bash
npm run dev
```

Access the application at `http://localhost:3000`.

## Production Build

To build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage Workflow

1. **Upload an Image**:
   - Ensure the image matches the target video frames in width, height, and resolution.
   - Upload the image to begin the parking slot selection process.

2. **Select Parking Slots**:
   - Click the "Add Panel" button to start selecting parking slots on the image.
   - Right-click on each slot to mark it as empty or full.
   - If needed, click the "Reload Image" button to refresh the image.

3. **Train the Model**:
   - After selecting and labeling the parking slots, click the "Train" button to initiate the model training process.

4. **Upload a Video**:
   - Once the model is trained, upload a video file for analysis.
   - The application will process the video to detect available parking slots.

5. **View Results**:
   - Proceed to the final step to view the detection results on the uploaded video.

## Project Structure

- `pages/`: Contains the application's pages.
- `components/`: Contains reusable components.
- `assets/`: Contains static assets like CSS and images.
- `server/`: Contains server-side code.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. Make your changes and commit them.
4. Push to your branch:

   ```bash
   git push origin feature/YourFeatureName
   ```

5. Open a Pull Request.
