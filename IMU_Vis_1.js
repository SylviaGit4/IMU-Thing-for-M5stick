// Assuming Bruce firmware's display and IMU APIs
const display = new M5Display(); // Replace with the correct initialization for display
const imu = new M5IMU(); // Replace with the correct IMU object initialization

display.begin();
imu.begin();

// Cube Drawing Function
function drawCube(pitch, yaw, roll) {
    display.clear();

    const radPitch = (pitch * Math.PI) / 180;
    const radYaw = (yaw * Math.PI) / 180;
    const radRoll = (roll * Math.PI) / 180;

    const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
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
            80 + rx2 * 50, // Centering on the display
            60 + ry3 * 50
        ];
    });

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
