const labels = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'My movement dataset',
        backgroundColor: 'grey',
        borderColor: 'yellow',
        data: [13, 10, 5, 2, 11, 7, 6, 4, 7, 2],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);


const labels2 = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
];

const data2 = {
    labels: labels2,
    datasets: [{
        label: 'My temperature dataset',
        backgroundColor: 'grey',
        borderColor: 'pink',
        data: [34, 36, 37, 39, 35, 35, 37, 38, 36, 38],
    }]
};

const config2 = {
    type: 'line',
    data: data2,
    options: {}
};

const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
);






var ctx = document.getElementById("doughnutChart");
var doughnutChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['in bed', 'out of bed'],
        datasets: [{
            label: '# time in bed',
            data: [27, 12],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        //cutoutPercentage: 40,
        responsive: false,

    }
});