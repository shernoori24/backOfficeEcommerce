async function fetchData() {
    const response = await fetch('assets/data/data.json'); // Chemin vers ton fichier JSON
    const data = await response.json();
    return data;
}

async function createTrafficChart(trafficData) {
    const labels = trafficData.map(entry => entry.date);
    const data = trafficData.map(entry => entry.users);

    const ctx = document.getElementById('userTrafficChart').getContext('2d');
    const userTrafficChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Trafic des utilisateurs',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function createOrderChart(orderData) {
    const labels = orderData.map(entry => entry.date);
    const data = orderData.map(entry => entry.orders);

    const ctx = document.getElementById('orderCountChart').getContext('2d');
    const orderCountChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre de commandes',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function createCategoryOrdersChart(categoryOrdersData) {
    const labels = categoryOrdersData[0].data.map(entry => entry.date);

    const datasets = categoryOrdersData.map(category => ({
        label: category.category,
        data: category.data.map(entry => entry.orders),
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.1
    }));

    const ctx = document.getElementById('categoryOrdersChart').getContext('2d');
    const categoryOrdersChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function createRevenueChart(revenueData, elementId, label) {
    const labels = revenueData.map(entry => entry.date || entry.week || entry.month);
    const data = revenueData.map(entry => entry.revenue);

    const ctx = document.getElementById(elementId).getContext('2d');
    const revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: 'rgb(231, 51, 51)',
                backgroundColor: 'rgba(27, 113, 31, 0.59)',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async function createCharts() {
    const data = await fetchData();
    createTrafficChart(data.stats.trafficByDay);
    createOrderChart(data.stats.ordersByDay);
    createCategoryOrdersChart(data.stats.ordersByCategory);
    createRevenueChart(data.stats.revenues.daily, 'dailyRevenueChart', 'Recettes par jour');
    createRevenueChart(data.stats.revenues.weekly, 'weeklyRevenueChart', 'Recettes par semaine');
    createRevenueChart(data.stats.revenues.monthly, 'monthlyRevenueChart', 'Recettes par mois');
}

createCharts();
