import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-hot-toast";
import axios from "axios";

const Settings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phone, setPhone] = useState(seller && seller.phone);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  console.log(seller);

  const handleImage = async(e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData()

    formData.append("image" , e.target.files[0])

    await axios.put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true
    }).then((res) => {
        dispatch(loadSeller())
        toast.success("Avatar updated successfully")
    }).catch((error) => {
        toast.error(error.response.data.message)
    })
  };

  const updateHandler = async(e) => {
    e.preventDefault()

    await axios.put(`${server}/shop/update-shop-info`, {
        name,
        description,
        address,
        phone,
        zipCode
    }, { withCredentials: true }).then((res) => {
        dispatch(loadSeller())
        toast.success("Shop info updated successfully!!")
    }).catch((error) => {
        toast.error(error.response.data.message)
    })
  };

  const dispatch = useDispatch();
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar ? URL.createObjectURL(avatar) : `${backend_url}/${seller.avatar}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className={`w-[250px] h-[40px] font-Poppins text-center 
              border border-[#362a90fb] text-[#362a90fb] rounded-[3px] mt-5 cursor-pointer hover:bg-[#362a90fb] 
              hover:text-white transition-all duration-300`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
