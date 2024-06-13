import React, { useState } from "react";
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

export default function CreateEditListingForm({ property, id }) {
  const [inputPosition, setInputPosition] = useState();
  const [inputLocation, setInputLocation] = useState();

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    register,
    reset,
    control,
  } = useForm({
    defaultValues: {
      features: [""],
      amenities: [""],
      rules: [""],
      neighborhood: [""],
    },
  });
  // here we get the position and address of the property provided the user bis at the exact location of the listing  and then set them to a state when a  button is clicked
  const { address, position } = useGetPositionAddress();

  function handleLocationIntoInput() {
    setInputPosition(`${position.latitude},${position.longitude}`);
    setInputLocation(address);
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

  function onSubmit(data) {
    console.log(data);
    console.table(data);
  }
  function onError(errors) {
    console.log(errors);
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
              />
            </FormRow>
            <FormRow field="rental_price" error={errors?.rental_price?.message}>
              <span>GH₵ / Year</span>
              <Input
                defaultValue={property?.price || ""}
                register={register}
                placeholder="in Gh₵ / Ghana cedis  "
                type="number"
                field="rental_price"
              />
            </FormRow>
            <FormRow
              field="property_location"
              error={errors?.property_location?.message}
            >
              <div>
                <Button onClick={handleLocationIntoInput} type="reddish">
                  get location
                </Button>
              </div>
              <Input
                defaultValue={property?.location || ""}
                field="property_location"
                register={register}
                value={inputLocation}
              />
            </FormRow>
            <FormRow
              field="position_coordinate"
              error={errors?.property_location?.message}
            >
              <Input
                defaultValue={property?.location || ""}
                field="position_coordinate"
                register={register}
                placeholder="ie. 5.689735, -0.239775"
                value={inputPosition}
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
              />
            </FormRow>
            <FormRow field="bathrooms" error={errors?.bathrooms?.message}>
              <Input
                register={register}
                defaultValue={property?.bathrooms || ""}
                type="number"
                field="bathrooms"
              />
            </FormRow>
            <FormRow field="bedrooms" error={errors?.bedrooms?.message}>
              <Input
                register={register}
                defaultValue={property?.bedrooms || ""}
                field="bedrooms"
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
              />
            </FormRow>
            <FormRow field="description" error={errors?.description?.message}>
              <TextArea
                register={register}
                defaultValue={property?.description || ""}
                field="description"
              />
            </FormRow>
          </section>
          <section className="flex w-[100%] flex-col gap-4 lg:min-w-[30rem]">
            <div className="flex flex-col gap-12">
              <MultipleInputs
                fields={rulesField}
                error={errors?.rules?.message}
                defaultValue={property?.rules || ""}
                append={appendRule}
                remove={removeRule}
                heading={"Rental rules"}
                addButtonName={"Add rule"}
                field="rule"
                fieldArrayName="rules"
                register={register}
              />
              <MultipleInputs
                error={errors?.features?.message}
                fields={featuresField}
                defaultValue={property?.features || ""}
                append={appendFeature}
                remove={removeFeature}
                heading={"Features"}
                addButtonName={"Add features"}
                field="feature"
                fieldArrayName="features"
                register={register}
              />
              <MultipleInputs
                error={errors?.amenities?.message}
                defaultValue={property?.amenities || ""}
                fields={amenitiesField}
                append={appendAmenity}
                remove={removeAmenity}
                heading={"Amenities"}
                addButtonName={"Add Amenity"}
                field="Amenity"
                fieldArrayName="amenities"
                register={register}
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
                register={register}
                defaultValue={property?.neighborhood || ""}
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
            />
          </FormRow>
        </div>

        <FormRow childElement="button">
          <Button type="submit">
            {id ? "Edit Property" : "Create Property"}
          </Button>
        </FormRow>
      </div>
    </Form>
  );
}
