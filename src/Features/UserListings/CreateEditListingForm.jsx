import React, { useState } from "react";
import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";
import SelectWithInput from "../../UI/SelectWithInput";
import TextArea from "../../UI/TextArea";
import Button from "../../UI/Button";
import { FaTrashAlt } from "react-icons/fa";
import MultipleInputs from "../../UI/MultipleInputs";

export default function CreateEditListingForm({ property, id }) {
  return (
    <Form>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-12 lg:flex-row  ">
          <section className="flex w-[100%] flex-col gap-4 lg:min-w-[30rem]">
            <FormRow field="property_name">
              <Input field="property_name" />
            </FormRow>
            <FormRow field="property_price">
              <span>GH₵</span>
              <Input
                placeholder="in Gh₵ / Ghana cedis  "
                type="number"
                field="property_price"
              />
            </FormRow>
            <FormRow field="property_location">
              <Input field="property_location" />
            </FormRow>

            <FormRow field="Accommodation_type">
              <SelectWithInput
                field="Accommodation_type"
                options={["hostel rent", "home rent"]}
              />
            </FormRow>
            <FormRow field="bathrooms">
              <Input type="number" field=" bathrooms" />
            </FormRow>
            <FormRow field="bedrooms">
              <Input field="bedrooms" />
            </FormRow>

            <FormRow field="neighboring_campuses ">
              <SelectWithInput
                field="neighboring_campus "
                options={[
                  "Sunyani Technical University (STU)",
                  "University of Energy and Natural Resources (UENR)",
                  "Catholic University College of Ghana",
                ]}
              />
            </FormRow>
            <FormRow field="description">
              <TextArea field="description" />
            </FormRow>
          </section>
          <section className="flex w-[100%] flex-col gap-4 lg:min-w-[30rem]">
            <div className="flex flex-col gap-12">
              <MultipleInputs
                heading={"Rental rules"}
                addButtonName={"Add rule"}
                field="rule"
              />
              <MultipleInputs
                heading={"Features"}
                addButtonName={"Add features"}
                field="feature"
              />
              <MultipleInputs
                heading={"Amenities"}
                addButtonName={"Add Amenity"}
                field="Amenity"
              />
            </div>
          </section>
        </div>
        <div className="mt-8 inline-flex md:min-w-[40rem] lg:mt-0 lg:w-fit ">
          <FormRow field="upload_property_images">
            <Input type="file" />
          </FormRow>
        </div>

        <FormRow childElement="button">
          <Button type="reddish">Create Property</Button>
        </FormRow>
      </div>
    </Form>
  );
}
