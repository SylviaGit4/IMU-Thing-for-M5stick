// M5StickC Plus IMU Display Script for Bruce Firmware
// Ensure your Bruce Firmware supports M5.IMU access.

// Initialize the display
M5.Lcd.setRotation(3); // Rotate display for proper orientation
M5.Lcd.fillScreen(0);  // Clear screen
M5.Lcd.setTextColor(0xFFFF); // White text
M5.Lcd.setTextSize(2); // Text size

// Function to display IMU data
function displayIMUData() {
  // Retrieve accelerometer data (x, y, z)
  const accel = M5.IMU.getAccel(); // {x: number, y: number, z: number}
  
  // Retrieve gyroscope data (x, y, z)
  const gyro = M5.IMU.getGyro(); // {x: number, y: number, z: number}

  // Retrieve magnetometer data (x, y, z)
  const mag = M5.IMU.getMag(); // {x: number, y: number, z: number}

  // Clear display
  M5.Lcd.fillScreen(0);

  // Display accelerometer data
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.println("Accel:");
  M5.Lcd.printf("X: %.2f\n", accel.x);
  M5.Lcd.printf("Y: %.2f\n", accel.y);
  M5.Lcd.printf("Z: %.2f\n", accel.z);

  // Display gyroscope data
  M5.Lcd.println("\nGyro:");
  M5.Lcd.printf("X: %.2f\n", gyro.x);
  M5.Lcd.printf("Y: %.2f\n", gyro.y);
  M5.Lcd.printf("Z: %.2f\n", gyro.z);

  // Display magnetometer data
  M5.Lcd.println("\nMag:");
  M5.Lcd.printf("X: %.2f\n", mag.x);
  M5.Lcd.printf("Y: %.2f\n", mag.y);
  M5.Lcd.printf("Z: %.2f\n", mag.z);
}

// Update display every 100ms
setInterval(displayIMUData, 100);