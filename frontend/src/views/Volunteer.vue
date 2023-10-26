<template>
  <div class="container-fluid">
    <!-- Navbar start -->
    <!-- <div class="row">
      <nav class="navbar navbar-expand-md bg-maincolor">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">EcoConnect</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" href="/volunteer">Volunteer Now!</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div> -->
    <!-- Navbar end -->

    <!-- Calendar start -->
    <div class="row p-3">
      <div class="col p-3" style="border-radius: 10px; border: solid orange">
        <h5>Select A Date</h5>
        <!-- <form>
                                    <input type="datetime-local" class="form-control">
                                </form> -->
        <div class="calendar-container">
          <header class="calendar-header">
            <p class="calendar-current-date">{{ currentDate }}</p>
            <div class="calendar-navigation">
              <span id="calendar-prev" class="material-symbols-rounded" @click="changeMonth(-1)"
                >&lt;</span
              >
              <span id="calendar-next" class="material-symbols-rounded" @click="changeMonth(1)"
                >&gt;</span
              >
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
              <li
                v-on:click="selectDate(day)"
                v-for="(day, index) in calendarDays"
                :key="index"
                :class="dayClass(day)"
              >
                {{ day }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Calendar end -->

    <!-- Show results start -->
    <div class="row">
      <div class="col" style="text-align: center">
        <h3>Show event on <span>14 March 2023</span></h3>
      </div>
    </div>
    <!-- Show results end -->

    <!-- Filtering plus event cards start -->
    <div class="row p-3">
      <!-- Filter displays as accordion in lg screen -->
      <div class="col-lg-3 d-none d-lg-block">
        <div class="row" v-if="doneloading">
          <div class="col">
            <h6>Filter by</h6>
            <!--When the page becomes small, it'll become a nav bar like button use breakpoints and hidden-->
          </div>
          <div class="col" style="text-align: end">
            <button style="border: none; background-color: transparent; color: grey">
              CLEAR ALL
            </button>
          </div>
        </div>

        <!-- Desktop Views -->
        <div class="row" v-if="doneloading">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <!-- header -->
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <strong>CATEGORIES</strong>
                </button>
              </h2>

              <!-- body -->
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="treeplanting"
                      id="treeplantingmain"
                      value="treeplanting"
                      v-model="selectedCategory"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="treeplantingmain"> Tree Planting </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="communitycomposting"
                      id="communitycompostingmain"
                      value="communitycomposting"
                      v-model="selectedCategory"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="communitycompostingmain">
                      Community Composting
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="beachcleanup"
                      id="beachcleanupmain"
                      value="beachcleanupmain"
                      v-model="selectedCategory"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="beachcleanupmain"> Beach Clean Up </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Location Modal -->

            <div class="accordion-item">
              <!-- header -->
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <strong>LOCATIONS</strong>
                </button>
              </h2>

              <!-- body -->
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="Yishun"
                      id="Yishunmain"
                      value="yishun"
                      v-model="selectedLocation"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="Yishunmain"> Yishun </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="Sembawang"
                      id="Sembawangmain"
                      value="sembwang"
                      v-model="selectedLocation"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="Sembawangmain"> Sembawang </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="Angmokio"
                      id="Angmokiomain"
                      value="angmokio"
                      v-model="selectedLocation"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="Angmokiomain"> Ang Mo Kio </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Openings Modal -->

            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <strong>OPENINGS</strong>
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="lessthan10main"
                      value="lessthan10"
                      v-model="selectedOpenings"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="lessthan10main"> 0-10 </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="lessthan20main"
                      value="lessthan20"
                      v-model="selectedOpenings"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="lessthan20main"> 11-20 </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="lessthan30main"
                      value="lessthan30"
                      v-model="selectedOpenings"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="lessthan30main"> 21-30 </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="above30main"
                      value="above30"
                      v-model="selectedOpenings"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="above30main"> Above 30 </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Sutability Modal -->

            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  <strong>SUITABILITY</strong>
                </button>
              </h2>

              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="firsttimers"
                      id="firsttimersmain"
                      v-model="selectedSuitability"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="firsttimersmain"> First Timers </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="seniors"
                      id="seniorsmain"
                      v-model="selectedSuitability"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="seniorsmain"> Seniors </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="all"
                      id="allmain"
                      v-model="selectedSuitability"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="allmain"> Open to all </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="family"
                      id="familymain"
                      v-model="selectedSuitability"
                      @change="filterEvents"
                    />
                    <label class="form-check-label" for="familymain"> Family Friendly </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="organisation"
                      id="organisationmain"
                      v-model="selectedSuitability"
                      @change="filterEvents"
                    />
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
        <button
          type="button"
          class="btn d-lg-none"
          data-bs-toggle="modal"
          data-bs-target="#accordionModal"
          style="
            background-color: #69d8cd;
            font-family:
              system-ui,
              -apple-system,
              BlinkMacSystemFont,
              &quot;Segoe UI&quot;,
              Roboto,
              Oxygen,
              Ubuntu,
              Cantarell,
              &quot;Open Sans&quot;,
              &quot;Helvetica Neue&quot;,
              sans-serif;
            color: white;
          "
        >
          Filter
        </button>

        <!-- MOBILE Modal -->
        <div
          class="modal fade"
          id="accordionModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Accordion Widget</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <strong>CATEGORIES</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="treeplanting"
                            id="treeplantingmodal"
                            value="treeplanting"
                            v-model="selectedCategory"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="treeplantingmodal">
                            Tree Planting
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="communitycomposting"
                            id="communitycompostingmodal"
                            value="communitycomposting"
                            v-model="selectedCategory"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="communitycompostingmodal">
                            Community Composting
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="beachcleanup"
                            id="beachcleanupmodal"
                            value="beachcleanupmain"
                            v-model="selectedCategory"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="beachcleanupmodal">
                            Beach Clean Up
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <strong>LOCATIONS</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="Yishun"
                            id="Yishunmodal"
                            value="yishun"
                            v-model="selectedLocation"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="Yishunmodal"> Yishun </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="Sembawang"
                            id="Sembawangmodal"
                            value="sembwang"
                            v-model="selectedLocation"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="Sembawangmodal"> Sembawang </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="Angmokio"
                            id="Angmokiomodal"
                            value="angmokio"
                            v-model="selectedLocation"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="Angmokiomodal"> Ang Mo Kio </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <strong>OPENINGS</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="lessthan10modal"
                            value="lessthan10"
                            v-model="selectedOpenings"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="lessthan10modal"> 1-10 </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="lessthan20modal"
                            value="lessthan20"
                            v-model="selectedOpenings"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="lessthan20modal"> 11-20 </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="lessthan30main"
                            value="lessthan30modal"
                            v-model="selectedOpenings"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="lessthan30modal"> 21-30 </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="above30modal"
                            value="above30"
                            v-model="selectedOpenings"
                            @change="filterEvents"
                          />
                          <label class="form-check-label" for="above30modal"> Above 30 </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        <strong>SUITABILITY</strong>
                      </button>
                    </h2>

                    <div class="accordion-body">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="firsttimers"
                          id="firsttimersmodal"
                          v-model="selectedSuitability"
                          @change="filterEvents"
                        />
                        <label class="form-check-label" for="firsttimersmodal">
                          First Timers
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="seniors"
                          id="seniorsmodal"
                          v-model="selectedSuitability"
                          @change="filterEvents"
                        />
                        <label class="form-check-label" for="seniorsmodal"> Seniors </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="all"
                          id="allmodal"
                          v-model="selectedSuitability"
                          @change="filterEvents"
                        />
                        <label class="form-check-label" for="allmodal"> Open to all </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="family"
                          id="familymodal"
                          v-model="selectedSuitability"
                          @change="filterEvents"
                        />
                        <label class="form-check-label" for="familymodal"> Family Friendly </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="organisation"
                          id="organisationmodal"
                          v-model="selectedSuitability"
                          @change="filterEvents"
                        />
                        <label class="form-check-label" for="organisationmodal">
                          Organisations or Group
                        </label>
                      </div>
                    </div>
                    <div
                      id="collapseFour"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    ></div>
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
          <div
            class="col-lg-4 col-md-6 pb-2"
            v-for="(event, eventId) in filteredEventDetails"
            :key="eventId"
          >
            <div class="card">
              <img :src="event.imageURL" class="card-img-top" alt="Event Image" />
              <div class="card-body">
                <h4 class="card-title" style="text-align: center">{{ event.title }}</h4>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/109/109613.png"
                  style="width: 40px; height: auto; margin: 15px"
                  alt=""
                />
                <p class="card-text" style="display: inline; font-size: large">
                  {{ event.startTime }} to {{ event.endTime }}
                </p>
                <img
                  src="https://media.istockphoto.com/id/1193451471/vector/map-pin-vector-glyph-icon.jpg?s=612x612&w=0&k=20&c=wuWVeHuthNAXzjOO5_VY9SUOd-6cxwpVH8VVfh6Y7Lc="
                  style="width: 70px; height: auto"
                  alt=""
                />
                <p class="card-text" style="display: inline; font-size: large">
                  {{ event.location.address }}
                </p>
                <img
                  src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                  style="width: 70px; height: auto"
                  alt=""
                />
                <p class="card-text" style="display: inline; font-size: large">
                  {{ event.suitability }}
                </p>
                <a
                  href=""
                  style="
                    display: block;
                    text-align: center;
                    text-decoration: none;
                    color: #69d8cd;
                    font-size: larger;
                    font-weight: bold;
                  "
                  >LEARN MORE</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Filtering plus event cards end -->
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore"
import { firebase_firestore, firebase_storage } from "../firebase"
import { ref as storageRef, getDownloadURL } from "firebase/storage"

export default {
  data() {
    return {
      currentDate: "",
      calendarDays: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDay(),

      doneloading: false,
      eventDetails: {},
      selectedCategory: [],
      selectedLocation: [],
      selectedOpenings: [],
      selectedSuitability: [],
      filteredEventDetails: [],
    }
  },
  mounted() {
    this.fetchEvents() // Fetch events when the component is mounted
  },
  methods: {
    async fetchEvents() {
      try {
        const eventCollectionRef = collection(firebase_firestore, "events")
        const eventSnapshot = await getDocs(eventCollectionRef)

        let promiseArray = []
        eventSnapshot.forEach((doc) => {
          promiseArray.push(
            new Promise(async (resolve, reject) => {
              const eventData = doc.data()
              const imageRef = storageRef(firebase_storage, `posts/${eventData.imageUrl}`)
              try {
                const imageURL = await getDownloadURL(imageRef)
                eventData.imageURL = imageURL
              } catch (error) {
                console.error("Error fetching image URL for event:", error.message)
                // Handle error fetching image URL, you can set a default image or show a placeholder
                eventData.imageURL = "URL_TO_DEFAULT_OR_PLACEHOLDER_IMAGE"

                reject() // when error
              }

              this.eventDetails[doc.id] = eventData
              resolve() // when successful
            }),
          )
        })
        await Promise.all(promiseArray)
        this.doneloading = true
        this.filterEvents()
      } catch (error) {
        console.error("Error fetching events:", error.message)
        // Handle error or provide user feedback as needed
      }
    },
    filterEvents() {
      console.log("C:", this.selectedCategory)
      console.log("L:", this.selectedLocation)
      console.log("O:", this.selectedOpenings)
      console.log("S:", this.selectedSuitability)
      //   console.log(this.eventDetails)

      this.filteredEventDetails = Object.values(this.eventDetails).filter((event, index) => {
        const categoryMatch =
          !this.selectedCategory.length == 0 ||
          this.selectedCategory.some((s) => event.suitability.includes(s))
        const locationMatch =
          !this.selectedLocation.length === 0 ||
          this.selectedLocation.some(
            (s) => event.location.searchValue.includes(s) || event.location.address.includes(s),
          )
        let openingsMatch = false
        for (let opening of this.selectedOpenings) {
          if (
            (opening == "above30" && event.openings > 30) ||
            (opening == "lessthan30" && event.openings <= 30) ||
            (opening == "lessthan20" && event.openings <= 20) ||
            (opening == "lessthan10" && event.openings <= 10)
          ) {
            openingsMatch = true
            break
          }
        }

        const suitabilityMatch =
          this.selectedSuitability.length === 0 ||
          this.selectedSuitability.some((s) => event.suitability.includes(s))

        // console.log(suitabilityMatch, categoryMatch, locationMatch, openingsMatch)
        return suitabilityMatch || categoryMatch || locationMatch || openingsMatch
      })
    },
    manipulate() {
      // Set currentDate to the formatted current month and year
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
      this.currentDate = `${months[this.month]} ${this.year}`

      // Get the total number of days in the current month
      const daysInMonth = new Date(this.year, this.month + 1, 0).getDate()

      // Get the day of the week for the 1st day of the month (0 = Sunday, 1 = Monday, ...)
      const firstDayOfWeek = new Date(this.year, this.month, 1).getDay()

      // Calculate the number of placeholders needed to shift the start of the month
      const placeholders = Array.from({ length: firstDayOfWeek }, () => null)

      // Generate calendarDays for the dates of the current month, including placeholders
      this.calendarDays = [...placeholders, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
      // console.log(this.calendarDays)
    },
    changeMonth(step) {
      this.month += step
      if (this.month < 0) {
        this.year--
        this.month = 11
      } else if (this.month > 11) {
        this.year++
        this.month = 0
      }
      this.manipulate()
    },
    dayClass(day) {
      // Calculate the date for the current day
      const currentDate = new Date(this.year, this.month, day)
      // Calculate the date for the first day of the current month
      const firstDayOfMonth = new Date(this.year, this.month, 1)
      // Calculate the date for the last day of the current month
      const lastDayOfMonth = new Date(this.year, this.month + 1, 0)

      if (currentDate < firstDayOfMonth || currentDate > lastDayOfMonth) {
        return "inactive"
      }

      // Get the current date
      const today = new Date()

      // Check if the day matches the current date (year, month, and day)
      if (
        day === today.getDate() &&
        this.year === today.getFullYear() &&
        this.month === today.getMonth()
      ) {
        return "active"
      }

      return ""
    },

    selectDate(newDay) {
      this.day = newDay

      console.log(this.day, this.month + 1, this.year)
    },
  },
  created() {
    this.manipulate()
  },
}

// console.log(fetchEvents)
</script>

<style scoped>
.bg-maincolor {
  background-color: #69d8cd;
}

body {
  margin: 0;
  padding: 0;
}

.calendar-container {
  background: #fff;
  width: 450px;
  border-radius: 10px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  margin: 0 auto; /* Center the container horizontally */
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
  background: #69d8cd;
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
