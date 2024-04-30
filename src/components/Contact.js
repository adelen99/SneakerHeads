import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import IconEmail from "../utils/iconsForm/IconEmail";
import IconInfo from "../utils/iconsForm/components/IconInfo";
import IconPhone from "../utils/iconsForm/IconPhone";
import FormElement from "../utils/iconsForm/components/FormElement";
import Footer from "../components/Footer";
const Contact = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <div className='xl:container mx-auto mb-32 '>
      <div
        className='flex justify-center background2'
        style={{
          height: "250px",
        }}></div>
      <div className='px-4 sm:w-2/3 lg:w-1/2 mx-auto'>
        <div className='rounded-lg shadow-lg bg-white -mt-24 py-10 md:py-12 px-4 md:px-6'>
          <div className='grid grid-cols-2 gap-x-6 mb-12 mx-auto'>
            <IconInfo icon={<IconEmail />} text='sneakerheads@gmail.com' />
            <IconInfo icon={<IconPhone />} text='+40 755 555 555' />
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormElement
                    type='text'
                    label='Name'
                    placeholder='Enter name here...'
                    fieldRef={field}
                    hasError={errors.name?.type === "required"}
                  />
                )}
              />
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormElement
                    type='email'
                    label='Email'
                    placeholder='Enter email here...'
                    fieldRef={field}
                    hasError={errors.email?.type === "required"}
                  />
                )}
              />
              <Controller
                name='message'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormElement
                    type='textarea'
                    label='Message'
                    placeholder='Enter message here...'
                    fieldRef={field}
                    hasError={errors.name?.type === "required"}
                  />
                )}
              />
              <button
                type='submit'
                className='w-full px-6 py-3 bg-red-600 text-white font-medium uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:outline-none focus:ring-0 active:bg-pink-800'>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
