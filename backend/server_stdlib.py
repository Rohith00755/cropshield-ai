import http.server
import socketserver
import json
import urllib.parse
import sys
import os

# Import XGBoost or fallback predictor
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from app.services.ml_model import xgboost_predictor

PORT = 8000

class CropShieldHandler(http.server.BaseHTTPRequestHandler):

    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        # Full CORS Headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path

        if path == "/" or path == "/api":
            self._set_headers(200)
            res = {
                "status": "online",
                "service": "CropShield AI Standalone Engine",
                "version": "1.0.0",
                "mlModel": "XGBoost Classifier (Active)"
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))

        elif path == "/api/weather":
            self._set_headers(200)
            weather = [
                {"day": "Today", "date": "Aug 3", "tempMax": 31, "tempMin": 20, "humidity": 78, "condition": "Humid & Cloudy", "rainProb": 65, "wind": 11.2, "icon": "CloudRain", "sprayingIndex": "Caution (High Dew)"},
                {"day": "Tue", "date": "Aug 4", "tempMax": 33, "tempMin": 21, "humidity": 82, "condition": "Thunderstorms", "rainProb": 85, "wind": 16.4, "icon": "CloudLightning", "sprayingIndex": "Avoid Spraying"},
                {"day": "Wed", "date": "Aug 5", "tempMax": 29, "tempMin": 18, "humidity": 62, "condition": "Partial Sun", "rainProb": 15, "wind": 9.8, "icon": "CloudSun", "sprayingIndex": "Optimal (08:00 - 11:00)"},
                {"day": "Thu", "date": "Aug 6", "tempMax": 30, "tempMin": 19, "humidity": 55, "condition": "Clear Sunny", "rainProb": 5, "wind": 8.1, "icon": "Sun", "sprayingIndex": "Excellent"},
                {"day": "Fri", "date": "Aug 7", "tempMax": 32, "tempMin": 21, "humidity": 58, "condition": "Sunny", "rainProb": 10, "wind": 10.5, "icon": "Sun", "sprayingIndex": "Optimal"},
                {"day": "Sat", "date": "Aug 8", "tempMax": 34, "tempMin": 22, "humidity": 68, "condition": "Humid Heat", "rainProb": 30, "wind": 12.0, "icon": "CloudSun", "sprayingIndex": "Early Morning Only"},
                {"day": "Sun", "date": "Aug 9", "tempMax": 31, "tempMin": 19, "humidity": 74, "condition": "Light Showers", "rainProb": 50, "wind": 14.1, "icon": "CloudRain", "sprayingIndex": "Caution"}
            ]
            self.wfile.write(json.dumps(weather).encode('utf-8'))

        elif path == "/api/sensor-data":
            self._set_headers(200)
            telemetry = {
                "esp32Status": "Online",
                "batteryPercentage": 92,
                "signalStrengthDbm": -64,
                "lastPing": "Just now",
                "sensors": [
                    { "id": "S1", "name": "Ambient Temperature", "value": "28.4", "unit": "°C", "status": "Optimal", "min": 18, "max": 35, "icon": "Thermometer" },
                    { "id": "S2", "name": "Relative Humidity", "value": "78", "unit": "%", "status": "High Risk", "min": 40, "max": 85, "icon": "Droplets" },
                    { "id": "S3", "name": "Soil Moisture (Zone A)", "value": "42", "unit": "%", "status": "Optimal", "min": 30, "max": 60, "icon": "Waves" },
                    { "id": "S4", "name": "Soil Moisture (Zone B)", "value": "31", "unit": "%", "status": "Warning Low", "min": 30, "max": 60, "icon": "Waves" },
                    { "id": "S5", "name": "Solar Irradiance", "value": "840", "unit": "W/m²", "status": "High Sunlight", "min": 200, "max": 1000, "icon": "Sun" },
                    { "id": "S6", "name": "Wind Velocity", "value": "11.2", "unit": "km/h", "status": "Moderate Breeze", "min": 0, "max": 30, "icon": "Wind" }
                ]
            }
            self.wfile.write(json.dumps(telemetry).encode('utf-8'))

        elif path == "/api/history":
            self._set_headers(200)
            history = [
                {
                    "id": "PRED-9401",
                    "timestamp": "2026-08-03 14:30",
                    "crop": "Rice (Calrose)",
                    "stage": "Heading / Flowering",
                    "disease": "Rice Blast (Pyricularia oryzae)",
                    "probability": 87,
                    "riskLevel": "High Risk",
                    "confidence": 93,
                    "status": "Active Alert",
                    "recommendation": "Apply Tricyclazole 75% WP within 36 hours. Pause overhead irrigation.",
                    "eta": "36 - 48 Hours"
                }
            ]
            self.wfile.write(json.dumps(history).encode('utf-8'))

        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"detail": "Not found"}).encode('utf-8'))

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else "{}"

        try:
            body = json.loads(post_data)
        except Exception:
            body = {}

        if path == "/api/predict":
            self._set_headers(200)
            prediction = xgboost_predictor.predict(body)
            self.wfile.write(json.dumps(prediction).encode('utf-8'))

        elif path == "/api/auth/login":
            self._set_headers(200)
            res = {
                "success": True,
                "token": "mock_jwt_token_agritech_2026",
                "user": {
                    "name": body.get("email", "Alexander Vance").split('@')[0].capitalize(),
                    "email": body.get("email", "a.vance@greenacres.ag"),
                    "role": "Lead AgriTech Specialist",
                    "farmName": "GreenAcres Precision Farms"
                }
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))

        elif path == "/api/auth/register":
            self._set_headers(200)
            res = {
                "success": True,
                "token": "mock_jwt_registered_token_2026",
                "user": {
                    "name": body.get("name", "Alexander Vance"),
                    "email": body.get("email", "a.vance@greenacres.ag"),
                    "farmName": body.get("farmName", "GreenAcres Precision Farms"),
                    "role": "Farmer & Precision Specialist"
                }
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))

        elif path == "/api/feedback":
            self._set_headers(200)
            res = {"success": True, "message": "Feedback submitted to XGBoost training queue"}
            self.wfile.write(json.dumps(res).encode('utf-8'))

        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"detail": "Not found"}).encode('utf-8'))

if __name__ == "__main__":
    print(f"CropShield AI Standalone Server running on http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), CropShieldHandler) as httpd:
        httpd.serve_forever()
