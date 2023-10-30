<template>
  
  <div class="content">
    <div class="row">
      <h1 class="mb-5">Donations</h1>
      <table class="table table-light">
        <thead>
          <tr>
            <th scope="col">Events</th>
            <th scope="col">Budget</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plant a Tree</td>
            <td>$14,000</td>
            <td scope="col">
              <p>In Progress</p>
              <div
                class="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div class="progress-bar" style="width: 50%"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.active {
  background-color: #44baae !important;
}

.row {
  margin-top: 1rem;
}
</style>
