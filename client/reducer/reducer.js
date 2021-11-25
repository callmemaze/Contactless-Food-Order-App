export default (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const exist = state.some((item) => item.id === action.payload.id);
      if (exist) {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...state, action.payload];
      }

    default:
      return state;
  }
};
