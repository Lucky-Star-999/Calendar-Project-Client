// The javascript file is to convert response data from API to formatted data for clients
/*Data sample:
    {
        "eventid": "event1",
        "email": "admin1@gmail.com",
        "title": "Event One",
        "description": "First Event!!!",
        "starttime": "07:00 AM",
        "endtime": "10:00 AM",
        "duration": "03h00",
        "startdate": "05/12/2022",
        "isoverdued": "false",
        "ishost": "1"
    }
*/

// Return list of dates with ascending order
// Ex: input: [20/11/2022, 11/11/2022, 11/01/2022, 20/11/2022, 11/11/2022]
// -> Output: [11/01/2022, 11/11/2022, 20/11/2022]
function getListofDates(data) {
    let date = [];

    // Push all startdate into an array
    // Ex: [20/11/2022, 11/11/2022, 11/01/2022, 20/11/2022, 11/11/2022]
    for (let i = 0; i < data.length; i++) {
        date.push(data[i].startdate);
    }

    let arr = [];
    let newDate = [];

    // Format date into a string for comparison
    // 20/11/2022 -> 20221120
    // 11/01/2022 -> 20220111
    // -> 20220111 < 20221120 -> 11/01/2022 < 20/11/2022
    for (let i = 0; i < date.length; i++) {
        arr.push(date[i].slice(6, 10) + date[i].slice(3, 5) + date[i].slice(0, 2));
    }

    // Sort all date
    // Output: [20220111, 20221111, 20221111, 20221120, 20221120]
    arr = arr.sort();

    // Return original format
    // Output: [11/01/2022, 11/11/2022, 11/11/2022, 20/11/2022, 20/11/2022]
    for (let i = 0; i < date.length; i++) {
        newDate.push(arr[i].slice(6, 8) + '/' + arr[i].slice(4, 6) + '/' + arr[i].slice(0, 4));
    }

    // Remove duplicate
    // Output: [11/01/2022, 11/11/2022, 20/11/2022]
    newDate = [...new Set(newDate)];

    return newDate;     // Output: [11/01/2022, 11/11/2022, 20/11/2022]
}


// Arrange all events by date
function getAllEvents(listOfItems, data) {

    // [11/01/2022, 11/11/2022, 20/11/2022]
    const dates = getListofDates(data);

    // All events will go to this array
    listOfItems = [];

    // Push all events into each date group
    for (let i = 0; i < dates.length; i++) {
        listOfItems[i] = {};
        listOfItems[i]["date"] = dates[i];
        listOfItems[i]["events"] = [];

        let count = 0;

        for (let j = 0; j < data.length; j++) {
            if (data[j].startdate === dates[i]) {
                if (data[j].isoverdued === 'true') {
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

export { getListofDates, getAllEvents };