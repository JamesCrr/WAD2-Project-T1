<template>
    <NavBar/>

    <!-- Calendar start -->
    <div class="content">
        <div class="row p-3">
            <div class="col big-cal-container">
                <h3 class="calendar-title">Select A Date</h3>
                <!-- <form>
                    <input type="datetime-local" class="form-control">
                </form> -->
                <div class="calendar-container">
                    <header class="calendar-header">
                    <p class="calendar-current-date">{{ currentDate }}</p>
                    <div class="calendar-navigation">
                        <span id="calendar-prev" class="material-symbols-rounded" @click="changeMonth(-1)">&lt;</span>
                        <span id="calendar-next" class="material-symbols-rounded" @click="changeMonth(1)">&gt;</span>
                    </div>
                    </header>

                    <div class="calendar-body">
                    <ul class="calendar-weekdays">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul class="calendar-dates">
                        <li v-on:click="selectDate(day)" v-for="(day, index) in calendarDays" :key="index" :class="dayClass(day)">{{ day }}</li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Calendar end -->

        <!-- Show results start -->
        <div class="row">
            <div class="col" style="text-align: center;">
                <h3>Show event on <span>14 March 2023</span></h3>
            </div>
        </div>
        <!-- Show results end -->

        <!-- Filtering plus event cards start -->
        <div class="row p-3">
            <!-- Filter displays as accordion in lg screen -->
            <div class="col-lg-3 d-none d-lg-block ">
                <div class="row">
                    <div class="col">
                        <h6>Filter by</h6> <!--When the page becomes small, it'll become a nav bar like button use breakpoints and hidden-->
                    </div>
                    <div class="col" style="text-align: end;">
                        <button style="border: none; background-color: transparent; color: grey;">CLEAR ALL</button>
                    </div>
                </div>
                <div class="row">
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <strong>CATEGORIES</strong>
                            </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="form-check">
                                        <input class="form-check-input" type="radio" name="treeplanting" id="treeplantingmain">
                                        <label class="form-check-label" for="treeplantingmain">
                                            Tree Planting
                                        </label>
                                </div>
                                <div class="form-check">
                                        <input class="form-check-input" type="radio" name="communitycomposting" id="communitycompostingmain">
                                        <label class="form-check-label" for="communitycompostingmain">
                                            Community Composting
                                        </label>
                                </div>
                                <div class="form-check">
                                        <input class="form-check-input" type="radio" name="beachcleanup" id="beachcleanupmain">
                                        <label class="form-check-label" for="beachcleanupmain">
                                            Beach Clean Up
                                        </label>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                                <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <strong>LOCATIONS</strong>
                                </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="Yishun" id="Yishunmain">
                                        <label class="form-check-label" for="Yishunmain">
                                            Yishun
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="Sembawang" id="Sembawangmain">
                                        <label class="form-check-label" for="Sembawangmain">
                                            Sembawang
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="Angmokio" id="Angmokiomain">
                                        <label class="form-check-label" for="Angmokiomain">
                                            Ang Mo Kio
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <strong>OPENINGS</strong>
                            </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="lessthan10" id="lessthan10main">
                                    <label class="form-check-label" for="lessthan10main">
                                        1-10
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="lessthan20" id="lessthan20main">
                                    <label class="form-check-label" for="lessthan20main">
                                        11-20
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="lessthan30" id="lessthan30main">
                                    <label class="form-check-label" for="lessthan30main">
                                        21-30
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="above30" id="above30main">
                                    <label class="form-check-label" for="above30main">
                                        Above 30
                                    </label>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                <strong>SUITABILITY</strong>
                            </button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="firsttimers" id="firsttimersmain" v-bind:value="selectedSuitability" @change="filterEvents">
                                    <label class="form-check-label" for="firsttimersmain">
                                        First Timers
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="seniors" id="seniorsmain" :value="selectedSuitability" @change="filterEvents">
                                    <label class="form-check-label" for="seniorsmain">
                                        Seniors
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="all" id="allmain" :value="selectedSuitability" @change="filterEvents">
                                    <label class="form-check-label" for="allmain">
                                        Open to all
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="family" id="familymain"  :value="selectedSuitability" @change="filterEvents">
                                    <label class="form-check-label" for="familymain">
                                        Family Friendly
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="organisation" id="organisationmain" :value="selectedSuitability" @change="filterEvents">
                                    <label class="form-check-label" for="organisationmain">
                                        Organisations or Group
                                    </label>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Filter displays as accordion encapsulated within a modal in screen smaller than md -->
            <!-- CRISIS: Please remember to fix duplicate ids -->
            <div class="col-md-12 d-lg-none pb-3">
                <!-- Button to trigger the modal -->
                <button type="button" class="btn d-lg-none" data-bs-toggle="modal" data-bs-target="#accordionModal" style="background-color: #69D8CD; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: white;">
                    Filter
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="accordionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Accordion Widget</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="accordion" id="accordionExample">
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <strong>CATEGORIES</strong>
                                        </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="treeplanting" id="treeplantingmodal">
                                                    <label class="form-check-label" for="treeplantingmodal">
                                                        Tree Planting
                                                    </label>
                                            </div>
                                            <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="communitycomposting" id="communitycompostingmodal">
                                                    <label class="form-check-label" for="communitycompostingmodal">
                                                        Community Composting
                                                    </label>
                                            </div>
                                            <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="beachcleanup" id="beachcleanupmodal">
                                                    <label class="form-check-label" for="beachcleanupmodal">
                                                        Beach Clean Up
                                                    </label>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                            <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                <strong>LOCATIONS</strong>
                                            </button>
                                            </h2>
                                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="Yishun" id="Yishunmodal">
                                                    <label class="form-check-label" for="Yishunmodal">
                                                        Yishun
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="Sembawang" id="Sembawangmodal">
                                                    <label class="form-check-label" for="Sembawangmodal">
                                                        Sembawang
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="Angmokio" id="Angmokiomodal">
                                                    <label class="form-check-label" for="Angmokiomodal">
                                                        Ang Mo Kio
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <strong>OPENINGS</strong>
                                        </button>
                                        </h2>
                                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="lessthan10" id="lessthan10modal">
                                                <label class="form-check-label" for="lessthan10modal">
                                                    1-10
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="lessthan20" id="lessthan20modal">
                                                <label class="form-check-label" for="lessthan20modal">
                                                    11-20
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="lessthan30" id="lessthan30modal">
                                                <label class="form-check-label" for="lessthan30modal">
                                                    21-30
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="above30" id="above30modal">
                                                <label class="form-check-label" for="above30modal">
                                                    Above 30
                                                </label>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            <strong>SUITABILITY</strong>
                                        </button>
                                        </h2>
                                        <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="firsttimers" id="firsttimersmodal" :value="selectedSuitability" @change="filterEvents">
                                                <label class="form-check-label" for="firsttimersmodal">
                                                    First Timers
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="seniors" id="seniorsmodal" :value="selectedSuitability" @change="filterEvents">
                                                <label class="form-check-label" for="seniorsmodal">
                                                    Seniors
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="all" id="allmodal" :value="selectedSuitability" @change="filterEvents">
                                                <label class="form-check-label" for="allmodal">
                                                    Open to all
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="family" id="familymodal"  :value="selectedSuitability" @change="filterEvents">
                                                <label class="form-check-label" for="familymodal">
                                                    Family Friendly
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="organisation" id="organisationmodal" :value="selectedSuitability" @change="filterEvents">
                                                <label class="form-check-label" for="organisationmodal">
                                                    Organisations or Group
                                                </label>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <!-- Filtering plus event cards start -->
            <div class="col-lg-9 col-sm-12">
                <div class="row">
                    <div class="col-lg-4 col-md-6 pb-2" v-for="(event, eventId) in filteredEventDetails" :key="eventId">
                        <div class="card">
                        <img :src="event.imageURL" class="card-img-top" alt="Event Image">
                        <div class="card-body">
                            <h4 class="card-title" style="text-align: center;">{{ event.title }}</h4>
                            <img src="https://cdn-icons-png.flaticon.com/512/109/109613.png" style="width:40px; height: auto; margin: 15px" alt="">
                            <p class="card-text" style="display: inline; font-size: large; ">{{ event.startTime }} to {{ event.endTime }}</p>
                            <img src="https://media.istockphoto.com/id/1193451471/vector/map-pin-vector-glyph-icon.jpg?s=612x612&w=0&k=20&c=wuWVeHuthNAXzjOO5_VY9SUOd-6cxwpVH8VVfh6Y7Lc=" style="width:70px; height: auto;" alt="">
                            <p class="card-text" style="display: inline; font-size: large;">{{ event.location.address }}</p>
                            <img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" style="width:70px; height: auto;" alt="">
                            <p class="card-text" style="display: inline; font-size: large;">{{ event.suitability }}</p>
                            <a href="" style="display: block; text-align: center; text-decoration: none;color: #69D8CD; font-size: larger; font-weight: bold;">LEARN MORE</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Filtering plus event cards end -->
        </div>
    </div>
</template>

<style>
   .bg-maincolor{
    background-color: #69D8CD;
    }
/* 
    body{
        margin: 0;
        padding: 0;
    } */

    /* content */

    .content {
        position: absolute;
        width: 100%;
        padding-left: 3rem;
        padding-right: 3rem;
        top: 5rem;
    }

    @media (min-width: 992px) {
        .content {
            position: absolute;
            max-width: 76%;
            left: 16rem;
            top: 2rem;
        }
    }

    /* calendar styling */
    .big-cal-container {
        border-radius: 10px;
        border: solid #69D8CD;
        padding: 0.5rem 0rem 2rem 0rem;
    }
    .calendar-container {
    background: #fff;
    width: 450px;
    border-radius: 10px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    margin: 0 auto; /* Center the container horizontally */
    }

    .calendar-title {
        text-align: center;
        margin: 1rem 1rem 2rem 1rem;
        padding: 1rem;
        font-weight: bolder;
        background-color: #69D8CD;
        color: white;
        border-radius: 10px;
    }

    .calendar-container header {
        display: flex;
        align-items: center;
        padding: 25px 30px 10px;
        justify-content: space-between;
    }

    header .calendar-navigation {
        display: flex;
    }

    header .calendar-navigation span {
        height: 38px;
        width: 38px;
        margin: 0 1px;
        cursor: pointer;
        text-align: center;
        line-height: 38px;
        border-radius: 50%;
        user-select: none;
        color: #aeabab;
        font-size: 1.9rem;
    }

    .calendar-navigation span:last-child {
        margin-right: -10px;
    }

    header .calendar-navigation span:hover {
        background: #f2f2f2;
    }

    header .calendar-current-date {
        font-weight: 500;
        font-size: 1.45rem;
    }

    .calendar-body {
        padding: 20px;
    }

    .calendar-body ul {
        list-style: none;
        flex-wrap: wrap;
        display: flex;
        text-align: center;
    }

    .calendar-body .calendar-dates {
        margin-bottom: 20px;
    }

    .calendar-body li {
        width: calc(100% / 7);
        font-size: 1.07rem;
        color: #414141;
    }

    .calendar-body .calendar-weekdays li {
        cursor: default;
        font-weight: 500;
    }

    .calendar-body .calendar-dates li {
        margin-top: 30px;
        position: relative;
        z-index: 1;
        cursor: pointer;
    }

    .calendar-dates li.inactive {
        color: #aaa;
    }

    .calendar-dates li.active {
        color: #fff;
    }

    .calendar-dates li::before {
        position: absolute;
        content: "";
        z-index: -1;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }

    .calendar-dates li.active::before {
        background: #69D8cD;
    }

    .calendar-dates li:not(.active):hover::before {
        background: #e4e1e1;
    }

    .card {
            width: 100%; /* Set a fixed width for the card */
    }

    .card-img-top {
        object-fit: cover; /* Ensure the image covers the entire card without stretching */
        height: 200px; /* Set a fixed height for the image */
    }
</style>

<script>
    import { collection, getDocs } from "firebase/firestore";
    import { firebase_firestore, firebase_auth } from "../firebase"
    import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
    import NavBar from "../components/NavBar.vue";
    export default {
        data() {
            return {
            currentDate: '',
            calendarDays: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDay(),
            eventDetails: {},
            selectedCategory: null,
            selectedLocation: null,
            selectedOpenings: [],
            selectedSuitability: [],
            filteredEventDetails: [],
            };
        },
        components: {
            NavBar,
        },
        mounted() {
            this.fetchEvents(); // Fetch events when the component is mounted
        },
        methods: {
            async fetchEvents() {
                try {
                    const eventCollectionRef = collection(firebase_firestore, "events");
                    const eventSnapshot = await getDocs(eventCollectionRef);

                    const storage = getStorage(); // Initialize Firebase Storage

                    eventSnapshot.forEach(async (doc) => {
                        // Assuming each event document has fields eventName, eventDate, eventLocation, eventSuitable, and imageUrl
                        const eventData = doc.data();
                        const imageRef = storageRef(storage, `posts/${eventData.imageUrl}`);

                        try {
                            const imageURL = await getDownloadURL(imageRef);
                            eventData.imageURL = imageURL;
                        } catch (error) {
                            console.error("Error fetching image URL for event:", error.message);
                            // Handle error fetching image URL, you can set a default image or show a placeholder
                            eventData.imageURL = "URL_TO_DEFAULT_OR_PLACEHOLDER_IMAGE";
                        }

                        this.eventDetails[doc.id] = eventData;
                        await this.filterEvents()
                    });

                    console.log("ED:", this.eventDetails);

                } catch (error) {
                    console.error("Error fetching events:", error.message);
                    // Handle error or provide user feedback as needed
                }
            },
            filterEvents() {
                console.log("S:", this.selectedSuitability)

                this.filteredEventDetails = Object.values(this.eventDetails).filter((event, index) => {
                    console.log(index, event)
                    const suitabilityMatch = this.selectedSuitability.length === 0 || this.selectedSuitability.some(s => this.eventDetails.suitability.includes(s));
                    console.log(suitabilityMatch)
                    return suitabilityMatch;
                    
                })

                
            },
            manipulate() {
                // Set currentDate to the formatted current month and year
                const months = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                this.currentDate = `${months[this.month]} ${this.year}`;

                // Get the total number of days in the current month
                const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

                // Get the day of the week for the 1st day of the month (0 = Sunday, 1 = Monday, ...)
                const firstDayOfWeek = new Date(this.year, this.month, 1).getDay();

                // Calculate the number of placeholders needed to shift the start of the month
                const placeholders = Array.from({ length: firstDayOfWeek }, () => null);

                // Generate calendarDays for the dates of the current month, including placeholders
                this.calendarDays = [
                    ...placeholders,
                    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
                ];
                // console.log(this.calendarDays)
            },
            changeMonth(step) {
                this.month += step;
                if (this.month < 0) {
                    this.year--;
                    this.month = 11;
                } else if (this.month > 11) {
                    this.year++;
                    this.month = 0;
                }
                this.manipulate();
            },
            dayClass(day) {
                // Calculate the date for the current day
                const currentDate = new Date(this.year, this.month, day);
                // Calculate the date for the first day of the current month
                const firstDayOfMonth = new Date(this.year, this.month, 1);
                // Calculate the date for the last day of the current month
                const lastDayOfMonth = new Date(this.year, this.month + 1, 0);

                if (currentDate < firstDayOfMonth || currentDate > lastDayOfMonth) {
                    return 'inactive';
                }

                // Get the current date
                const today = new Date();

                // Check if the day matches the current date (year, month, and day)
                if (
                    day === today.getDate() &&
                    this.year === today.getFullYear() &&
                    this.month === today.getMonth()
                ) {
                    return 'active';
                }

                return '';
            },

            selectDate(newDay) {
                this.day = newDay

                console.log(this.day, this.month+1, this.year)
            },
        },
        created() {
            this.manipulate();

        },

    };
    
    // console.log(fetchEvents)

</script>