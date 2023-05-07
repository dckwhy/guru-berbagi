export default {
  props: {
    items : {
      type: Array,
      default: [],
    },
  },
  methods:{
    edit(item){
      this.$emit('edit', item)
    },
    delete(item){
      this.$emit('delete', item)
    }
  }
}
