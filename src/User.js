import localforage from 'localforage';

const KEY = 'playerData';

const getUserData = () => {
    return localforage.getItem(KEY);
}

const updateUserData = (data) => {
    localforage.setItem(KEY, data);
}

export { getUserData, updateUserData };