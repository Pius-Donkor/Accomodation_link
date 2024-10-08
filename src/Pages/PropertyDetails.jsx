import { useNavigate, useParams } from "react-router-dom";
import useGetProperty from "../Features/properties/useGetProperty";
import PageError from "../UI/PageError";
import PropertyCarousel from "../UI/PropertyCarousel";
import Button from "../UI/Button";
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuGitPullRequestDraft } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import SingleDetail from "../UI/SingleDetail";
import Accordion from "../UI/Accordion";
import AccordionChild from "../UI/AccordionChild";
import MapComponent from "../Features/mapping/MapComponent";
import { useState } from "react";
import useCreateChat from "../Features/chats/useCreateChat";
import useGetUser from "../Features/User/useGetUser";
import useGetOwner from "../Features/User/useGetOwner";
import toast from "react-hot-toast";
import HomeBack from "../UI/HomeBack";
import PageLoading from "../UI/PageLoading";
import Modal from "../UI/Modal";
import RentRequestForm from "../UI/RentRequestForm";
import { cleanAndFormatCurrency } from "../utils/helper";

export default function PropertyDetails() {
  const { id } = useParams();
  const { property, propertyLoading, propertyError } = useGetProperty(id);
  const { propertyOwner } = useGetOwner(property?.userId);
  const { userData } = useGetUser();
  const { createChat, isCreating } = useCreateChat();
  const [carouselScreenState, setCarouselScreenState] = useState(false);
  const isSameUser = userData?.userId === property?.userId;
  const user_owner_chatID = userData?.chatIDs?.filter((id) =>
    propertyOwner?.chatIDs?.includes(id),
  )?.[0];
  const alreadyHasChat = Boolean(user_owner_chatID);

  const navigate = useNavigate();
  function handleCreateChat() {
    if (!alreadyHasChat) {
      createChat(
        {
          participants: {
            [`${userData?.userId}`]: true,
            [`${property?.userId}`]: true,
          },
          participantsDetails: [
            { name: propertyOwner?.userName, id: property?.userId },
            { name: userData?.userName, id: userData?.userId },
          ],
          lastMessage: "new chat",
          timestamp: Date.now(),
          propertyOwnerId: property?.userId,
          usersDetails: [
            {
              documentId: userData?.documentId,
              chatIDs: userData?.chatIDs || [],
            },
            {
              documentId: propertyOwner?.documentId,
              chatIDs: propertyOwner.chatIDs.length
                ? propertyOwner.chatIDs
                : [],
            },
          ],
        },
        {
          onSuccess: () => {
            navigate(`/chats`);
            toast.success("chat Created successfully");
          },
        },
      );
    } else {
      toast("you already have a chat with this owner");
      navigate(`/chats/?ownerChatId=${user_owner_chatID}`);
    }
  }

  if (propertyLoading) return <PageLoading />;
  if (propertyError) return <PageError errorMessage={propertyError.message} />;

  return (
    <main className="mx-12 mb-[5rem] mt-[8rem] flex  flex-col justify-center gap-16 md:mt-[6rem]  ">
      {/* navigation buttons */}
      <header className="flex w-full flex-col gap-12  md:flex-row md:justify-between">
        <HomeBack />

        {/* buttons for creating property */}
        <div
          className={` flex flex-col gap-8 md:flex-row ${isSameUser && "opacity-20"} `}
        >
          <Modal>
            <Modal.Open openName={"rentRequest"}>
              <Button type="reddish" disable={isSameUser}>
                <LuGitPullRequestDraft className=" text-slate-50" /> Request to
                rent
              </Button>
            </Modal.Open>
            <Modal.Window openName={"rentRequest"}>
              <RentRequestForm
                property={{ ...property, docId: id }}
                propertyOwner={propertyOwner}
                requestingUser={userData}
              />
            </Modal.Window>
          </Modal>

          <Button
            type="transparentRed"
            onClick={handleCreateChat}
            disable={isCreating || isSameUser}
          >
            <IoChatbubblesOutline className=" text-slate-700" /> Chat with owner
          </Button>
        </div>
      </header>
      {/* property name and small details */}
      <section className=" flex flex-col gap-8 md:flex-row md:justify-between ">
        <div className=" flex w-full  flex-col items-center justify-center md:block md:w-[40rem] ">
          <h1 className=" text-center text-3xl font-medium md:text-left  ">
            {property.name}
          </h1>
          <span className=" flex gap-1">
            <FaLocationDot className="text-[#b33479]  " />
            {property.location}
          </span>
          <span className=" flex gap-1">
            <FaPhoneVolume className="text-[#b33479]  " />
            {propertyOwner?.contact}
          </span>
          <span className=" flex gap-1">
            <MdEmail className="text-[#b33479]  " />
            {propertyOwner?.email}
          </span>
          <span className=" flex gap-1">
            <FaRegUser className="text-[#b33479]  " />
            {propertyOwner?.userName}
          </span>
        </div>
        <p className="mr-4 flex flex-wrap items-center justify-center gap-1 text-xl md:justify-start ">
          <FaMapMarkedAlt className=" text-[#1c5e1c]" /> Use map below to find
          the location of this property
        </p>
      </section>

      {/* image carousel and map */}
      <section className="flex w-[100%] flex-col items-center gap-20  lg:flex-row lg:justify-between ">
        {/* CAROUSEL */}
        <div className=" w-full shadow-md transition-all duration-300 lg:w-fit ">
          <PropertyCarousel
            setScreenState={setCarouselScreenState}
            images={property.image}
          />
        </div>
        {/* map */}
        <div
          className={`${carouselScreenState ? "hidden" : ""} relative h-[37rem] w-[100%] flex-grow bg-slate-400 lg:w-[inherit]`}
        >
          <MapComponent
            carouselScreenState={carouselScreenState}
            propertyId={property.id}
            coordinates={[
              property?.gpsPosition?.lat,
              property?.gpsPosition?.long,
            ]}
          />
        </div>
      </section>
      {/* other property details */}
      <section className=" flex flex-col gap-12">
        {/* Description */}
        <SingleDetail
          title={"Description"}
          value={property.description}
          type="long"
        />
        <SingleDetail title={"Rules"} value={property.rules} type="long" />
        <div className=" flex flex-grow flex-wrap gap-8 ">
          <SingleDetail
            title={"Price"}
            value={cleanAndFormatCurrency(property.price)}
          />
          <SingleDetail title={"Rating"} value={property.rating} />
          <SingleDetail title={"Year_built"} value={property.year_built} />
          <SingleDetail title={"Size"} value={property.size} />
          <SingleDetail title={"Bedrooms"} value={property.bedrooms} />
          <SingleDetail title={"Bathrooms"} value={property.bathrooms} />
        </div>
        <div className=" flex flex-wrap gap-12">
          <Accordion heading={"neighboring facilities"}>
            {property.neighborhood.map((facility, i) => (
              <AccordionChild key={i}>{facility}</AccordionChild>
            ))}
          </Accordion>
          <Accordion heading={"Amenities"}>
            {property.amenities.map((facility, i) => (
              <AccordionChild key={i}>{facility}</AccordionChild>
            ))}
          </Accordion>
          <Accordion heading={"Features"}>
            {property.features.map((facility, i) => (
              <AccordionChild key={i}>{facility}</AccordionChild>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
