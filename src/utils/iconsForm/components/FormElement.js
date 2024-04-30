export default ({ type, label, placeholder, fieldRef, hasError }) => {
  const classes =
    "form-control w-full px-3 py-1.5 text-gray-700 rounded border-solid border-gray-300 focus:border-gray-900 focus:outline-none";

  return (
    <div className='form-group mb-6'>
      <label className='block text-gray-700 text-sm font-bold mb-2'>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={label}
          {...fieldRef}
          placeholder={placeholder}
          className={`mt-1 p-3 block w-full border rounded-md shadow-sm  active:border-gray-900 h-40 ${
            hasError ? "border-red-600" : "border-gray-300"
          }`}
        />
      ) : (
        <input
          type={type}
          className={classes}
          placeholder={placeholder}
          {...fieldRef}
          required
        />
      )}
      {hasError && (
        <p className='text-red-500 text-xs italic'>{`${label} is required`}</p>
      )}
    </div>
  );
};
