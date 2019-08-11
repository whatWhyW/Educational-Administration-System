<template>
  <div class="upload-box">
    <div class="upload-row" v-for="(i, idx) in files" v-if="files.length > 0" :key="idx">
      <input type="text" disabled v-model="i.text">
      <input type="file" :id="`upIpt${idx}`" hidden @change="handleFileChange">
      <label :for="`upIpt${idx}`">上传文件</label>
      <span class="btn" v-if="idx === 0" @click="add(idx)">&#43;</span>
      <span class="btn" v-else @click="minus(idx)">&minus;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload',
  props: {
    files: {
      default: () => {
        return [{text: ''}]
      },
      type: Array
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    handleFileChange (e) {
      // console.log('file change!')

      let formData = new FormData()
      let idx = parseInt(e.target.getAttribute('id').substr(5))
      let file = e.target.files[0]

      if (file === undefined) {
        this.files[idx].text = ''
        return
      }

      // 将文件转二进制
      formData.append('file', file)
      this.axios({
        method: 'POST',
        url: 'http://localhost:3000/upload/file',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log('OK!\n', res)
        this.files[idx].text = file.name
      }).catch((res) => console.log('catch!\n', res))
    },
    add () {
      this.files.push({text: ''})
    },
    minus (idx) {
      this.files.splice(idx, 1)
    }
  },
  watch: {
    files: {
      handler: function (n, o) {
        this.$emit('changeFile', n)
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .upload-row {
    overflow: hidden;
    margin-top: 5px;
  }
  .upload-row:first-child {
    margin-top: 0;
  }
  .upload-row input[type=text] {
    display: inline-block;
    height: 32px;
    border-radius: 5px;
    border: 1px solid #e4e7ed;
    font-size: 14px;
    text-indent: 5px;
  }
  .upload-row input[type=text]:hover {
    cursor: not-allowed;
  }
  .upload-row label {
    vertical-align: middle;
    border-radius: 5px;
    border: 1px solid #b3d8ff;
    padding: 8px 20px;
    font-size: 14px;
    background-color: #ecf5ff;
    color: #409eff;
    display: inline-block;
  }
  .upload-row label:hover {
    cursor: pointer;
  }
  .upload-row .btn {
    display: inline-block;
    width: 35px;
    height: 35px;
    vertical-align: middle;
    background: #fef0f0;
    background-size: 32px 32px;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    line-height: 37px
  }
  .upload-row .btn:hover {
    cursor: pointer;
  }
</style>
