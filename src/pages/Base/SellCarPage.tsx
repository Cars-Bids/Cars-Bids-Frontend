import {Button} from "@/components/ui/button.tsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {validationUpdateCarCommandSchema} from "@/components/Main/Modal/Validation";
import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import {SimpleInput} from "@/components/ui/simpleInput.tsx";
import {useGetMakesQuery} from "@/features/api/endpoints/Make.ts";
import {useGetModelsByMakeQuery} from "@/features/api/endpoints/Models.ts";
import {TextareaWithCounter} from "@/components/ui/TextAreaWithCounter.tsx";
import {ToggleGroup} from "@/components/ui/ToggleGroup.tsx";
import {useRequestNewCarMutation} from "@/features/api/endpoints/CarEndpoints.ts";
import {CustomDropdownSelector} from "@/components/ui/CustomDropdownSelector.tsx";
import {CustomFileUpload} from "@/components/ui/CustomFileUpload.tsx";

//TODO: add auto-writing user data(phone + fullname) if exists
//TODO: add adaptive design
type Option = { id: number; name: string; makeId?: number };

const TRANSMISSION_OPTIONS: Option[] = [
    { id: 0, name: "Automatic" },
    { id: 1, name: "Manual" },
];

const SellCarPage = () => {
    const [serverError, setServerError] = useState("");
    const { data: makes = [] } = useGetMakesQuery();
    const [requestNewCar, { isLoading }] = useRequestNewCarMutation();

    return (
        <div className="dark:text-white p-6">
            <div className="max-w-5xl mx-auto">
                <Formik
                    initialValues={{
                        fullName: "",
                        phone: "",
                        vin: "",
                        brandId: "",
                        modelId: "",
                        transmissionId: "",
                        year: "",
                        mileage: "",
                        description: "",
                        isOnSaleElsewhere: null,
                        isModified: null,
                        photos: [],
                    }}
                    validationSchema={validationUpdateCarCommandSchema}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            await requestNewCar(values).unwrap();
                            resetForm();
                        } catch (err: any) {
                            console.error(err);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                          values,
                          touched,
                          handleChange,
                          setFieldValue,
                          setFieldTouched,
                          isSubmitting,
                      }) => {

                        const { data: models = [] } = useGetModelsByMakeQuery(values.brandId!, {
                            skip: !values.brandId,
                        });

                        return (
                            <Form>
                                <div className="flex gap-[80px] mb-6">
                                    <div className="w-1/2 space-y-4">
                                        <h2 className="text-2xl font-bold font-amulya">Tell about your car</h2>
                                        <p className="text-base font-medium">
                                            Please give us some basics about yourself and the car you'd like to sell. We'll also need details about the car's title status as well as 6 photos that highlight the car's exterior and interior condition.
                                        </p>
                                        <p className="text-base font-medium">
                                            We'll respond to your application within a business day. Once accepted, we'll ask for more details and at least 50 high-res photos, then work with you to build a custom and professional listing and get the auction live.
                                        </p>
                                    </div>
                                    <div className="w-1/2 space-y-4">
                                        <h3 className="text-2xl font-bold font-amulya">Client info</h3>
                                        <div className="mt-2 space-y-1">
                                            <Label
                                                htmlFor="fullName"
                                                className="block text-xl font-medium font-amulya"
                                            >
                                                Full name
                                            </Label>
                                            <Field
                                                as={SimpleInput}
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    handleChange(e);
                                                    setServerError("");
                                                }}
                                                placeholder="Enter your full name"
                                                required
                                                className="mt-1 p-2 w-full border rounded-md dark:border-[#d0d0d0] placeholder:text-[#5c5c5c] dark:placeholder:text-[#d0d0d0]"
                                            />
                                            {touched.fullName && (
                                                <ErrorMessage
                                                    name="fullName"
                                                    component="div"
                                                    className="text-red-500 text-sm font-synonym"
                                                />
                                            )}
                                        </div>
                                        <div className="mt-4 space-y-1">
                                            <Label
                                                htmlFor="phone"
                                                className="block text-xl font-medium font-amulya"
                                            >
                                                Contact phone number
                                            </Label>
                                            <Field
                                                as={SimpleInput}
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    handleChange(e);
                                                    setServerError("");
                                                }}
                                                placeholder="+380981239572"
                                                required
                                                className="mt-1 p-2 w-full border rounded-md dark:border-[#d0d0d0] placeholder:text-[#5c5c5c] dark:placeholder:text-[#d0d0d0]"
                                            />
                                            {touched.phone && (
                                                <ErrorMessage
                                                    name="phone"
                                                    component="div"
                                                    className="text-red-500 text-sm font-synonym"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold font-amulya">Car Details</h3>
                                <div className="flex flex-col justify-between gap-7">
                                    <div className="mt-3">
                                        <Label
                                            htmlFor="vin"
                                            className="block text-xl font-medium font-amulya"
                                        >
                                            Car VIN Number
                                        </Label>
                                        <div className="flex justify-between mt-2">
                                            <Field
                                                as={SimpleInput}
                                                id="vin"
                                                name="vin"
                                                type="text"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    handleChange(e);
                                                    setServerError("");
                                                }}
                                                placeholder="W1NYC7HJ3RX494173"
                                                required
                                                className="px-2.5 mr-2.5 h-10 w-full border rounded-md dark:border-[#d0d0d0] placeholder:text-[#5c5c5c] dark:placeholder:text-[#d0d0d0]"
                                            />
                                            <Button
                                                type="button"
                                                className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 font-amulya font-bold border border-transparent text-white transition-all h-10 duration-200 px-8 py-2.5 text-base rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Check VIN
                                            </Button>
                                        </div>
                                        {touched.vin && (
                                            <ErrorMessage
                                                name="vin"
                                                component="div"
                                                className="text-red-500 text-sm font-synonym"
                                            />
                                        )}
                                    </div>

                                    <div className="flex justify-between w-full gap-16">
                                        <div className="flex-[6]">
                                            <Label
                                                className="block text-xl font-medium font-amulya"
                                            >
                                                Brand
                                            </Label>
                                            <CustomDropdownSelector
                                                name="brandId"
                                                asyncOptions={makes}
                                                allowSearch={true}
                                                showChevron={false}
                                                placeholder="Select brand"
                                                className="mt-1 p-2 w-full border rounded-md dark:border-[#d0d0d0]"
                                                dropdownClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c]  w-full absolute border border-[#121212] rounded-md shadow-lg max-h-48 overflow-y-auto z-50 mt-1"
                                                optionClassName="p-2 hover:bg-[#c2c2c2] cursor-pointer text-[#121212] font-synonym text-sm border-b border-[#121212] last:border-b-0"
                                            />
                                            {touched.brandId && (
                                                <ErrorMessage
                                                    name="brandId"
                                                    component="div"
                                                    className="text-red-500 text-sm font-synonym"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-[6]">
                                            <Label
                                                htmlFor="year"
                                                className="block text-xl font-medium font-amulya"
                                            >
                                                Year
                                            </Label>
                                            <Field
                                                as={SimpleInput}
                                                id="year"
                                                name="year"
                                                type="text"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    handleChange(e);
                                                    setServerError("");
                                                }}
                                                placeholder="exp. 2023"
                                                required
                                                className="mt-1 p-2 w-full border rounded-md placeholder:text-[#5c5c5c] dark:placeholder:text-[#d0d0d0] dark:border-[#d0d0d0]"
                                            />
                                            {touched.year && (
                                                <ErrorMessage
                                                    name="year"
                                                    component="div"
                                                    className="text-red-500 text-sm font-synonym"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-[7]">
                                            <Label
                                                className="block text-xl font-medium font-amulya"
                                            >
                                                Model
                                            </Label>
                                            <CustomDropdownSelector
                                                name="modelId"
                                                asyncOptions={models}
                                                allowSearch={true}
                                                showChevron={false}
                                                placeholder="Select model"
                                                className="mt-1 p-2 w-full border rounded-md dark:border-[#d0d0d0]"
                                                dropdownClassName="dark:bg-[#2c2c2c] bg-[#d0d0d0] w-full absolute border border-[#121212] rounded-md shadow-lg max-h-48 overflow-y-auto z-50 mt-1"
                                                optionClassName="p-2 hover:bg-[#c2c2c2] cursor-pointer text-[#121212] font-synonym text-sm border-b border-[#121212] last:border-b-0"
                                            />
                                            {touched.modelId && (
                                                <ErrorMessage
                                                    name="modelId"
                                                    component="div"
                                                    className="text-red-500 text-sm font-synonym"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full gap-16">
                                        <div className="flex-[6]">
                                            <Label
                                                className="block text-xl font-medium font-amulya"
                                            >
                                                Transmission
                                            </Label>
                                            <CustomDropdownSelector
                                                name="transmissionId"
                                                options={TRANSMISSION_OPTIONS}
                                                allowSearch={false}
                                                showChevron={true}
                                                placeholder="Select transmission"
                                                className="mt-1 p-2 w-full border dark:border-[#d0d0d0] rounded-md"
                                                dropdownClassName="dark:bg-[#2c2c2c] bg-[#d0d0d0] w-full absolute border border-[#121212] rounded-md shadow-lg max-h-48 overflow-y-auto z-50 mt-1"
                                                optionClassName="p-2 hover:bg-[#c2c2c2] cursor-pointer text-[#121212] font-synonym text-sm border-b border-[#121212] last:border-b-0"
                                                chevronClassName="dark:text-white text-[#121212] w-6 h-6 text-gray-400 transition-transform duration-200"
                                            />
                                            {touched.transmissionId && (
                                                <ErrorMessage
                                                    name="transmissionId"
                                                    component="div"
                                                    className="text-red-500 text-sm font-synonym"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-[6]">
                                            <Label
                                                htmlFor="mileage"
                                                className="block text-xl font-medium font-amulya"
                                            >
                                                Mileage
                                            </Label>
                                            <Field
                                                as={SimpleInput}
                                                id="mileage"
                                                name="mileage"
                                                type="text"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    handleChange(e);
                                                    setServerError("");
                                                }}
                                                placeholder="Mileage in km"
                                                required
                                                className="mt-1 p-2 w-full border rounded-md placeholder:text-[#5c5c5c] dark:placeholder:text-[#d0d0d0] dark:border-[#d0d0d0]"
                                            />
                                            {touched.mileage && (
                                                <ErrorMessage
                                                    name="mileage"
                                                    component="div"
                                                    className="text-red-500 text-sm font-synonym"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-[7]">
                                            <CustomFileUpload
                                                name="photos"
                                                label="Attach 3-4 photo of your car"
                                                placeholder="Drag & drop your photos"
                                                maxFiles={3}
                                                acceptedTypes={["image/jpeg", "image/jpg", "image/png", "image/webp"]}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <TextareaWithCounter
                                            name="description"
                                            label="Specialty installed options or equipment"
                                            placeholder="For example: sport package, range battery, FSD or other important factory-installed features"
                                            maxLength={180}
                                            minRows={1}
                                            maxRows={6}
                                        />
                                    </div>
                                    <div className="mt-4 flex space-x-4 justify-between">
                                        <Field as={ToggleGroup}
                                               name="isOnSaleElsewhere"
                                               label="Is this car for sale elsewhere?"
                                               options={[
                                                   { value: true, label: "Yes" },
                                                   { value: false, label: "No" },
                                               ]}/>

                                        <Field as={ToggleGroup}
                                               name="isModified"
                                               label="Has the car been modified?"
                                               options={[
                                                   { value: false, label: "No, car is completely stock" },
                                                   { value: true, label: "Yes, car is modified" },
                                               ]}/>
                                    </div>
                                    <div className="text-center w-full">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || isLoading || !values.photos || values.photos.length !== 3}
                                            className="bg-red-600 hover:bg-transparent text-white hover:text-red-500 hover:border hover:border-red-500 font-amulya font-bold border border-transparent transition-all h-10 duration-200 px-8 py-2.5 text-base rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}}
                </Formik>
            </div>
        </div>
    );
};

export default SellCarPage;