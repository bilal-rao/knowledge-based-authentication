export default function builderBuitify(data) {
    let objTransform = data.items.map((obj, index) => {
        //changed from label to description
        let description = obj.description;
         obj = { [description]: obj };
        return obj;
    });
    var resultObject = objTransform.reduce(function (result, currentObject) {
        for (var key in currentObject) {
            if (currentObject.hasOwnProperty(key)) {
                result[key] = currentObject[key];
            }
        }
        return result;
    }, {});
    return resultObject;
}