interface IformField {
  fillData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  idName: string;
  labelName: string;
  inputType: string;
  inputValue: string;
  errorName: string;
}

export { IformField };
