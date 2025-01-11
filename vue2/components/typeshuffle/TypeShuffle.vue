<template>
    <div class="text-container">
      <pre v-for="(line, index) in shuffledText" :key="index" class="text-line">
        {{ line }}
      </pre>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        text: [
          "NAME         ARIA MCDONALD",
          "PROFESSION   CREATIVE WEB DEVELOPER",
          "BIO          5 YEARS EXPERIENCE - HTML, CSS, JAVASCRIPT. PASSION",
          "             FOR CREATIVITY IN THE DIGITAL SPACE. PROBLEM SOLVER.",
          "             HIKER, GUITAR PLAYER, CULINARY ENTHUSIAST. CONSTANTLY",
          "             SEEKING NEW CHALLENGES, GROWTH OPPORTUNITIES.BRINGING",
          "             IMAGINATIVE IDEAS TO LIFE. SKILLED IN MODERN WEB",
          "             DEVELOPMENT FRAMEWORKS SUCH AS REACT AND ANGULAR.",
          "             STRONG UNDERSTANDING OF UI/UX DESIGN PRINCIPLES AND",
          "             ABILITY TO CREATE VISUALLY APPEALING AND USABLE",
          "             WEBSITES.",
          "PROJECTS     ECO EXPLORER, SKYBRIDGE, SPARKSAIL",
          "AWARDS       BEST USER EXPERIENCE DESIGN, WEBBY AWARDS 2021",
        ],
        shuffledText: [],
      };
    },
    mounted() {
      this.shuffleText();
    },
    methods: {
      shuffleText() {
        let steps = 20; // Number of shuffle steps
        this.shuffledText = this.text.map((line) =>
          line.replace(/./g, () => this.randomChar())
        );
  
        let interval = setInterval(() => {
          if (steps > 0) {
            this.shuffledText = this.shuffledText.map((line, i) =>
              line.split("").map((char, j) =>
                Math.random() > 0.5 ? this.randomChar() : this.text[i][j]
              ).join("")
            );
            steps--;
          } else {
            clearInterval(interval);
            this.shuffledText = [...this.text]; // Show final text
          }
        }, 100); // Adjust speed here
      },
      randomChar() {
        const chars = "!@#$%^&*()_+{}[]<>?,./|ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return chars[Math.floor(Math.random() * chars.length)];
      },
    },
  };
  </script>
  
  <style>
  .text-container {
    font-family: "Courier New", monospace;
    font-size: 16px;
    color: #ffffff;
    background-color: #000000;
    padding: 20px;
    line-height: 1.6;
  }
  .text-line {
    white-space: pre;
  }
  </style>
  