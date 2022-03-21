const formId = "1FAIpQLSeUDXvekmCRIBwDf9zSJz7Hf6hN6QQ40lBrXaYXoV8amV4eCQ";
const entry1="entry.455136026";
const entry2="entry.1962264101";
const entry3="entry.879805892";
// const entry4="entry.1823515590";
// const entry5="entry.2141545392";
const entry4="entry.1389593768";

const getPath = formId => `https://docs.google.com/forms/d/e/${formId}/formResponse` ;

const postToGoogleDB = function(data){
    const path = getPath(formId);
    const url = getURL( path, data)
    sendRequest('POST', url)
        .then(responseEvent);
}

const sendRequest = async function(verb, url){
    const request = initRequest(verb, url);
    const response = await fetch(request);
    return response;
}

const getURL = function(path, params){
    const url = new URL(path);
    for(let key in params){
        url.searchParams.set(key, params[key]);

    }
    return url;
}

const initRequest = function(verb, url){
    const init = new Object();
    init.method = verb;
    init.mode = 'no-cors';
    return new Request(url, init);
}

const responseEvent = response => alert('Message Sent!')