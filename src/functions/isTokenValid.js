export default function isTokenValid(){
    return !(localStorage.getItem('expires_in') > ((new Date()) / 1000));
}

