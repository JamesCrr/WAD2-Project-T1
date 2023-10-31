<template>
  <div class="content">
    <!-- Calendar start -->
    <!-- <div class="row p-3">
      <div class="col big-cal-container">
        <h3 class="calendar-title">Select your Date</h3>
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
    </div> -->
    <!-- Calendar end -->

    <!-- Show results start -->
    <div class="row mt-4 mb-3">
      <div class="col" style="text-align: center">
        <h3 v-if="selectedDate != ''">
          Showing events on <span class="text-primary">{{ selectedDate }}</span>
        </h3>
        <h3 v-else>Find your next Volunteer Event!</h3>
      </div>
    </div>
    <!-- Show results end -->

    <!-- Filtering plus event cards start -->
    <div class="row p-3" style="margin-bottom: 100px">
      <!-- Filter displays in lg screen -->
      <div class="col-lg-3 d-none d-lg-block">
        <div class="row">
          <div class="col">
            <h6>Filter by</h6>
            <!--When the page becomes small, it'll become a nav bar like button use breakpoints and hidden-->
          </div>
          <!-- <div class="col" style="text-align: end">
            <button style="border: none; background-color: transparent; color: grey">
              CLEAR ALL
            </button>
          </div> -->
        </div>

        <!-- Desktop Accordion Filters -->
        <div class="row">
          <div class="accordion p-0" id="accordionExample">
            <!-- Desktop Categories Modal -->
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  v-bind:disabled="isLoading"
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
            <!-- <div class="accordion-item">
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
            </div> -->
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
                  v-bind:disabled="isLoading"
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
                  v-bind:disabled="isLoading"
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
                      value="first"
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
        <!-- Desktop Calendar -->
        <div class="row" v-if="doneLoading">
          <h3 class="calendar-title">Select your Date</h3>
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

      <!-- Filter displays in screen smaller than md -->
      <div class="col-md-12 d-lg-none pb-3">
        <!-- Button to trigger the modal -->
        <button
          type="button"
          class="btn d-lg-none"
          data-bs-toggle="modal"
          data-bs-target="#accordionModal"
          style="background-color: #69d8cd; color: white"
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
                <h5 class="modal-title">Filter Results</h5>
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
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                        v-bind:disabled="isLoading"
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
                  <!-- <div class="accordion-item">
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
                  </div> -->
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                        v-bind:disabled="isLoading"
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
                        v-bind:disabled="isLoading"
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
                            value="first"
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
                          <label class="form-check-label" for="familymodal">
                            Family Friendly
                          </label>
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
                    </div>
                  </div>
                </div>

                <!-- Mobile Calendar -->
                <div class="row d-flex justify-content-center" v-if="doneLoading">
                  <div class="col-10">
                    <h3 class="calendar-title">Select your Date</h3>
                    <div class="calendar-container" style="width: 100%">
                      <header
                        class="calendar-header"
                        style="padding-left: 10px; padding-right: 10px"
                      >
                        <p class="calendar-current-date">{{ currentDate }}</p>
                        <div class="calendar-navigation">
                          <span
                            id="calendar-prev"
                            class="material-symbols-rounded"
                            @click="changeMonth(-1)"
                            >&lt;</span
                          >
                          <span
                            id="calendar-next"
                            class="material-symbols-rounded"
                            @click="changeMonth(1)"
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event cards -->
      <div class="col-lg-9 col-sm-12">
        <!-- Loading Cards -->
        <div v-if="isLoading">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ms-lg-1">
            <div class="col" v-for="index in placeholderCount" :key="index">
              <div class="card h-100 text-center" aria-hidden="true">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/2560px-Placeholder_view_vector.svg.png"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h4 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                  </h4>
                  <h3 class="card-title placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                  </h3>

                  <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Actual Cards with content -->
        <div v-else>
          <div v-if="filteredEventDetails.length > 0">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ms-lg-1">
              <div class="col" v-for="(event, eventId) in filteredEventDetails" :key="eventId">
                <div class="card h-100">
                  <img :src="event.imageURL" class="card-img-top" alt="..." />
                  <div
                    class="card-body d-flex flex-column justify-content-between align-items-start"
                  >
                    <h4
                      class="card-title"
                      style="
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                    >
                      {{ event.title }}
                    </h4>
                    <div class="d-flex justify-content-start align-items-center my-3 w-100">
                      <div style="width: 25px">
                        <BIconClock class="fs-5" />
                      </div>
                      <label class="ms-2">
                        {{ convertTo12HourFormat(event.startTime) }} to
                        {{ convertTo12HourFormat(event.endTime) }}
                      </label>
                    </div>
                    <div class="d-flex justify-content-start align-items-center my-3 w-100">
                      <div style="width: 25px">
                        <BIconGeoAltFill class="fs-5" />
                      </div>
                      <label class="ms-2">
                        {{ event.location.searchValue }}
                      </label>
                    </div>
                    <div class="d-flex justify-content-start align-items-center my-3 w-100">
                      <div style="width: 25px">
                        <BIconPersonFill class="fs-5" />
                      </div>
                      <label class="ms-2">
                        {{ event.suitability }}
                      </label>
                    </div>
                    <router-link
                      :to="'/events/' + Object.keys(this.eventDetails)[eventId]"
                      style="text-align: center"
                    >
                      <button class="btn btn-primary">Learn More</button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="height: 500px">
            <div class="container-fluid h-100 d-flex justify-content-center align-items-center">
              <h4 style="color: gray; opacity: 0.9">No Events Found :(</h4>
            </div>
          </div>
        </div>
      </div>
      <!-- Event cards end -->
    </div>
  </div>
</template>

<script>
import { BIconClock, BIconPersonFill, BIconGeoAltFill } from "bootstrap-icons-vue"
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
      selectedDate: "",
      dateEventDetails: "",

      doneLoading: false,
      isLoading: true,

      eventDetails: {},
      selectedCategory: [],
      selectedLocation: [],
      selectedOpenings: [],
      selectedSuitability: [],
      filteredEventDetails: [],
      placeholderCount: 3,
    }
  },
  mounted() {
    setTimeout(() => {
      this.fetchEvents() // Fetch events when the component is mounted
    }, 500)
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
              // console.log(Object.keys(this.eventDetails))
              resolve() // when successful
            }),
          )
        })
        await Promise.all(promiseArray)
        // Once data is loaded, set isLoading to false
        this.doneLoading = true
        this.isLoading = false
        this.filterEvents()
      } catch (error) {
        console.error("Error fetching events:", error.message)
        // Handle error or provide user feedback as needed
      }
    },
    filterEvents() {
      // console.log("C:", this.selectedCategory)
      // console.log("L:", this.selectedLocation)
      // console.log("O:", this.selectedOpenings)
      // console.log("S:", this.selectedSuitability)
      // console.log(this.eventDetails)

      // const locationMatch =
      //   !this.selectedLocation.length === 0 ||
      //   this.selectedLocation.some(
      //     (s) => event.location.searchValue.includes(s) || event.location.address.includes(s),
      //   )

      // Selected Filter?
      if (
        this.selectedCategory.length == 0 &&
        this.selectedLocation.length == 0 &&
        this.selectedOpenings.length == 0 &&
        this.selectedSuitability.length == 0 &&
        this.dateEventDetails == ""
      ) {
        this.filteredEventDetails = Object.values(this.eventDetails)
      } else {
        this.filteredEventDetails = Object.values(this.eventDetails).filter((event, index) => {
          // Category
          const categoryMatch = this.selectedCategory.some((s) => event.suitability.includes(s))
          // Openings
          let openingsMatch = false
          for (let opening of this.selectedOpenings) {
            console.log(event.openings)
            if (
              (opening == "above30" && event.openings > 30) ||
              (opening == "lessthan30" && event.openings > 20 && event.openings <= 30) ||
              (opening == "lessthan20" && event.openings > 10 && event.openings <= 20) ||
              (opening == "lessthan10" && event.openings <= 10)
            ) {
              openingsMatch = true
              // console.log(event, "MATECHD")
              break
            }
          }
          // Suitability
          const suitabilityMatch = this.selectedSuitability.some((s) =>
            event.suitability.toLowerCase().includes(s),
          )
          // Date
          const dateMatch = this.dateEventDetails === event.date
          // console.log(this.dateEventDetails, event.date)

          // console.log(suitabilityMatch, categoryMatch, openingsMatch, dateMatch)
          return suitabilityMatch || categoryMatch || openingsMatch || dateMatch
        })
      }
    },
    convertTo12HourFormat(time24) {
      // Split the time string into hours and minutes
      const [hours, minutes] = time24.split(":").map(Number)
      // Determine if it's AM or PM
      const period = hours < 12 ? "AM" : "PM"
      // Convert hours to 12-hour format
      const hours12 = hours % 12 || 12 // 0 should be converted to 12
      // Create the 12-hour formatted string
      const time12 = `${hours12}:${minutes.toString().padStart(2, "0")}${period}`

      // console.log(hours, minutes, hours12, time12)
      return time12
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
      // console.log(this.dateEventDetails, `${this.year}-${this.month + 1}-${day}`)
      const leadingMonthPlus1 = this.leadingZeros(this.month + 1)
      const leadingDay = this.leadingZeros(day)
      if (this.dateEventDetails == `${this.year}-${leadingMonthPlus1}-${leadingDay}`) {
        return "selectactive"
      }

      return ""
    },
    leadingZeros(num) {
      if (num < 10) return `0${num}`
      else return String(num)
    },

    selectDate(newDay) {
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
      // console.log("ODL:", this.dateEventDetails)
      // console.log("NEW:", `${this.year}-${this.leadingZeros(this.month + 1)}-${newDay}`)
      const leadingMonth = this.leadingZeros(this.month)
      const leadingMonthPlus1 = this.leadingZeros(this.month + 1)
      const leadingNewDay = this.leadingZeros(newDay)

      // Deselect
      if (
        this.dateEventDetails !== "" &&
        this.dateEventDetails === `${this.year}-${leadingMonthPlus1}-${leadingNewDay}`
      ) {
        this.selectedDate = ""
        this.dateEventDetails = ""
        this.filterEvents()
        return
      }

      this.day = newDay
      this.selectedDate = `${this.day} ${months[this.month]} ${this.year}`
      this.dateEventDetails = `${this.year}-${leadingMonthPlus1}-${leadingNewDay}`
      // console.log(this.day, this.month + 1, this.year)
      this.filterEvents()
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
/*
    body{
        margin: 0;
        padding: 0;
    } */

/* content */

.content {
  position: absolute;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  top: 5rem;
}

/* calendar styling */
.big-cal-container {
  border-radius: 10px;
  border: solid #69d8cd;
  padding: 0.5rem 0rem 2rem 0rem;
}
.calendar-container {
  background: #fff;
  width: 315px;
  border-radius: 10px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  margin: 0 auto; /* Center the container horizontally */

  border-radius: 10px;
  border: solid #69d8cd;
}

.calendar-title {
  text-align: center;
  /* margin: 1rem 1rem 2rem 1rem; */
  padding: 1rem;
  font-weight: bolder;
  /* background-color: #69d8cd; */
  /* color: white; */
  color: #69d8cd;
  border-radius: 10px;

  font-size: large;
  padding: 5px;
  margin-bottom: 0px;
  margin-top: 20px;
}

.calendar-container header {
  display: flex;
  align-items: center;
  /* padding: 25px 30px 10px; */
  justify-content: space-between;

  padding-top: 10px;
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
  font-size: 1.15rem;

  margin-bottom: 0px;
  margin-left: 5px;
  text-align: center;
}

/* .calendar-body {
  padding: 10px;
} */

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

.calendar-weekdays {
  margin-top: 10px;
  margin-bottom: 0px;
}

.calendar-weekdays,
.calendar-dates {
  padding-left: 0px;
}
.calendar-body .calendar-weekdays li {
  cursor: default;
  font-weight: 500;
  font-size: medium;
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
  color: white;
  background-color: #69d8cd;
}

.calendar-dates li.selectactive {
  background-color: #69d8cd;
  border-radius: 50%;
  /* width: 20px;
  height: 20px; */
}

/* .calendar-dates li::before {
  position: absolute;
  content: "";
  z-index: -1;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
} */

/* .calendar-dates li.active::before {
  background: #69d8cd;
} */

.calendar-dates li:not(.active):hover::before {
  background: #69d8cd;
}

.card {
  width: 100%; /* Set a fixed width for the card */
}

.card-img-top {
  object-fit: cover; /* Ensure the image covers the entire card without stretching */
  height: 200px; /* Set a fixed height for the image */
}

.card-text {
  height: 50px;
}
</style>
