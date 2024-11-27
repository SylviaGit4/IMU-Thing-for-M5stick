// Import M5StickC Plus display library
const m5Display = require("m5stack-display");
const m5IMU = require("m5-imu");

// Initialize the display
const display = new m5Display();
display.begin();

// Initialize the IMU
const imu = new m5IMU();
imu.begin();

// Colors and dimensions for the 3D cube
const cubeSize = 50;
const centerX = 80; // Center of the display
const centerY = 60;

// A simple function to draw a cube
function drawCube(pitch, yaw, roll) {
    display.clear();

    // Calculate rotation matrices
    const radPitch = (pitch * Math.PI) / 180;
    const radYaw = (yaw * Math.PI) / 180;
    const radRoll = (roll * Math.PI) / 180;

    const vertices = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
    ];

    const projectedVertices = vertices.map(([x, y, z]) => {
        // Apply rotation
        const rx = x * Math.cos(radYaw) - z * Math.sin(radYaw);
        const rz = x * Math.sin(radYaw) + z * Math.cos(radYaw);
        const ry = y;

        const ry2 = ry * Math.cos(radPitch) - rz * Math.sin(radPitch);
        const rz2 = ry * Math.sin(radPitch) + rz * Math.cos(radPitch);

        const rx2 = rx * Math.cos(radRoll) - ry2 * Math.sin(radRoll);
        const ry3 = rx * Math.sin(radRoll) + ry2 * Math.cos(radRoll);

        return [
            centerX + rx2 * cubeSize,
            centerY + ry3 * cubeSize,
        ];
    });

    // Draw edges
    const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    edges.forEach(([start, end]) => {
        const [x1, y1] = projectedVertices[start];
        const [x2, y2] = projectedVertices[end];
        display.drawLine(x1, y1, x2, y2, display.color.WHITE);
    });
}

// Function to display accelerometer and magnetometer data
function displayIMUData(accel, mag) {
    display.drawString(5, 5, `Accel: X=${accel.x.toFixed(2)} Y=${accel.y.toFixed(2)} Z=${accel.z.toFixed(2)}`, display.color.CYAN);
    display.drawString(5, 15, `Mag: X=${mag.x.toFixed(2)} Y=${mag.y.toFixed(2)} Z=${mag.z.toFixed(2)}`, display.color.GREEN);
}

// Main loop
setInterval(() => {
    const gyroData = imu.getGyroscope();
    const accelData = imu.getAccelerometer();
    const magData = imu.getMagnetometer();

    drawCube(gyroData.pitch, gyroData.yaw, gyroData.roll);
    displayIMUData(accelData, magData);
}, 100);
