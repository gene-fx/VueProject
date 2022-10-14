<template>
  <div id="app">
    <AlunosItem />
  </div>
</template>

<script>
import AlunosItem from "./components/aluno/AlunosItem.vue";

export default {
  name: "App",
  components: {
    AlunosItem,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

/* ------------- global BODY styling */
body {
  font-family: "Montserrat", sans-serif;
  background-color: rgb(44, 44, 44);
  color: white;
  display: grid;
  text-align: center;
  justify-items: center;
}

body,
html {
  margin: 0;
  height: 100%;
}

.header {
  overflow: hidden;
  position: fixed;
  top: 0;
  background-color: rgb(44, 44, 44);
  width: 100%;
  height: 100px;
}

.content{
  margin-top: 110px;
  overflow: auto;
}
/* ------------- END global BODY styling */

/* ------------- global table styling */
thead,
tfoot {
  padding: 20px;
  font-size: 1.3em;
  background-color: black;
}

tbody tr:nth-child(odd) {
  background-color: rgb(44, 44, 44);
  padding: 20px;
  font-size: 0.9em;
  text-align: center;
  justify-content: center;
}

tbody tr:nth-child(even) {
  background-color: rgb(63, 63, 63);
  padding: 20px;
  font-size: 0.9em;
  text-align: center;
  justify-content: center;
}

table {
  table-layout: fixed;
  width: 80%;
  border-collapse: collapse;
  margin: 5px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  justify-content: center;
}
/* -------------END - global table styling */

/* ------------- global BTN styling */
.btn {
  background-color: rgb(44, 44, 44);
  border: none;
  color: white;
  cursor: pointer;
  /* border-bottom: 5px solid black; */
  border: 1px solid rgb(44, 44, 44);
  border-radius: 5px;
  padding: 1px 1px;
  margin: 5px;
}

.btn:hover {
  text-shadow: 1px 1px 1px black;
  border: 1px solid white;
}

.btn_edit {
  background-color: rgb(0, 140, 255);
}

.btn_danger {
  border: 1px solid red;
}

.btn_danger:hover {
  background-color: red;
}
/* -------------END - global BTN styling */

/* -------------global break points */
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  /* -------------extra small global BODY styling */

  /* -------------END extra small global BODY styling */

  /* ------------- extra small table styling */
  table {
    width: 90%;
  }

  thead,
  tfoot {
    font-size: 0.9em;
    padding: 0;
  }
  /* -------------END extra small table styling */
}

/* Medium devices (landscape tablets, 768px and down) */
@media only screen and (max-width: 768px) {
  /* ------------- extra small table styling */
  table {
    width: 90%;
  }

  thead,
  tfoot {
    font-size: 0.9em;
    padding: 0;
  }
  /* -------------END extra small table styling */

  /* -------------extra small BTN styling */
  .btn_danger {
    padding: 0 !important;
    background-color: red;
  }

  .btn_edit {
    padding: 0 !important;
  }
  /* -------------END extra small BTN styling */
}

/* Medium devices (landscape tablets, 768px and down) */
@media only screen and (max-width: 768px) {
  /* -------------extra small BTN styling */
  .btn_danger {
    padding: 0 !important;
    background-color: red;
    margin: 4px;
  }

  .btn_edit {
    padding: 0 !important;
    margin: 4px;
  }
  /* -------------END extra small BTN styling */
}

/* Large devices (laptops/desktops, 992px and down) */
@media only screen and (max-width: 992px) {
  /* -------------extra small BTN styling */
  .btn_danger {
    padding: 0 !important;
    background-color: red;
    margin: 2px;
  }

  .btn_edit {
    padding: 0 !important;
    margin: 2px;
  }
  /* -------------END extra small BTN styling */
}
/* -------------END global break points */
#app {
}
</style>
