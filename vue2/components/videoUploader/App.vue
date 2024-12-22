<template>
  <div class="upload-container">
    <h2 class="upload-heading">Upload Your Video</h2>
    
    <!-- File input -->
    <div class="file-input-container">
      <input
        type="file"
        id="fileInput"
        @change="onFileChange"
        accept="video/*"
        class="file-input"
      />
      <label for="fileInput" class="file-label">
        <span v-if="!selectedFile">Choose a video file</span>
        <span v-else>{{ selectedFile.name }}</span>
      </label>
    </div>

    <!-- Progress bar -->
    <div v-if="uploading" class="upload-progress">
      <div
        class="progress-bar"
        :style="{ width: uploadProgress + '%' }"
      ></div>
      <p>{{ uploadProgress }}% Uploaded</p>
    </div>

    <!-- Upload Button -->
    <button
      v-if="selectedFile"
      @click="uploadChunks"
      :disabled="uploading"
      class="upload-button"
    >
      {{ uploading ? 'Uploading...' : 'Start Upload' }}
    </button>

    <!-- Success message -->
    <div v-if="uploadComplete" class="success-message">
      <p>Upload completed successfully!</p>
    </div>

    <!-- Error message -->
    <div v-if="uploadError" class="error-message">
      <p>An error occurred during the upload. Please try again.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null,
      chunkSize: 5 * 1024 * 1024, // 5 MB
      totalChunks: 0,
      uploadProgress: 0,
      uploading: false,
      uploadComplete: false,
      uploadError: false,
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.totalChunks = Math.ceil(this.selectedFile.size / this.chunkSize);
      this.uploadProgress = 0;
      this.uploadComplete = false;
      this.uploadError = false;
    },
    async uploadChunks() {
      if (!this.selectedFile) return;

      this.uploading = true;
      this.uploadComplete = false;
      this.uploadError = false;

      const file = this.selectedFile;
      const totalChunks = this.totalChunks;

      for (let i = 0; i < totalChunks; i++) {
        const start = i * this.chunkSize;
        const end = Math.min(start + this.chunkSize, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("filename", file.name);  // Ensure the filename is added
        formData.append("chunkIndex", i);       // Ensure the chunkIndex is added

        try {
          await axios.post("http://localhost:3000/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          this.uploadProgress = Math.round(((i + 1) / totalChunks) * 100);
        } catch (error) {
          console.error(`Error uploading chunk ${i}:`, error);
          this.uploadError = true;
          this.uploading = false;
          return;
        }
      }

      this.uploading = false;
      this.uploadComplete = true;

      try {
        await axios.post("http://localhost:3000/combine", {
          filename: file.name,
          totalChunks,
        });
        alert("Video uploaded and processed successfully!");
      } catch (error) {
        this.uploadError = true;
        console.error("Error combining file:", error);
      }
    },
  },
};
</script>

<style scoped lang="less">
@primary-color: #00796b;
@button-hover-color: #004d40;
@progress-bar-color: #4caf50;
@background-color: #f0f4f4;

.upload-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  border: 2px solid @primary-color;
  border-radius: 8px;
  background-color: @background-color;
}

.upload-heading {
  font-size: 24px;
  font-weight: 600;
  color: @primary-color;
  margin-bottom: 20px;
}

.file-input-container {
  position: relative;
  margin-bottom: 20px;
}

.file-input {
  display: none;
}

.file-label {
  display: inline-block;
  padding: 12px 20px;
  background-color: @primary-color;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.file-label:hover {
  background-color: @button-hover-color;
}

.upload-progress {
  margin-top: 20px;
  background-color: #dcdcdc;
  border-radius: 5px;
  width: 100%;
  max-width: 100%;
  height: 20px;
  margin-bottom: 20px;
}

.progress-bar {
  height: 100%;
  background-color: @progress-bar-color;
  border-radius: 5px;
}

.upload-button {
  padding: 12px 25px;
  background-color: @primary-color;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
}

.upload-button:hover {
  background-color: @button-hover-color;
}

.success-message {
  color: @progress-bar-color;
  font-size: 18px;
  margin-top: 20px;
}

.error-message {
  color: #f44336;
  font-size: 18px;
  margin-top: 20px;
}
</style>
