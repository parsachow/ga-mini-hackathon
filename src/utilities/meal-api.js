export async function detail(id){
    const BASE_URL = "http://localhost:4000/menu";
    try {
            const url = `${BASE_URL}/${id}`
            const res = await fetch(url, { 
            method: 'GET',
        })
        if (res.ok) {
            const detail = await res.json()
            return detail
        }
    } catch (err) {
        console.log(err)
        throw new Error('Invalid Request')
    }
}