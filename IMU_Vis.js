// M5StickC Plus IMU Display Script for Bruce Firmware
// Ensure your Bruce Firmware supports M5.IMU access.

// Initialize the display
M5.Lcd.setRotation(3); // Rotate display for proper orientation
M5.Lcd.fillScreen(0);  // Clear screen
M5.Lcd.setTextColor(0xFFFF); // White text
M5.Lcd.setTextSize(2); // Text size

// Function to map value to display range
function mapValue(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Function to display IMU data visually
function displayIMUData() {
  // Retrieve accelerometer data (x, y, z)
  const accel = M5.IMU.getAccel(); // {x: number, y: number, z: number}

  // Retrieve gyroscope data (x, y, z)
  const gyro = M5.IMU.getGyro(); // {x: number, y: number, z: number}

  // Retrieve magnetometer data (x, y, z)
  const mag = M5.IMU.getMag(); // {x: number, y: number, z: number}

  // Clear display
  M5.Lcd.fillScreen(0);

  // Draw axes labels
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.println("Accel (X, Y, Z):");

  // Visualize accelerometer data
  M5.Lcd.fillRect(30, 30, 200, 20, 0xFFFF);
  M5.Lcd.fillRect(30, 60, 200, 20, 0xFFFF);
  M5.Lcd.fillRect(30, 90, 200, 20, 0xFFFF);
  M5.Lcd.fillRect(30, 30, mapValue(accel.x, -2, 2, 0, 200), 20, 0xF800);
  M5.Lcd.fillRect(30, 60, mapValue(accel.y, -2, 2, 0, 200), 20, 0x07E0);
  M5.Lcd.fillRect(30, 90, mapValue(accel.z, -2, 2, 0, 200), 20, 0x001F);

  M5.Lcd.setCursor(0, 130);
  M5.Lcd.println("Gyro (X, Y, Z):");

  // Visualize gyroscope data
  M5.Lcd.fillRect(30, 150, 200, 20, 0xFFFF);
  M5.Lcd.fillRect(30, 180, 200, 20, 0xFFFF);
  M5.Lcd.fillRect(30, 210, 200, 20, 0xFFFF);
  M5.Lcd.fillRect(30, 150, mapValue(gyro.x, -250, 250, 0, 200), 20, 0xF800);
  M5.Lcd.fillRect(30, 180, mapValue(gyro.y, -250, 250, 0, 200), 20, 0x07E0);
  M5.Lcd.fillRect(30, 210, mapValue(gyro.z, -250, 250, 0, 200), 20, 0x001F);

  M5.Lcd.setCursor(0, 250);
  M5.Lcd.println("Mag (X, Y, Z):");

  // Visualize magnetometer data
  M5.Lcd.fillRect(30, 270, 200, 20, 0xFFFF);
  M5.Lcd.fillRect(30, 300, 200, 20, 0xFFFF);
  M5.Lcd.fillRect(30, 330, 200, 20, 0xFFFF);
  M5.Lcd.fillRect(30, 270, mapValue(mag.x, -50, 50, 0, 200), 20, 0xF800);
  M5.Lcd.fillRect(30, 300, mapValue(mag.y, -50, 50, 0, 200), 20, 0x07E0);
  M5.Lcd.fillRect(30, 330, mapValue(mag.z, -50, 50, 0, 200), 20, 0x001F);
}

// Update display every 100ms
setInterval(displayIMUData, 100);