export async function getFetchData(url:string) {
    const response = await fetch(url);
    const status = response.status;

    if(status === 200) {
        return await response.json();
    }

    const errorText = await response.text();

    throw new Error(errorText);
}