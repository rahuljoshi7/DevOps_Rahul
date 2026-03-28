export const homeState = {
  categoryListDropdown: false,
  filterListDropdown: false,
  searchDropdown: false,
  products: null,
  allProducts: null,
  loading: false,
  sliderImages: [],
  sort: "default",
  page: 1,
  perPage: 8,
  toast: null,
};

export const homeReducer = (state, action) => {
  switch (action.type) {
    case "categoryListDropdown":
      return {
        ...state,
        categoryListDropdown: action.payload,
        filterListDropdown: false,
        searchDropdown: false,
      };
    case "filterListDropdown":
      return {
        ...state,
        categoryListDropdown: false,
        filterListDropdown: action.payload,
        searchDropdown: false,
      };
    case "searchDropdown":
      return {
        ...state,
        categoryListDropdown: false,
        filterListDropdown: false,
        searchDropdown: action.payload,
      };
    case "setProducts":
      return {
        ...state,
        products: action.payload,
        allProducts: state.allProducts || action.payload,
      };
    case "setAllProducts":
      return { ...state, allProducts: action.payload };
    case "setSort":
      return { ...state, sort: action.payload, page: 1 };
    case "setPage":
      return { ...state, page: action.payload };
    case "setToast":
      return { ...state, toast: action.payload };
    case "searchHandleInReducer":
      return {
        ...state,
        products:
          action.productArray &&
          action.productArray.filter((item) => {
            if (
              item.pName.toUpperCase().indexOf(action.payload.toUpperCase()) !==
              -1
            ) {
              return item;
            }
            return null;
          }),
      };
    case "loading":
      return { ...state, loading: action.payload };
    case "sliderImages":
      return {
        ...state,
        sliderImages: action.payload,
      };
    default:
      return state;
  }
};
