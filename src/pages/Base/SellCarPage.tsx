import {Button} from "@/components/ui/button.tsx";

const SellCarPage = () => {
    return (
        <div className="text-white p-6">
            <div className="max-w-5xl mx-auto">
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
                            <label className="block text-xl font-medium font-amulya">Full name</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md placeholder-[#d0d0d0]"
                                placeholder="enter your full name"
                            />
                            <p className="text-sm text-red-500 hidden">This field is required</p>
                        </div>
                        <div className="mt-4 space-y-1">
                            <label className="block text-xl font-medium font-amulya">Contact phone number</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md placeholder-[#d0d0d0]"
                                placeholder="+380981239572"
                            />
                            <p className="text-sm text-red-500 hidden">This field is required</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-bold font-amulya">Car Details</h3>
                <div className="flex flex-col justify-between gap-7">
                    <div className="mt-3">
                        <label className="block text-xl font-medium font-amulya">Car VIN Number</label>
                        <div className="flex justify-between mt-2">
                            <input
                                type="text"
                                className="px-2.5 mr-2.5 h-10 w-full border border-[#d0d0d0] rounded-md"
                            />
                            <Button
                                type="submit"
                                className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 font-amulya font-bold border border-transparent transition-all h-10 duration-200 px-8 py-2.5 text-base rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Check VIN
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-between w-full gap-16">
                        <div className="flex-[6]">
                            <label className="block text-xl font-medium font-amulya">Brand</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md font-synonym placeholder-[#d0d0d0]"
                                placeholder="exp. BMW, Porsche"
                            />
                        </div>
                        <div className="flex-[6]">
                            <label className="block text-xl font-medium font-amulya">Year</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md font-synonym placeholder-[#d0d0d0]"
                                placeholder="exp. 2001"
                            />
                        </div>
                        <div className="flex-[7]">
                            <label className="block text-xl font-medium font-amulya">Model</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md font-synonym placeholder-[#d0d0d0]"
                                placeholder="exp. M3, Cayman"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-16">
                        <div className="flex-[6]">
                            <label className="block text-xl font-medium font-amulya">Transmission</label>
                            <select className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md font-synonym">
                                <option>Manual</option>
                            </select>
                        </div>
                        <div className="flex-[6]">
                            <label className="block text-xl font-medium font-amulya">Mileage</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border border-[#d0d0d0] rounded-md font-synonym placeholder-[#d0d0d0]"
                                placeholder="Mileage in km"
                            />
                        </div>
                        <div className="flex-[7]">
                            <label className="block text-xl font-medium font-amulya">Attach 3-4 photo of your car</label>
                            <input
                                type="file"
                                className="mt-1 p-2 text-base font-normal w-full border border-[#d0d0d0] rounded-md font-synonym"
                                multiple
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xl font-medium font-amulya">Specialty installed options or equipment</label>
                        <textarea
                            className="mt-1 p-2 w-full text-white border border-[#d0d0d0] rounded-md font-synonym placeholder-[#d0d0d0]"
                            placeholder='For example: sport package, range battery, FSD or other important factory-installed features'
                            rows={1}
                        />
                    </div>
                    <div className="mt-4 flex space-x-4 justify-between">
                        <div>
                            <label className="block font-medium mb-4 text-xl font-amulya">Is this car for sale elsewhere?</label>
                            <div className="flex space-x-2 mt-1">
                                <button className="p-2 mr-6 border border-[#d0d0d0] rounded-md font-synonym">Yes</button>
                                <button className="p-2 border border-[#d0d0d0] rounded-md font-synonym">No</button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xl font-medium mb-4 font-amulya">Has the car been modified?</label>
                            <div className="flex space-x-2 mt-1">
                                <button className="p-2 mr-6 border border-[#d0d0d0] rounded-md font-synonym">No, car is completely stock</button>
                                <button className="p-2 border border-[#d0d0d0] rounded-md font-synonym">Yes, car is modified</button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center w-full">
                        <button className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 font-amulya font-bold border border-transparent transition-all h-10 duration-200 px-8 py-2.5 text-base rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellCarPage;