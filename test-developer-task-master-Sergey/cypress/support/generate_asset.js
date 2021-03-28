const generateAsset = () => {
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 10000000000);
    };
    const generateRandomString = () => {
        return Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 4);
    };
    return generateRandomString().toUpperCase()+generateRandomNumber();
}

export {generateAsset};