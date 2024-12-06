// Factory function to create a HashMap
function HashMap(size = 16) {
    // Initialize the bucket array with empty arrays (for chaining)
    const buckets = new Array(size).fill(null).map(() => []);

    // Hash function: Generates an index for a given key
    function hashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i) * (i + 1); // Simple hash formula
        }
        return hash % size; // Ensure the index stays within bounds
    }

    // Set method: Adds or updates a key-value pair
    function set(key, value) {
        const index = hashFunction(key); // Get the bucket index
        const bucket = buckets[index];

        // Check if the key already exists in the bucket
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value; // Update the value
                return;
            }
        }

        // If the key doesn't exist, add it as a new pair
        bucket.push([key, value]);
    }

    // Get method: Retrieves the value for a given key
    function get(key) {
        const index = hashFunction(key); // Get the bucket index
        const bucket = buckets[index];

        // Search for the key in the bucket
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1]; // Return the value if the key is found
            }
        }

        return null; // Key not found
    }

    // Delete method: Removes a key-value pair
    function deleteKey(key) {
        const index = hashFunction(key); // Get the bucket index
        const bucket = buckets[index];

        // Find the key in the bucket and remove it
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1); // Remove the key-value pair
                return true; // Indicate successful deletion
            }
        }

        return false; // Key not found
    }

    // Has method: Checks if a key exists in the HashMap
    function has(key) {
        const index = hashFunction(key); // Get the bucket index
        const bucket = buckets[index];

        // Check if the key exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }

        return false;
    }

    // Keys method: Returns all keys in the HashMap
    function keys() {
        const allKeys = [];
        for (let bucket of buckets) {
            for (let pair of bucket) {
                allKeys.push(pair[0]); // Collect keys
            }
        }
        return allKeys;
    }

    // Values method: Returns all values in the HashMap
    function values() {
        const allValues = [];
        for (let bucket of buckets) {
            for (let pair of bucket) {
                allValues.push(pair[1]); // Collect values
            }
        }
        return allValues;
    }

    // Entries method: Returns all key-value pairs
    function entries() {
        const allEntries = [];
        for (let bucket of buckets) {
            for (let pair of bucket) {
                allEntries.push(pair); // Collect key-value pairs
            }
        }
        return allEntries;
    }

    // Method to get the load factor
    function loadFactor() {
        let itemCount = 0;
        for (let bucket of buckets) {
            itemCount += bucket.length;
        }
        return itemCount / size; // Calculate load factor
    }

    // Resize method: Expands the bucket array when the load factor is too high
    function resize() {
        const oldBuckets = buckets.slice(); // Copy the existing buckets
        size *= 2; // Double the size
        buckets.length = size; // Resize the bucket array
        buckets.fill(null);
        for (let i = 0; i < size; i++) {
            buckets[i] = [];
        }

        // Rehash all existing key-value pairs into the new bucket array
        for (let bucket of oldBuckets) {
            for (let pair of bucket) {
                set(pair[0], pair[1]); // Reinsert each pair
            }
        }
    }

    // Return all the methods for the HashMap
    return {
        set,
        get,
        delete: deleteKey,
        has,
        keys,
        values,
        entries,
        loadFactor,
        resize,
    };
}

// Example usage:
const map = HashMap();

// Add key-value pairs
map.set("name", "John");
map.set("age", 30);
map.set("city", "New York");

// Retrieve values
console.log(map.get("name")); // Output: John
console.log(map.get("age")); // Output: 30

// Check if keys exist
console.log(map.has("city")); // Output: true
console.log(map.has("country")); // Output: false

// Get all keys, values, and entries
console.log(map.keys()); // Output: ["name", "age", "city"]
console.log(map.values()); // Output: ["John", 30, "New York"]
console.log(map.entries()); // Output: [["name", "John"], ["age", 30], ["city", "New York"]]

// Delete a key
map.delete("age");
console.log(map.get("age")); // Output: null

// Handle resizing (when needed)
console.log("Load factor before resize:", map.loadFactor());
if (map.loadFactor() > 0.75) {
    map.resize();
}