// Firebase Firestore Service for CropShield History & Telemetry Storage

import { INITIAL_PREDICTION_HISTORY } from '../utils/mockData';

const FIREBASE_COLLECTION_NAME = 'cropshield_prediction_history';

// In-Memory & LocalStorage Sync Cache for Firebase Firestore Simulation
const getStoredHistory = () => {
  const localData = localStorage.getItem(FIREBASE_COLLECTION_NAME);
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (e) {
      return INITIAL_PREDICTION_HISTORY;
    }
  }
  return INITIAL_PREDICTION_HISTORY;
};

export const savePredictionToFirebase = async (predictionData) => {
  try {
    const history = getStoredHistory();
    const newEntry = {
      id: `fb_doc_${Date.now()}`,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString(),
      crop: predictionData.crop || 'Calrose Rice',
      disease: predictionData.disease || 'Rice Blast',
      riskPercentage: predictionData.riskPercentage || 82,
      riskLevel: predictionData.riskLevel || 'High',
      eta: predictionData.eta || '48 Hours',
      temperature: predictionData.inputs?.temperature || '29°C',
      humidity: predictionData.inputs?.humidity || '86%',
      soilMoisture: predictionData.inputs?.soilMoisture || '74%',
      rainfall: predictionData.inputs?.rainfall || 'Moderate (18mm)',
      recommendation: predictionData.recommendation || 'Spray Tricyclazole today.',
      status: 'Logged to Firebase Firestore'
    };

    const updated = [newEntry, ...history];
    localStorage.setItem(FIREBASE_COLLECTION_NAME, JSON.stringify(updated));
    
    return {
      success: true,
      docId: newEntry.id,
      data: newEntry
    };
  } catch (error) {
    console.error("Firebase store error:", error);
    return { success: false, error: error.message };
  }
};

export const fetchFirebaseHistory = async () => {
  // Simulates Firebase Firestore query: db.collection("cropshield_prediction_history").orderBy("timestamp", "desc")
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getStoredHistory();
      resolve({
        success: true,
        collection: FIREBASE_COLLECTION_NAME,
        count: data.length,
        documents: data
      });
    }, 400);
  });
};

export const deleteFirebaseHistoryDoc = async (docId) => {
  try {
    const history = getStoredHistory();
    const updated = history.filter(item => item.id !== docId);
    localStorage.setItem(FIREBASE_COLLECTION_NAME, JSON.stringify(updated));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
};

export const clearFirebaseHistory = async () => {
  localStorage.setItem(FIREBASE_COLLECTION_NAME, JSON.stringify([]));
  return { success: true };
};
