function getApiDomain() {
    let isLocalhost = false;

    let domain = '';

    if (isLocalhost) {
        domain = 'http://localhost:9000';
    } else {
        domain = 'https://itpm-calendar-api.onrender.com';
    }

    return domain;
}

const domain = getApiDomain();

export { domain };