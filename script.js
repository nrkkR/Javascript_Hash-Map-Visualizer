class HashMap {
    constructor(size = 20) {
        this.size = size;
        this.map = new Array(size).fill(null).map(() => []);
    }

    _hash(key) {
        let hash = 0;
        for (let char of key) {
            hash += char.charCodeAt(0);
        }
        return hash % this.size;
    }

    insert(key, value) {
        const index = this._hash(key);
        const bucket = this.map[index];
        const existing = bucket.find(([k, v]) => k === key);
        if (existing) {
            existing[1] = value;
        } else {
            bucket.push([key, value]);
        }
        this.visualize();
    }

    retrieve(key) {
        const index = this._hash(key);
        const bucket = this.map[index];
        const pair = bucket.find(([k, v]) => k === key);
        if (pair) {
            alert(`Value for key "${key}": ${pair[1]}`);
        } else {
            alert(`Key "${key}" not found.`);
        }
    }

    delete(key) {
        const index = this._hash(key);
        const bucket = this.map[index];
        const pairIndex = bucket.findIndex(([k, v]) => k === key);
        if (pairIndex !== -1) {
            bucket.splice(pairIndex, 1);
            this.visualize();
        } else {
            alert(`Key "${key}" not found.`);
        }
    }

    clear() {
        this.map = new Array(this.size).fill(null).map(() => []);
        this.visualize();
    }

    visualize() {
        const container = document.getElementById('hash-map-container');
        container.innerHTML = '';
        this.map.forEach((bucket, index) => {
            if (bucket.length > 0) {
                bucket.forEach(([key, value]) => {
                    const cell = document.createElement('div');
                    cell.classList.add('hash-map-cell');
                    cell.innerHTML = `<div class="key">${key}</div><div class="value">${value}</div>`;
                    container.appendChild(cell);
                });
            } else {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('hash-map-cell', 'empty');
                emptyCell.innerHTML = `<div class="key">Bucket ${index}</div><div class="value">Empty</div>`;
                container.appendChild(emptyCell);
            }
        });
    }
}

const hashMap = new HashMap();

document.getElementById('insert').addEventListener('click', () => {
    const key = document.getElementById('key').value;
    const value = document.getElementById('value').value;
    if (key && value) {
        hashMap.insert(key, value);
    } else {
        alert('Please enter both key and value.');
    }
});

document.getElementById('retrieve').addEventListener('click', () => {
    const key = document.getElementById('key').value;
    if (key) {
        hashMap.retrieve(key);
    } else {
        alert('Please enter a key.');
    }
});

document.getElementById('delete').addEventListener('click', () => {
    const key = document.getElementById('key').value;
    if (key) {
        hashMap.delete(key);
    } else {
        alert('Please enter a key.');
    }
});

document.getElementById('clear').addEventListener('click', () => {
    hashMap.clear();
});

// Initialize with an empty visualization
hashMap.visualize();
