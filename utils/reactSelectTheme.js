export const colors = {
  primary: "#ceb896",
  primary75: "#DACAB0",
  primary50: "#E7DCCB",
  primary25: "#F3EDE5",
};

export const customTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    ...colors,
  },
  spacing: {
    ...theme.spacing,
    controlHeight: 48,
  }
});


export const customStyles = {
  option: (provided, state) => ({
    ...provided,
  }),
  control: (provided, state) => ({
    ...provided
  }),
  singleValue: (provided, state) => {
    return { ...provided};
  }
}

