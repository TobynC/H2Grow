export default {
  methods: {
        toast(objectRef, propertyName, timeout){
          objectRef[propertyName] = true;

          setTimeout(() => {
            objectRef[propertyName] = false;
          }, timeout);
    }
  }
};
