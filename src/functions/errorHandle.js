export default function errorHandle(obj) {
    if(obj.data.code && obj.data.message){
        let message = obj.data.code + ' - ' + obj.data.message;
        return message;
    }
    else{
        let message = 'G1 - The requested operation cannot be performed.'
        return message;
    }
}