<template>

<div>
    <canvas id="myChart" height="270" style="padding: 2rem 1rem 0rem 1rem;"></canvas>
</div>
</template>

<script>
import Chart from "chart.js/auto"

export default {
    data() {
        return {
            ageGroupArr: [9, 11, 21, 7],
        }
    },
    props: {
        pathID: String,
        ageArr: Array,
    },
   
    computed: {
        // countAgeGroup() {
        //     let ageGroups = []
        //     // below 20
        //     let below20 = this.ageArr.filter(age => age < 20).length
        //     ageGroups.push(below20)
        //     // 20 to 40
        //     let between20to40 = this.ageArr.filter(age => age >=20 && age < 40).length
        //     ageGroups.push(between20to40)
        //     // 40 to 60
        //     let between40to60 = this.ageArr.filter(age => age >= 40 && age < 60).length
        //     ageGroups.push(between40to60)
        //     // above 60
        //     let above60 = this.ageArr.filter(age => age > 60).length
        //     ageGroups.push(above60)
        //     return ageGroups
        // }
    },
    methods: {
        async updateData() {
            let ageGroups = []
            // below 20
            let below20 = this.ageArr.filter(age => age < 20).length
            ageGroups.push(below20)
            // 20 to 40
            let between20to40 = this.ageArr.filter(age => age >= 20 && age < 40).length
            ageGroups.push(between20to40)
            // 40 to 60
            let between40to60 = this.ageArr.filter(age => age >= 40 && age < 60).length
            ageGroups.push(between40to60)
            // above 60
            let above60 = this.ageArr.filter(age => age > 60).length
            ageGroups.push(above60)
            this.ageGroupArr = ageGroups
            console.log(this.ageGroupArr)
        }
    },
    created() {
        this.updateData()
    },
    mounted() {
        const labels = ['Below 20', '20 - 40 years old', '40 - 60 years old', 'Above 60']

        const data = {
            labels: labels,
            datasets: [{
                label: 'Number of Volunteers',
                data: this.ageGroupArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1


            }]
        }

        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        }
        const myChart = new Chart(
            document.getElementById("myChart"),
            config
        )
    }
}

// const labels = ['Below 20', '20 - 40 years old', '40 - 60 years old', 'Above 60']

// const data = {
//     labels: labels,
//     datasets: [{
//         label: 'Ages of Volunteers',
//         data: [9, 11, 21, 8],
//         backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//         ],
//         borderColor: [
//             'rgb(255, 99, 132)',
//             'rgb(75, 192, 192)',
//             'rgb(54, 162, 235)',
//             'rgb(153, 102, 255)',
//         ],
//         borderWidth: 1


//     }]
// }

// const config = {
//     type: 'bar',
//     data: data,
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     },
// }

</script>