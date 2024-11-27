// M5StickC Plus IMU Display Script for Bruce Firmware
// Ensure your Bruce Firmware supports M5.IMU access.

// Initialize the display
M5.Lcd.setRotation(3); // Rotate display for proper orientation
M5.Lcd.fillScreen(0);  // Clear screen
M5.Lcd.setTextColor(0xFFFF); // White text
M5.Lcd.setTextSize(2); // Text size

// Function to map value to display range
function mapValue(value, inMin, inMax, outMin, outMax) {
  return Math.max(outMin, Math.min(outMax, ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin));
}

// Function to draw a bar graph
function drawBarGraph(x, y, width, height, color, value, maxValue) {
  const barWidth = mapValue(value, -maxValue, maxValue, 0, width);
  M5.Lcd.fillRect(x, y, width, height, 0x0000); // Clear previous bar
  M5.Lcd.fillRect(x, y, barWidth, height, color); // Draw new bar
}

// Function to update IMU data
function displayIMUData() {
  try {
    // Retrieve accelerometer data
    const accel = M5.IMU.getAccel();
    if (!accel) throw new Error("Accelerometer data unavailable");

    // Retrieve gyroscope data
    const gyro = M5.IMU.getGyro();
    if (!gyro) throw new Error("Gyroscope data unavailable");

    // Retrieve magnetometer data
    const mag = M5.IMU.getMag();
    if (!mag) throw new Error("Magnetometer data unavailable");

    // Visualize accelerometer data
    M5.Lcd.setCursor(0, 0);
    M5.Lcd.println("Accel (X, Y, Z):");
    drawBarGraph(30, 30, 200, 20, 0xF800, accel.x, 2); // X-axis
    drawBarGraph(30, 60, 200, 20, 0x07E0, accel.y, 2); // Y-axis
    drawBarGraph(30, 90, 200, 20, 0x001F, accel.z, 2); // Z-axis

    // Visualize gyroscope data
    M5.Lcd.setCursor(0, 130);
    M5.Lcd.println("Gyro (X, Y, Z):");
    drawBarGraph(30, 150, 200, 20, 0xF800, gyro.x, 250); // X-axis
    drawBarGraph(30, 180, 200, 20, 0x07E0, gyro.y, 250); // Y-axis
    drawBarGraph(30, 210, 200, 20, 0x001F, gyro.z, 250); // Z-axis

    // Visualize magnetometer data
    M5.Lcd.setCursor(0, 250);
    M5.Lcd.println("Mag (X, Y, Z):");
    drawBarGraph(30, 270, 200, 20, 0xF800, mag.x, 50); // X-axis
    drawBarGraph(30, 300, 200, 20, 0x07E0, mag.y, 50); // Y-axis
    drawBarGraph(30, 330, 200, 20, 0x001F, mag.z, 50); // Z-axis
  } catch (error) {
    M5.Lcd.fillScreen(0); // Clear screen
    M5.Lcd.setCursor(0, 0);
    M5.Lcd.println("Error:");
    M5.Lcd.println(error.message);
  }
}

// Update display every 100ms
setInterval(displayIMUData, 100);