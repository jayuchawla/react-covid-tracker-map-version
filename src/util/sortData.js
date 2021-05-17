function sortData(data) {
    const sortedData = [...data];
    sortedData.sort(function(a, b) {
        return (a.cases > b.cases ? -1 : 1);
    });
    return sortedData;
}

export default sortData;