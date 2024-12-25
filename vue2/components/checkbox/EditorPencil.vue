<template>
    <div class="editor">
      <h1>Image Editor with different pencil size and colors</h1>
      <div class="input-container">
        <input type="file" @change="loadImage" />
      </div>
  
      <div class="canvas-container">
        <canvas ref="canvas" width="600" height="400"></canvas>
      </div>
  
      <!-- Pencil color and size controls -->
      <div class="controls">
        <div class="color-picker-container">
          <label for="color">Color:</label>
          <input type="color" id="color" v-model="pencilColor" />
        </div>
  
        <div class="size-controls">
          <span class="size-label">Size:</span>
          <div class="size-buttons">
            <button @click="setPencilSize(2)" :class="{'active': pencilSize === 2}">2px</button>
            <button @click="setPencilSize(5)" :class="{'active': pencilSize === 5}">5px</button>
            <button @click="setPencilSize(8)" :class="{'active': pencilSize === 8}">8px</button>
            <button @click="setPencilSize(12)" :class="{'active': pencilSize === 12}">12px</button>
            <button @click="setPencilSize(16)" :class="{'active': pencilSize === 16}">16px</button>
          </div>
        </div>
      </div>
      <div class="export-container">
        <button @click="exportImage" class="export-button">Export Image</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        canvas: null,
        ctx: null,
        pencilColor: '#000000', // Default pencil color
        pencilSize: 5, // Default pencil size
        isDrawing: false, // Track if the user is drawing
        lastX: 0, // Last position for drawing
        lastY: 0, // Last position for drawing
      };
    },
    mounted() {
      // Get the canvas and its context
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
  
      // Set up the canvas context
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
      this.ctx.lineWidth = this.pencilSize;
      this.ctx.strokeStyle = this.pencilColor;
  
      // Event listeners for drawing
      this.canvas.addEventListener('mousedown', this.startDrawing);
      this.canvas.addEventListener('mousemove', this.draw);
      this.canvas.addEventListener('mouseup', this.stopDrawing);
      this.canvas.addEventListener('mouseout', this.stopDrawing);
    },
    methods: {
      // Start drawing when mouse is pressed
      startDrawing(event) {
        this.isDrawing = true;
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;
      },
      // Draw on the canvas when mouse moves
      draw(event) {
        if (!this.isDrawing) return;
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(event.offsetX, event.offsetY);
        this.ctx.stroke();
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;
      },
      // Stop drawing when mouse is released or leaves the canvas
      stopDrawing() {
        this.isDrawing = false;
      },
      // Load an image onto the canvas
      loadImage(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            // Clear the canvas and draw the image
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
          };
          img.src = reader.result;
        };
  
        reader.readAsDataURL(file);
      },
      // Set pencil size
      setPencilSize(size) {
        this.pencilSize = size;
        this.ctx.lineWidth = size;
      },
      // Export the canvas as an image
      exportImage() {
        const dataURL = this.canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'your_image.png';
        link.click();
      },
    },
    watch: {
      // Watch for changes in pencil color
      pencilColor(newColor) {
        this.ctx.strokeStyle = newColor;
      },
    },
  };
  </script>
  
  <style scoped>
  .editor {
    font-family: 'Arial', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 70%;
    margin: 30px auto;
  }
  
  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .input-container {
    margin-bottom: 20px;
  }
  
  input[type="file"] {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  input[type="file"]:hover {
    background-color: #0056b3;
  }
  
  .canvas-container {
    border: 2px solid #ccc;
    background-color: #fff;
    margin-bottom: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
    align-items: center;
  }
  
  .color-picker-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  label {
    font-size: 16px;
    color: #555;
  }
  
  input[type="color"] {
    margin-top: 5px;
  }
  
  .size-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .size-buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .size-buttons button {
    background-color: #f0f0f0;
    border: 2px solid #ccc;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  .size-buttons button.active {
    background-color: #007bff;
    color: white;
  }
  
  .size-buttons button:hover {
    background-color: #e0e0e0;
  }
  
  .export-container {
    margin-top: 20px;
  }
  
  .export-button {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .export-button:hover {
    background-color: #218838;
  }
  </style>
  