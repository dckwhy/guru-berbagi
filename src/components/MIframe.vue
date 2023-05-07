<template>
    <div class="vue-friendly-iframe" style="width:100%;height:98%">
    </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      iframeEl: null,
      iframeLoadedMessage : 'data-loaded',
    };
  },
  computed: {},
  watch: {
    src() {
      this.reinitIframe(this);
    }
  },
  methods: {
    removeIframe() {
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      }
    },
    setIframeUrl() {
      const iframeDoc = this.iframeEl.contentWindow.document;
      iframeDoc
        .open()
        .write(
          `<body onload="window.location.href='${
            this.src
          }'; parent.postMessage('${this.iframeLoadedMessage}', '*')"></body>`
        );
      iframeDoc.close(); //iframe onload event happens
    },
    reinitIframe(){
        this.$nextTick(()=>{
            this.removeIframe();
            this.initIframe();
        })
    },

    initIframe() {
      this.iframeEl = document.createElement("iframe");
    //   this.iframeEl.setAttribute("crossorigin", "anonymous");
      this.iframeEl.setAttribute("scrolling", "yes");
      this.iframeEl.setAttribute("target", "_parent");
      this.iframeEl.setAttribute(
        "style",
        // "visibility: hidden; position: absolute; top: -99999px"
        " overflow-y:scroll !important;border:none;width: 100%; height:100%"
      );
      if (this.className) this.iframeEl.setAttribute("class", this.className);
      this.$el.appendChild(this.iframeEl);
      this.setIframeUrl();
    },
    listenForEvents() {
      // Create IE + others compatible event handler
      const eventMethod = window.addEventListener
        ? "addEventListener"
        : "attachEvent";
      const eventer = window[eventMethod];
      const messageEvent =
        eventMethod === "attachEvent" ? "onmessage" : "message";
      // Listen to message from child window
      eventer(
        messageEvent,
        event => {
          if (event.data === this.iframeLoadedMessage) {
            this.$emit("load");
            this.iframeEl.setAttribute("style", "visibility: visible;");
          }
        },
        false
      );
    }
  },
  mounted() {
    this.listenForEvents();
    this.initIframe();
  }
};
</script>
