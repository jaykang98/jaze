async function parseParams(String params[][]) {

}

async function generateURL(String method, String[][] parameters) {
    for (int i=0; i<parameters[].size();i++){
    if (parameters[i][1] = 'Artist') {
    artist=parameters[i][2];
   }
    }
    if (parameters[i]='Artist'
    }
async function fetchLastFmData(username) {
    if (!username) return;
    const apiKey = 'YOUR_API_KEY';
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${encodeURIComponent(username)}&api_key=${apiKey}&format=json`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Last.FM:', error);
        return null;
    }
}