const HashMap = () => {
    let bucket = [];
    let loadFactor;
    let capacity = 16;

    const hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % 16;
    };

    const set = (key, value) =>{

    }
};