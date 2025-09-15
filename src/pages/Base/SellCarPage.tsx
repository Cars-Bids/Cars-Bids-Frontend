import {Button} from "@/components/ui/button.tsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {sellCarSchema} from "@/components/Main/Modal/Validation";
import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import {SimpleInput} from "@/components/ui/simpleInput.tsx";
import {AutoCompleteInput} from "@/components/ui/AutoCompleteInput.tsx";
import {useGetMakesQuery} from "@/features/api/endpoints/Make.ts";
import {useGetModelsByMakeQuery} from "@/features/api/endpoints/Models.ts";
import {TextareaWithCounter} from "@/components/ui/TextAreaWithCounter.tsx";
import {ToggleGroup} from "@/components/ui/ToggleGroup.tsx";
import {useRequestNewCarMutation} from "@/features/api/endpoints/CarEndpoints.ts";

//TODO: add auto-writing user data(phone + fullname) if exists
//TODO: add adaptive design
const SellCarPage = () => {
    const [serverError, setServerError] = useState("");
    const { data: makes = [] } = useGetMakesQuery();
    const [requestNewCar, { isLoading }] = useRequestNewCarMutation();

    return (
        <div className="text-white p-6">
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
                    //validationSchema={sellCarSchema}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            console.log("Btn clicked");
                            console.log(values);
                            await requestNewCar(values).unwrap();
                            resetForm();
                            alert("Car request sent successfully ✅");
                        } catch (err: any) {
                            console.error(err);
                            alert("Failed to send car request ❌");
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
                            <div className="flex mb-6">
                                <div className="w-1/2 pr-6 space-y-4">
                                    <h2 className="text-2xl font-bold font-amulya">Tell about your car</h2>
                                    <p className="text-base font-medium">
                                        Please give us some basics about yourself and the car you'd like to sell. We'll also need details about the car's title status as well as 6 photos that highlight the car's exterior and interior condition.
                                    </p>
                                    <p className="text-base font-medium">
                                        We'll respond to your application within a business day. Once accepted, we'll ask for more details and at least 50 high-res photos, then work with you to build a custom and professional listing and get the auction live.
                                    </p>
                                </div>
                                <div className="w-1/2 pl-6 space-y-4">
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
                                            className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md placeholder-[#d0d0d0]"
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
                                            className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md placeholder-[#d0d0d0]"
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
                                            className="px-2.5 mr-2.5 h-10 w-full border border-[#d0d0d0] rounded-md"
                                        />
                                        <Button
                                            type="button"
                                            className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 font-amulya font-bold border border-transparent transition-all h-10 duration-200 px-8 py-2.5 text-base rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Check VIN
                                        </Button>
                                    </div>
                                    {touched.phone && (
                                        <ErrorMessage
                                            name="vin"
                                            component="div"
                                            className="text-red-500 text-sm font-synonym"
                                        />
                                    )}
                                </div>

                                <div className="flex justify-between w-full gap-16">
                                    <div className="flex-[6]">
                                        <Field as={AutoCompleteInput}
                                               name="brandId"
                                               label="Brand"
                                               options={makes}
                                               placeholder="Enter make..."/>

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
                                            className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md placeholder-[#d0d0d0]"
                                        />
                                        {touched.phone && (
                                            <ErrorMessage
                                                name="year"
                                                component="div"
                                                className="text-red-500 text-sm font-synonym"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-[7]">
                                        <Field as={AutoCompleteInput}
                                               name="modelId"
                                               label="Model"
                                               asyncOptions={models}
                                               placeholder="Enter model..."/>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full gap-16">
                                    <div className="flex-[6]">
                                        <Label
                                            htmlFor="transmissionId"
                                            className="block text-xl font-medium font-amulya"
                                        >
                                            Transmission
                                        </Label>
                                        <Field
                                            as="select"
                                            id="transmissionId"
                                            name="transmissionId"
                                            className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md font-synonym"
                                        >
                                            {!values.transmissionId && (
                                                <option value="">
                                                    Select transmission
                                                </option>
                                            )}
                                            <option value="1">Manual</option>
                                            <option value="0">Automatic</option>
                                        </Field>
                                        <ErrorMessage
                                            name="transmissionId"
                                            component="div"
                                            className="text-red-500 text-sm font-synonym mt-1"
                                        />
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
                                            className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md placeholder-[#d0d0d0]"
                                        />
                                        {touched.phone && (
                                            <ErrorMessage
                                                name="mileage"
                                                component="div"
                                                className="text-red-500 text-sm font-synonym"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-[7]">
                                        <label
                                            htmlFor="photos"
                                            className="block text-xl font-medium font-amulya"
                                        >
                                            Attach 3–4 photos of your car
                                        </label>
                                        <input
                                            id="photos"
                                            name="photos"
                                            type="file"
                                            multiple
                                            className="mt-1 p-2 text-base font-normal w-full border border-[#d0d0d0] rounded-md font-synonym"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (e.currentTarget.files) {
                                                    setFieldValue("photos", Array.from(e.currentTarget.files));
                                                }
                                            }}
                                            onBlur={() => setFieldTouched("photos", true)}
                                        />
                                        <ErrorMessage
                                            name="photos"
                                            component="div"
                                            className="text-red-500 text-sm font-synonym mt-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Field as={TextareaWithCounter}
                                           name="description"
                                           label="Specialty installed options or equipment"
                                           placeholder="For example: sport package, range battery, FSD or other important factory-installed features"
                                           maxLength={180}/>
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
                                    <button type="submit" disabled={isSubmitting || isLoading} className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 font-amulya font-bold border border-transparent transition-all h-10 duration-200 px-8 py-2.5 text-base rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Continue</button>
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