// return boolean local storage is available
const localStorageIsAvailable = (): {
  localStorage: Storage | undefined, storageIsAvailable: boolean
} => {
  try {
    const storage = window.localStorage;
    return {
      localStorage: storage, storageIsAvailable: true,
    };
  } catch (e) {
    console.error(e);
    return {
      localStorage: undefined, storageIsAvailable: false,
    };
  }
};

export default localStorageIsAvailable;
