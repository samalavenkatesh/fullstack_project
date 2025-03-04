import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { HiOutlineUser, HiOutlineMail, HiOutlineChat } from "react-icons/hi";

const Contacts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://getform.io/f/ajjegnla", userInfo);
      toast.success("Your message has been sent!");
    } catch (error) {
      console.log(error);
      toast.error("There was an error sending your message.");
    }
  };

  return (
    <div name="Contact" className="max-w-screen-2xl container mt-16 mx-auto">
      {/* <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-400">Contact Us</h1> */}


      <section className="relative bg-gradient-to-l from-[#977DFE] to-[#6878FF] h-40 text-white flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-4xl font-extrabold mb-4 mt-10">Contact Us</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
        Please fill out the form below to reach us for any help or report any bugs.
        </p>
      {/* Notice Bar */}
      {/* <div className="w-full bg-gray-200 p-2 text-center rounded-lg mb-8 shadow-lg">
        <marquee direction="left" behavior="scroll" className="text-gray-700">
          Please fill out the form below to reach us for any help or report any bugs.
        </marquee>
      </div> */}
      </section>


      {/* Contact Form */}
      <div className="flex flex-col justify-center items-center m-5 mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg border border-gray-100"
        >
          <h2 className=" text-2xl font-semibold text-center mb-6 text-[#977DFE] to-[#6878FF]">Send Your Message</h2>

          {/* Full Name */}
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="name" className="text-lg text-gray-700 flex items-center">
              <HiOutlineUser className="mr-2 text-gray-500" size={20} />
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="name"
              className="shadow-md rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6878FF] border border-gray-300 w-full"
              placeholder="Enter your full name"
            />
            {errors.name && <span className="text-red-500 text-sm absolute top-full mt-1">This field is required</span>}
          </div>

          {/* Email Address */}
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="email" className="text-lg text-gray-700 flex items-center">
              <HiOutlineMail className="mr-2 text-gray-500" size={20} />
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              id="email"
              className="shadow-md rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6878FF] border border-gray-300 w-full"
              placeholder="Enter your email address"
            />
            {errors.email && <span className="text-red-500 text-sm absolute top-full mt-1">This field is required</span>}
          </div>

          {/* Message */}
          <div className="flex flex-col mb-6 relative">
            <label htmlFor="message" className="text-lg text-gray-700 flex items-center">
              <HiOutlineChat className="mr-2 text-gray-500" size={20} />
              Message
            </label>
            <textarea
              {...register("message", { required: true })}
              id="message"
              className="shadow-md rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6878FF] border border-gray-300 w-full"
              placeholder="Enter your message"
              rows="4"
            />
            {errors.message && <span className="text-red-500 text-sm absolute top-full mt-1">This field is required</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" bg-gradient-to-l from-[#977DFE] to-[#6878FF] text-white py-3 px-6 rounded-lg text-lg w-full hover:bg-yellow-600 transition duration-300 shadow-md"
            >
              {/* className="bg-yellow-500 text-white py-3 px-6 rounded-lg text-lg w-full hover:bg-yellow-600 transition duration-300 shadow-md" */}
            Send Message
          </button>
        </form>
      </div>

      {/* Optional Success/Error Message */}
      <div className="mt-6 text-center text-gray-700">
        <p className='mb-10'>If you prefer, you can reach us at <strong>support@farmmart.com</strong></p>
      </div>
    </div>
  );
};

export default Contacts;
