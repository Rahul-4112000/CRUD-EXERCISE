import { IformField } from './utility_interface';

function FormField({ fillData, idName, labelName, inputType, inputValue, errorName }: IformField) {
  return (
    <>
      <label htmlFor={idName} className='block text-gray-700 text-sm font-semibold mb-2'>
        {labelName}
      </label>
      <input
        id={idName}
        onChange={fillData}
        type={inputType}
        value={inputValue}
        className='outline-none w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-200'
      />
      {errorName && <p className='text-gray-600 text-sm mb-4'>{errorName}</p>}
    </>
  );
}

export default FormField;
