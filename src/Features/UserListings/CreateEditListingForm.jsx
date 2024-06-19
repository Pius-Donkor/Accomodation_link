import React, { useEffect, useState } from "react";
import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";
import SelectWithInput from "../../UI/SelectWithInput";
import TextArea from "../../UI/TextArea";
import Button from "../../UI/Button";
import { FaTrashAlt } from "react-icons/fa";
import MultipleInputs from "../../UI/MultipleInputs";
import { useForm, useFieldArray } from "react-hook-form";
import useGetPositionAddress from "../../hooks/useGetPositionAddress";
import "./triangle.css";
import useOutsideClick from "../../hooks/useOutsideClick";
import useCreateEditProperties from "../properties/useCreateEditProperties";
import toast from "react-hot-toast";
import useGetUser from "../User/useGetUser";

export default function CreateEditListingForm({ property, id }) {
  const editSession = Boolean(id);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const { ref } = useOutsideClick(handleClosePrompt);
  const { createEdit, createEditError, isCreating } = useCreateEditProperties();
  const { error, isLoading, userData } = useGetUser();
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      features: property?.features || [""],
      amenities: property?.amenities || [""],
      rules: property?.rules ? property?.rules || [`${property?.rules}`] : [""],
      neighborhood: property?.neighborhood || [""],
    },
  });
  // here we get the position and address of the property provided the user bis at the exact location of the listing  and then set them to a state when a  button is clicked
  const { address, position } = useGetPositionAddress();

  function handleLocationIntoInput() {
    setValue(
      "position_coordinate",
      `${position.latitude},${position.longitude}`,
    );
    setValue("property_location", address);
  }
  const {
    append: appendFeature,
    remove: removeFeature,
    fields: featuresField,
  } = useFieldArray({ control, name: "features" });
  const {
    append: appendAmenity,
    remove: removeAmenity,
    fields: amenitiesField,
  } = useFieldArray({ control, name: "amenities" });
  const {
    append: appendRule,
    remove: removeRule,
    fields: rulesField,
  } = useFieldArray({ control, name: "rules" });
  const {
    append: appendNeighborhood,
    remove: removeNeighborhood,
    fields: neighborhoodField,
  } = useFieldArray({ control, name: "neighborhood" });
  // the submit function handle what happens next to the obtained values
  function onSubmit(data) {
    console.table(data);
    const {
      accommodation_type,
      amenities,
      bathrooms,
      bedrooms,
      description,
      features,
      neighborhood,
      neighboring_campus,
      position_coordinate,
      property_location,
      property_name,
      rental_price,
      rules,
      size,
      upload_property_images,
    } = data;

    const newPosition = position_coordinate
      .slice()
      .trim()
      .split(",")
      .map((pos) => +pos);

    if (editSession) {
      createEdit(
        {
          id: id,
          price: rental_price,
          name: property_name,
          location: property_location,
          amenities,
          bathrooms,
          bedrooms,
          description,
          features,
          neighborhood,
          neighboring_campus,
          image: property.image,
          rules,
          userId: property?.userId,
          size,
          accommodation_type,
          gpsPosition: { lat: newPosition[0], long: newPosition[1] },
        },
        {
          onSuccess: () => {
            toast.success("listing edited successfully");
            reset();
          },
        },
      );
    } else {
      console.log({
        price: rental_price,
        name: property_name,
        location: property_location,
        amenities,
        bathrooms,
        bedrooms,
        description,
        features,
        neighborhood,
        neighboring_campus,
        image: upload_property_images,
        rules,
        userId: userData.userId,
        size,
        accommodation_type,
        gpsPosition: { lat: newPosition[0], long: newPosition[1] },
      });
      createEdit(
        {
          price: rental_price,
          name: property_name,
          location: property_location,
          amenities,
          bathrooms,
          bedrooms,
          description,
          features,
          neighborhood,
          neighboring_campus,
          image: upload_property_images,
          rules,
          userId: userData.userId,
          size,
          accommodation_type,
          gpsPosition: { lat: newPosition[0], long: newPosition[1] },
        },
        {
          onSuccess: () => {
            toast.success("listing created successfully");
            reset();
          },
        },
      );
    }
  }
  function onError(errors) {
    console.log(errors);
  }
  function handleClosePrompt() {
    setShowLocationPrompt(false);
  }
  function handleHover() {
    setShowLocationPrompt(true);
    setTimeout(() => {
      setShowLocationPrompt(false);
    }, 5000);
  }

  return (
    <Form onSubmit={onSubmit} onError={onError} handleSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-12 lg:flex-row  ">
          <section className="flex w-[100%] flex-col gap-4 lg:min-w-[35rem]">
            <FormRow
              field="property_name"
              error={errors?.property_name?.message}
            >
              <Input
                defaultValue={property?.name || ""}
                register={register}
                field="property_name"
                disabled={isCreating}
              />
            </FormRow>
            <FormRow field="size" error={errors?.property_name?.message}>
              <Input
                defaultValue={property?.size || ""}
                register={register}
                field="size"
                placeholder="ie. 250sqft"
                disabled={isCreating}
              />
            </FormRow>
            <FormRow field="rental_price" error={errors?.rental_price?.message}>
              <span>GH₵ / Year</span>
              <Input
                defaultValue={property?.price || property?.rental_price || ""}
                register={register}
                placeholder="in Gh₵ / Ghana cedis  "
                type="number"
                field="rental_price"
                disabled={isCreating}
              />
            </FormRow>
            <div className="relative  ">
              <FormRow
                field="property_location"
                error={errors?.property_location?.message}
              >
                <Button
                  onMouseEnter={handleHover}
                  onClick={handleLocationIntoInput}
                  type="reddish"
                >
                  get location/position
                </Button>
                <p
                  ref={ref}
                  className={` absolute bottom-[-11.25rem] left-[9rem] z-20 transition-all duration-500  ${showLocationPrompt ? "" : "hidden"} w-[10rem] rounded-md bg-slate-50 p-2 shadow-2xl `}
                >
                  <span className=" triangle  absolute left-[50%] top-[-2.5rem]  "></span>
                  Before you use this feature , please make sure that you are
                  currently at the location of the listing / property
                </p>

                <Input
                  defaultValue={
                    property?.location || property?.property_location || ""
                  }
                  field="property_location"
                  register={register}
                  disabled={isCreating}
                />
              </FormRow>
            </div>
            <FormRow
              field="position_coordinate"
              error={errors?.property_location?.message}
            >
              <Input
                defaultValue={
                  property
                    ? `${property?.gpsPosition.lat},${property?.gpsPosition.long}`
                    : ""
                }
                field="position_coordinate"
                register={register}
                placeholder="ie. 5.689735, -0.239775"
                disabled={isCreating}
              />
            </FormRow>

            <FormRow
              field="accommodation_type"
              error={errors?.accommodation_type?.message}
            >
              <SelectWithInput
                register={register}
                field="accommodation_type"
                options={["hostel rent", "home rent"]}
                disabled={isCreating}
              />
            </FormRow>
            <FormRow field="bathrooms" error={errors?.bathrooms?.message}>
              <Input
                register={register}
                defaultValue={property?.bathrooms || ""}
                type="number"
                field="bathrooms"
                disabled={isCreating}
              />
            </FormRow>
            <FormRow field="bedrooms" error={errors?.bedrooms?.message}>
              <Input
                register={register}
                defaultValue={property?.bedrooms || ""}
                field="bedrooms"
                disabled={isCreating}
              />
            </FormRow>

            <FormRow
              field="neighboring_campus"
              error={errors?.neighboring_campus?.message}
            >
              <SelectWithInput
                field="neighboring_campus"
                register={register}
                options={[
                  "Sunyani Technical University (STU)",
                  "University of Energy and Natural Resources (UENR)",
                  "Catholic University College of Ghana",
                ]}
                disabled={isCreating}
              />
            </FormRow>
            <FormRow field="description" error={errors?.description?.message}>
              <TextArea
                register={register}
                defaultValue={property?.description || ""}
                field="description"
                disabled={isCreating}
              />
            </FormRow>
          </section>
          <section className="flex w-[100%] flex-col gap-4 lg:min-w-[30rem]">
            <div className="flex flex-col gap-12">
              <MultipleInputs
                fields={rulesField}
                errors={errors}
                defaultValue={property?.rules || ""}
                append={appendRule}
                remove={removeRule}
                heading={"Rental rules"}
                addButtonName={"Add rule"}
                field="rule"
                fieldArrayName="rules"
                register={register}
                required={false}
                disabled={isCreating}
              />
              <MultipleInputs
                errors={errors}
                fields={featuresField}
                defaultValue={property?.features || ""}
                append={appendFeature}
                remove={removeFeature}
                heading={"Features"}
                addButtonName={"Add features"}
                field="feature"
                fieldArrayName="features"
                register={register}
                required={false}
                disabled={isCreating}
              />
              <MultipleInputs
                errors={errors}
                defaultValue={property?.amenities || ""}
                fields={amenitiesField}
                append={appendAmenity}
                remove={removeAmenity}
                heading={"Amenities"}
                addButtonName={"Add Amenity"}
                field="Amenity"
                fieldArrayName="amenities"
                register={register}
                required={false}
                disabled={isCreating}
              />
              <MultipleInputs
                error={errors?.neighborhood?.message}
                fields={neighborhoodField}
                append={appendNeighborhood}
                remove={removeNeighborhood}
                heading={"Neighboring facilities"}
                addButtonName={"Add Facility"}
                field="neighborhood"
                fieldArrayName="neighborhood"
                required={false}
                register={register}
                defaultValue={property?.neighborhood || ""}
                disabled={isCreating}
              />
            </div>
          </section>
        </div>
        <div className="mt-8 inline-flex md:min-w-[40rem] lg:mt-0 lg:w-fit ">
          <FormRow
            field="upload_property_images"
            error={errors?.upload_property_images?.message}
          >
            <Input
              register={register}
              field={"upload_property_images"}
              type="file"
              disabled={isCreating}
              required={!editSession}
            />
          </FormRow>
        </div>

        <FormRow childElement="button">
          <Button type="submit" disable={isCreating}>
            {id ? "Edit Property" : "Create Property"}
          </Button>
        </FormRow>
      </div>
    </Form>
  );
}
