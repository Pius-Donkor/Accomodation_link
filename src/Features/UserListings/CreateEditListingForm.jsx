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

export default function CreateEditListingForm({ property, id }) {
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
          <section className="flex w-[100%] flex-col gap-4 lg:min-w-[30rem]">
            <FormRow field="property_name">
              <Input
                defaultValue={property?.name || ""}
                register={register}
                field="property_name"
              />
            </FormRow>
            <FormRow field="property_price">
              <span>GH₵</span>
              <Input
                defaultValue={property?.price || ""}
                register={register}
                placeholder="in Gh₵ / Ghana cedis  "
                type="number"
                field="property_price"
              />
            </FormRow>
            <FormRow field="property_location">
              <Input
                defaultValue={property?.location || ""}
                field="property_location"
              />
            </FormRow>

            <FormRow field="accommodation_type">
              <SelectWithInput
                register={register}
                field="accommodation_type"
                options={["hostel rent", "home rent"]}
              />
            </FormRow>
            <FormRow field="bathrooms">
              <Input
                register={register}
                defaultValue={property?.bathrooms || ""}
                type="number"
                field="bathrooms"
              />
            </FormRow>
            <FormRow field="bedrooms">
              <Input
                register={register}
                defaultValue={property?.bedrooms || ""}
                field="bedrooms"
              />
            </FormRow>

            <FormRow field="neighboring_campuses">
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
            <FormRow field="description">
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
          <FormRow field="upload_property_images">
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
