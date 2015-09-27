export function error(data) {
    const propertiesNames = Object.getOwnPropertyNames(data);
    const serializedError = {};

    for (const i in propertiesNames) {
        if (!propertiesNames.hasOwnProperty(i)) {
            continue;
        }

        const propertiesName = propertiesNames[i];
        serializedError[propertiesName] = data[propertiesName];
    }

    return serializedError;
}

export function response(data) {
    return {
        body: data.body(false),
        headers: data.headers(),
        statusCode: data.statusCode(),
    };
}
