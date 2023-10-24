<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  
    <div>
        <div class="container-fluid p-0">
        <div class="row m-0">
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white" style="width: 280px; background-color: #69D8cD;">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                <span class="fs-4">EcoConnect</span>
                </a>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link text-white"><span class="fa fa-line-chart pe-2"></span>Dashboard</router-link>
                    </li>
                    <li>
                        <router-link to="/addEvent" class="nav-link text-white active"><span class="fa fa-calendar pe-2"></span>Event</router-link>
                    </li>
                    <li>
                        <router-link to="/viewDonation" class="nav-link text-white"><span class="fa fa-dollar pe-2"></span>Donation</router-link>
                    </li>
                    <li>
                        <router-link to="/chat" class="nav-link text-white"><span class="fa fa-paper-plane pe-2"></span>Chat</router-link>
                    </li>
                </ul>
                <hr>
                <div class="dropdown">
                <ul class="nav nav-pills flex-column mb-auto">
                    <li><router-link to="/chat" class="nav-link text-white"><span class="fa fa-sign-out pe-2"></span>Log Out</router-link></li>
                </ul>
                </div>
            </div>
            <div class="col-md-9 my-3 ms-lg-5 ms-md-5 ms-sm-5" style="min-height: 100vh;">
                <a href="#" class="d-flex align-items-center text-dark text-decoration-none" style="position: absolute; right: 38px;">
                    <img src="https://cf.shopee.com.my/file/2668a8d450d82d38574d01f51694f714" alt="" width="50" height="50" class="rounded-circle me-2">
                    <strong>Takahashi</strong>
                </a>
                <div class="row">
                    <h1 class="mb-5">Create Event</h1>
                    <div class="col-lg-10 col-md-10 col-sm-10">
                        <label for="title" class="form-label">Event Title</label>
                        <input
                            type="text"
                            class="form-control"
                            id="title"
                            v-model="title"
                            placeholder="Enter Event Name"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-10 col-md-10 col-sm-10">
                        <label for="date" class="form-label">Date</label>
                        <input
                            type="date"
                            class="form-control"
                            id="date"
                            v-model="date"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <label for="startTime" class="form-label">Start Time</label>
                        <input
                            type="time"
                            class="form-control"
                            id="startTime"
                            v-model="startTime"
                        />
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <label for="endTime" class="form-label">End Time</label>
                        <input
                            type="time"
                            class="form-control"
                            id="endTime"
                            v-model="endTime"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-10 col-md-10 col-sm-10">
                        <label for="location" class="form-label">Location</label>
                        <input
                            type="text"
                            class="form-control"
                            id="location"
                            v-model="location"
                            placeholder="Enter Event Location"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-10 col-md-10 col-sm-10">
                        <label for="desc" class="form-label">Event Description</label>
                        <textarea
                            type="text"
                            class="form-control"
                            id="desc"
                            v-model="desc"
                            placeholder="Enter Event Description"
                        ></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <label for="suitability" class="form-label">Suitability</label>
                        <select class="form-select" aria-label="Default select example" id="suitability" v-model="suitability">
                            <option selected value="First Timers">First Timers</option>
                            <option value="Seniors">Seniors</option>
                            <option value="Family Friendly">Family Friendly</option>
                            <option value="Open to All">Open to All</option>
                            <option value="Organisations">Organisations</option>
                            <option value="Group">Group</option>
                        </select>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <label for="category" class="form-label">Category</label>
                        <select class="form-select" aria-label="Default select example" id="category" v-model="category">
                            <option selected value="Tree Planting">Tree Planting</option>
                            <option value="Beach Cleanups">Beach Cleanups</option>
                            <option value="Community Composting">Community Composting</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <label for="openings" class="form-label">Number of Openings</label>
                        <input
                            type="number"
                            class="form-control"
                            id="openings"
                            v-model="openings"
                            min="0"
                        />
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 mt-4">
                        <input type="file" accept="image/*" id="filename" name="filename" @change="handleFileSelect">
                        <!-- <label id="filename-label" for="filename">Insert Image</label> -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <label for="donation" class="form-label">Ask for Donation</label>
                        <select class="form-select" aria-label="Default select example" id="donation" v-model="selectedDonation">
                            <option selected :value="true">Yes</option>
                            <option :value="false">No</option>
                        </select>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <label for="budget" class="form-label">Budget</label>
                        <input
                            type="number"
                            class="form-control"
                            id="budget"
                            v-model="budget"
                            min="1"
                            placeholder="Enter the Budget"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-10 col-md-10 col-sm-10">
                        <button type="submit" class="btn btn-primary w-100" @click="uploadFileAndCreateEvent">Create Event</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  </template>
  
  <script>
  import { getFirestore, collection, addDoc } from "firebase/firestore"
  import { firebase_firestore, firebase_storage } from "../firebase"; // Replace with the correct import path
  import { ref, uploadBytes } from "firebase/storage"; // Replace with the correct import path

  export default {
    data() {
      return {
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        desc: "",
        suitability: "",
        category: "",
        openings: 0,
        selectedFileName: "",
        selectedDonation: false,
        budget: 0,
        signups: []
      }
    },
    methods: {
        handleFileSelect(event) {
            const fileInput = event.target;
            if (fileInput.files.length > 0) {
            this.selectedFile = fileInput.files[0];
            console.log("File selected:", this.selectedFile.name);
            } else {
            this.selectedFile = null;
            }
        },
        async createEvent(eventData) {
            try {
            // Add the event data to a Firebase collection (replace "events" with your desired collection name)
            const docRef = await addDoc(collection(firebase_firestore, "events"), eventData);
            // Reset the form fields after successful submission
            this.title = "";
            this.date = "";
            this.startTime = "";
            this.endTime = "";
            this.location = "";
            this.desc = "";
            this.suitability = "";
            this.category = "";
            this.openings = 0;
            this.selectedDonation = "Yes";
            this.budget = 0;
            this.signups = [];
            console.log("Document written with ID: ", docRef.id);
            } catch (error) {
            console.error("Error adding document: ", error);
            // Handle error (e.g., display an error message to the user)
            }
        },
        async uploadFileAndCreateEvent() {
            // Check if a file has been selected
            if (this.selectedFile) {
                // Generate a unique filename (you can use a library for this or just create your own logic)
                const fileName = Date.now() + '_' + this.selectedFile.name;

                const storageRef = ref(firebase_storage, 'posts/' + fileName);

                try {
                // Upload the file to Firebase Storage
                await uploadBytes(storageRef, this.selectedFile);

                // The image has been successfully uploaded
                console.log('Image uploaded:', fileName);

                // Prepare the event data from the form inputs
                const eventData = {
                    title: this.title,
                    date: this.date,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    location: this.location,
                    desc: this.desc,
                    suitability: this.suitability,
                    category: this.category,
                    openings: this.openings,
                    selectedDonation: this.selectedDonation,
                    budget: this.budget,
                    imageUrl: fileName, // Add the image filename to event data
                    signups: this.signups
                };

                // Create the event with the image filename
                await this.createEvent(eventData);

                // The file and event have been successfully uploaded and created
                alert("Event Created Successfully!")
                console.log("File and event created.");
                } catch (error) {
                console.error("Error uploading file or creating event: ", error);
                // Handle the error (e.g., display an error message to the user)
                }
            } else {
                // Handle the case when no file is selected
                // You can display an error message or prevent event creation
                console.error("No file selected.");
            }
        },
    },
  }
  </script>
  
  <style scoped>
    body {
        padding: 0;
        margin: 0;
        background-color: white;
    }
  
    input[type="text"], input[type="date"], input[type="time"], input[type="number"], .form-select, #desc{
        background-color: white;
    }
  
    .active {
        background-color: #44BAAE !important;
    }
  
    .row {
        margin-bottom: 30px;
    }
  
    .btn-primary, .btn-primary:hover, .btn-primary:active, .btn-primary:visited {
        margin-top: 10px;
        background-color: #69D8cD;
        border-color: #69D8cD;
    }
  
    input[type="text"], input[type="date"], input[type="time"], input[type="number"], .form-select, #desc{
        background-color: white;
    }
  
    /* #filename {
        display: none;
    }
  
    #filename-label {
        border: 1px solid #69D8cD;
        width: 10%;
        background-color:#69D8cD;
        color: white;
        margin-left: 15px;
      } */
  </style>