import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "../../styles/styles";
import { createProduct } from "../../redux/actions/product";
import { toast } from "react-hot-toast";
import { createEvent } from "../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate 
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

    // Min end date will be 3 days after the start date
    // eg if start date is 1-1-23 then end date will start
    // from 4-1-23   
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Event created successfully");
      navigate("/dashboard");
      window.location.reload(true);
    }
  }, [dispatch, error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate.toISOString());
    newForm.append("Finish_Date", endDate.toISOString());
    dispatch(createEvent(newForm));
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div className="w-[90%] 800px:w-[60%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>

      {/* Create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="name" className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
            autoComplete="off"
            placeholder="Enter your event product name..."
            required
          />
        </div>

        <br />
        <div>
          <label htmlFor="description" className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            rows="10"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 appearance-none block w-full px-3 pt-2  border border-gray-300 
           rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
            autoComplete="off"
            placeholder="Enter your event product description..."
            required
          ></textarea>
        </div>

        <br />
        <div>
          <label htmlFor="name" className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name=""
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i, index) => (
                <option value={i.title}>{i.title}</option>
              ))}
          </select>
        </div>

        <br />
        <div>
          <label htmlFor="tags" className="pb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
            autoComplete="off"
            placeholder="Enter your event product tags..."
          />
        </div>
        <br />

        <div>
          <label className="pb-2">
            Original Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
            autoComplete="off"
            placeholder="Enter your product price..."
            required
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
            autoComplete="off"
            placeholder="Enter your event product discount price..."
            required
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Product stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
            autoComplete="off"
            placeholder="Enter your event product stock..."
            required
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Product Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="start_Date"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            onChange={handleStartDateChange}
            min={today}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
            autoComplete="off"
            placeholder="Enter your event product stock..."
            required
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Product End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="end_Date"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            onChange={handleEndDateChange}
            min={minEndDate}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 
            rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 sm:text-sm"
            autoComplete="off"
            placeholder="Enter your event product stock..."
            required
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  className="h-[120px] w-[120px] object-cover m-2"
                  alt=""
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="create"
              className="w-full border font-Poppins border-[#362a90fb] h-[50px] my-4 flex 
              items-center justify-center cursor-pointer hover:bg-[#362a90fb] hover:text-white transition-all duration-300"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
