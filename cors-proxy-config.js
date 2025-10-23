// Configuration avancée pour contourner CORS
// Ajoutez ce code dans votre index.html

// Liste de proxies CORS fiables
const CORS_PROXIES = [
    {
        name: "AllOrigins",
        url: "https://api.allorigins.win/get?url=",
        parser: (response) => JSON.parse(response.contents)
    },
    {
        name: "CORS Anywhere",
        url: "https://cors-anywhere.herokuapp.com/",
        parser: (response) => response
    },
    {
        name: "CodeTabs",
        url: "https://api.codetabs.com/v1/proxy?quest=",
        parser: (response) => response
    },
    {
        name: "CORS Proxy",
        url: "https://corsproxy.io/?",
        parser: (response) => response
    },
    {
        name: "Proxy CORS",
        url: "https://thingproxy.freeboard.io/fetch/",
        parser: (response) => response
    }
];

// Fonction pour essayer tous les proxies
async function fetchWithProxy(url, proxies = CORS_PROXIES) {
    for (let i = 0; i < proxies.length; i++) {
        const proxy = proxies[i];
        try {
            console.log(`Trying proxy ${i + 1}: ${proxy.name}`);
            
            const proxyUrl = proxy.url + encodeURIComponent(url);
            const response = await fetch(proxyUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            const parsedData = proxy.parser(data);
            
            console.log(`✓ Success with proxy: ${proxy.name}`);
            return parsedData;
            
        } catch (error) {
            console.log(`✗ Failed with proxy ${proxy.name}:`, error.message);
            if (i === proxies.length - 1) {
                throw new Error('All proxies failed');
            }
        }
    }
}

// Utilisation dans votre code
async function loadDataWithProxy() {
    try {
        const apiUrl = "http://www.hisnmuslim.com/api/ar/husn_ar.json";
        const data = await fetchWithProxy(apiUrl);
        
        allItems = data["العربية"];
        renderList(allItems);
        localStorage.setItem('hisnmuslim_data', JSON.stringify(data));
        
        console.log('✅ Data loaded successfully from API via proxy');
        
    } catch (error) {
        console.error('❌ All proxy attempts failed:', error);
        // Fallback vers données locales
        loadFromLocalFile();
    }
}

// Exporter les fonctions
window.fetchWithProxy = fetchWithProxy;
window.loadDataWithProxy = loadDataWithProxy;
