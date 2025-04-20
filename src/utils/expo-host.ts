import Constants from 'expo-constants';

export const getExpoHost = () => {
    // In development mode, Constants.manifest or Constants.manifest2 has the URL
    const manifest = Constants.manifest || Constants.manifest2;

    if (!manifest) {
        console.warn("Manifest is not available. Are you running in a production build?");
        return "";
    }

    // Get the development URL
    const hostUrl = manifest.debuggerHost?.split(':')[0]; // Extract the host IP
    return `http://${hostUrl}`;
};
