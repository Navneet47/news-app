const country = [
    'ae', 'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch',
    'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk',
    'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv',
    'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt',
    'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr',
    'tw', 'ua', 'us', 've', 'za', 'ae', 'ar', 'at', 'au', 'be',
    'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg',
    'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it',
    'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no',
    'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg',
    'si','sk','th','tr','tw','ua','us','ve'];

    const b = country.sort((a,b)=>{
        return a.localeCompare(b)
    });
    
    const sortedCountry = [];
    
    for(let i = 0; i<b.length;i++){
        if(sortedCountry.indexOf(b[i])===-1){
            sortedCountry.push(b[i])
        }
    }

    const countries = []

    for(let i = 0; i<sortedCountry.length;i++){
      countries.push({
        value:i,
        label:sortedCountry[i]
      })
    }
    

    export default countries;
    export {sortedCountry}