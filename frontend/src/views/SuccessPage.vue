<template>
  <div class="card success-card">
    <!-- tick animation -->
    <div class="swal-icon swal-icon--success">
      <span class="swal-icon--success__line swal-icon--success__line--long"></span>
      <span class="swal-icon--success__line swal-icon--success__line--tip"></span>
      <div class="swal-icon--success__ring"></div>
      <div class="swal-icon--success__hide-corners"></div>
    </div>
    <!-- card body -->
    <div class="card-body">
      <h5 class="card-title">Donation received!</h5>
      <p class="card-text">Thank you for your donation! <br />A little goes a long way :)</p>
      <div class="btn-container">
        <button @click="this.$router.replace({ name: 'myevents' })" class="btn btn-primary">
          Return to Event Page
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase_firestore } from "../firebase"
import { doc, updateDoc, getDoc } from "firebase/firestore"

export default {
  data() {
    return {}
  },
  methods: {
    /**
     * Updates firestore of successful donation
     */
    async updateFirestore() {
      // Get donation detials
      const eventid = this.$cookies.get("wadt1_donate_eventid")
      const userid = this.$cookies.get("wadt1_donate_userid")
      const amount = this.$cookies.get("wadt1_donate_amt")
      // console.log(userid, eventid, amount)
      if (!userid || !eventid || !amount) {
        return
      }
      // remove cookies
      this.$cookies.remove("wadt1_donate_eventid")
      this.$cookies.remove("wadt1_donate_userid")
      this.$cookies.remove("wadt1_donate_amt")

      // Get existing data from Firestore
      const eventRef = doc(firebase_firestore, "events", eventid)
      const eventSnap = await getDoc(eventRef)
      if (eventSnap.exists()) {
        // console.log("Document data:", eventSnap.data())
        let eventData = eventSnap.data()

        // Update firestore
        await updateDoc(eventRef, {
          donations: [...eventData.donations, { userid, amount: parseInt(amount) }],
        })
      } else {
        console.log("No such document!")
        return
      }
    },
  },
  mounted() {
    this.updateFirestore()
  },
}
</script>

<style scoped>
.success-card {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  top: 10rem;
  width: 25rem;
}
.card-title,
.card-text {
  text-align: center;
}
.btn-container {
  display: grid;
  grid-template-columns: 15rem;
  justify-content: center;
}

/* success animation */
.swal-icon--success {
  border-color: #a5dc86;
}

.swal-icon--success:after,
.swal-icon--success:before {
  content: "";
  border-radius: 50%;
  position: absolute;
  width: 60px;
  height: 120px;
  background: #fff;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.swal-icon--success:before {
  border-radius: 120px 0 0 120px;
  top: -7px;
  left: -33px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 60px 60px;
  transform-origin: 60px 60px;
}

.swal-icon--success:after {
  border-radius: 0 120px 120px 0;
  top: -11px;
  left: 30px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 0 60px;
  transform-origin: 0 60px;
  -webkit-animation: rotatePlaceholder 4.25s ease-in;
  animation: rotatePlaceholder 4.25s ease-in;
}

.swal-icon--success__ring {
  width: 80px;
  height: 80px;
  border: 4px solid hsla(98, 55%, 69%, 0.2);
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  left: -4px;
  top: -4px;
  z-index: 2;
}

.swal-icon--success__hide-corners {
  width: 5px;
  height: 90px;
  background-color: #fff;
  padding: 1px;
  position: absolute;
  left: 28px;
  top: 8px;
  z-index: 1;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.swal-icon--success__line {
  height: 5px;
  background-color: #a5dc86;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 2;
}

.swal-icon--success__line--tip {
  width: 25px;
  left: 14px;
  top: 46px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: animateSuccessTip 0.75s;
  animation: animateSuccessTip 0.75s;
}

.swal-icon--success__line--long {
  width: 47px;
  right: 8px;
  top: 38px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: animateSuccessLong 0.75s;
  animation: animateSuccessLong 0.75s;
}

.swal-icon {
  width: 80px;
  height: 80px;
  border-width: 4px;
  border-style: solid;
  border-radius: 50%;
  padding: 0;
  position: relative;
  box-sizing: content-box;
  margin: 20px auto;
}

.swal-icon:first-child {
  margin-top: 32px;
}

@keyframes animateSuccessLong {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0;
    top: 35px;
  }
  to {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}

@keyframes rotatePlaceholder {
  0% {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  5% {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  12% {
    -webkit-transform: rotate(-405deg);
    transform: rotate(-405deg);
  }
  to {
    -webkit-transform: rotate(-405deg);
    transform: rotate(-405deg);
  }
}

@keyframes animateSuccessTip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  to {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

/* create by styling */
.creditos {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddd;
}

.logo-sweetalert {
  background: url(https://sweetalert.js.org/assets/images/logo.svg) center no-repeat;
  background-size: contain;
  width: 70px;
  height: 40px;
  margin-left: 0.5em;
  color: transparent;
}
</style>
