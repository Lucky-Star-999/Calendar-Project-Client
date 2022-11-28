function getListofDates(data) {
    let date = [];

    for (let i = 0; i < data.length; i++) {
        date.push(data[i].startdate);
    }


    let arr = [];

    let newDate = [];


    for (let i = 0; i < date.length; i++) {
        arr.push(date[i].slice(6, 10) + date[i].slice(3, 5) + date[i].slice(0, 2));
    }

    arr = arr.sort();

    for (let i = 0; i < date.length; i++) {
        newDate.push(arr[i].slice(6, 8) + '/' + arr[i].slice(4, 6) + '/' + arr[i].slice(0, 4));
    }

    newDate = [...new Set(newDate)];

    return newDate;
}

function eventRenderHandle() {
    //alert('Hello');
}

function getAllEvents(listOfItems, data) {
    const dates = getListofDates(data);

    listOfItems = [];

    for (let i = 0; i < dates.length; i++) {
        listOfItems[i] = {};
        listOfItems[i]["date"] = dates[i];

        listOfItems[i]["events"] = [];

        let count = 0;

        for (let j = 0; j < data.length; j++) {
            if (data[j].startdate === dates[i]) {
                if (data[j].isoverdued === 'true') {
                    //listOfItems[i]["date"] = dates[i] + ' (overdued)';
                    listOfItems[i]["isoverdued"] = true;
                } else {
                    listOfItems[i]["isoverdued"] = false;
                }

                listOfItems[i].events[count] = {};
                listOfItems[i].events[count]["eventid"] = data[j].eventid;
                listOfItems[i].events[count]["title"] = data[j].title;
                listOfItems[i].events[count]["starttime"] = data[j].starttime;
                listOfItems[i].events[count]["endtime"] = data[j].endtime;
                listOfItems[i].events[count]["description"] = data[j].description;
                listOfItems[i].events[count]["duration"] = data[j].duration;
            }
            count++;
        }
    }

    return listOfItems;
}





export { eventRenderHandle, getListofDates, getAllEvents };