const generateAsset = () => {
    let initial = 100000000000
    //or give as param to function
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * intial );
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
