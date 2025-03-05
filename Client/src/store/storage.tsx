import { MMKV } from 'react-native-mmkv';

export const tokenStorage = new MMKV({
    id: 'token-storage',
    encryptionKey: 'some-secret-key',
});

export const storage = new MMKV({
    id: 'my-app-storage',
    encryptionKey: 'some-secret-key',
});

export const mmkvStorage = {
    setItem: (key: string, value: string) => {
        storage.set(key, value);
    },
    getItem: (key: string) => {
        const value = storage.getString(key);
        return value ?? null;
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
};

// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const tokenStorage = {
//     setItem: async (key: string, value: string) => {
//         try {
//             await AsyncStorage.setItem(key, value);
//         } catch (e) {
//             console.error('Error setting tokenStorage item:', e);
//         }
//     },
//     getItem: async (key: string) => {
//         try {
//             const value = await AsyncStorage.getItem(key);
//             return value ?? null;
//         } catch (e) {
//             console.error('Error getting tokenStorage item:', e);
//             return null;
//         }
//     },
//     removeItem: async (key: string) => {
//         try {
//             await AsyncStorage.removeItem(key);
//         } catch (e) {
//             console.error('Error removing tokenStorage item:', e);
//         }
//     },
// };

// export const storage = {
//     setItem: async (key: string, value: string) => {
//         try {
//             await AsyncStorage.setItem(key, value);
//         } catch (e) {
//             console.error('Error setting storage item:', e);
//         }
//     },
//     getItem: async (key: string) => {
//         try {
//             const value = await AsyncStorage.getItem(key);
//             return value ?? null;
//         } catch (e) {
//             console.error('Error getting storage item:', e);
//             return null;
//         }
//     },
//     removeItem: async (key: string) => {
//         try {
//             await AsyncStorage.removeItem(key);
//         } catch (e) {
//             console.error('Error removing storage item:', e);
//         }
//     },
// };
