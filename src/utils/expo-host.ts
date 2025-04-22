import Constants from 'expo-constants';

export const getExpoHost = () => {
    const host = Constants.experienceUrl.replace("exp", "http");
    return host.slice(0, host.lastIndexOf(":"));
};
