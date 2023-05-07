<template>
  <div @focusin.stop>
    <tinymce
      no-enforce-focus
      id="1"
      ref="editorRef"
      v-model="content"
      @editorInit="inisialisasi"
      @editorChange="changeText()"
      :other_options="options"
    ></tinymce>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "@/const";
export default {
  data() {
    return {
      content: "",
      options: {
        language_url: window.location.origin + "/langs/id.js",
        menubar: "",
        height: "250",
        plugins: [
          "image",
          "media",
          "paste",
          "autolink",
          "visualblocks",
          "visualchars",
          "fullscreen",
          "link",
          "codesample",
          "charmap",
          "advlist",
          "lists",
          "wordcount",
          "imagetools",
          "charmap",
          "table"
        ],
        toolbar1:
          " bold italic underline | fontsizeselect | table | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor  | insertfile image media link  code",
        file_picker_types: "image",
        images_upload_handler: function(blobInfo, success, failure) {
          let data = new FormData();
          data.append("file", blobInfo.blob(), blobInfo.filename());
          axios
            .post(`${API}/upload`, data)
            .then(function(res) {
              success(res.data.url);
            })
            .catch(function(err) {
              failure("HTTP Error: " + err.message);
            });
        }
      }
    };
  },
  methods: {
    inisialisasi() {
      this.content = this.textData;
      //        window.tinymce.editors["content"].setContent(this.textData);
      //       window.tinymce.editors["content"].getBody().focus();
      // console.log(this.$refs);
      //       const focusable = this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      //         focusable.length && focusable[0].focus()

      //       document.getElementById("content").addEventListener("onfocusin", console.log("fucssed"));
      //       // tinymce.activeEditor.fire("focus");

      // this.$el.querySelector(".mce-tinymce").addEventListener('focusin', e =>{ e.stopImmediatePropagation();console.log('event',e)});

      // const element = this.$el.querySelector(".mce-tinymce");
      // let _this=this;
      // if (element)
      //   this.$nextTick(() => {
      //     element.focus();
      // element.stopImmediatePropagation();
      // });
    },
    changeText() {
      this.$emit("getContent", this.content, this.$refs.editorRef.editor);
    }
  },
  props: {
    textData: {
      type: String,
      default: ""
    }
  }
};
</script>

<style></style>
