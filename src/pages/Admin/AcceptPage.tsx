import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { useSelector } from "react-redux"; // Added useSelector
import { User } from "lucide-react";
import { useAssignAndStartAuctionMutation, useGetCarManagerByIdQuery } from "@/features/api/endpoints/Car";
import type { RootState } from "@/app/store"; // Import RootState for typing

export default function AcceptPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Initialize useNavigate
  const currentLang = useSelector((state: RootState) => state.lang.current); // Get currentLang from Redux

  const [assignAndStartAuction, { isLoading: isAccepting }] = useAssignAndStartAuctionMutation();
  const { data: carData, isLoading, isError } = useGetCarManagerByIdQuery(Number(id));

  const mockSpecialtyOptions = [
    "Premium Package (power folding mirrors, Comfort Access keyless entry, power rear sunshade, power-adjustable front seats, rear Park Distance Control, navigation system, and more)",
    "Limited-slip differential",
    "Adaptive xenon headlights",
    "Power sunroof",
    "Novillo leather upholstery",
    "Enhanced Premium sound system",
  ];

  if (isLoading) {
    return <div className="w-full bg-[#2c2c2c] min-h-screen text-white">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="w-full bg-[#2c2c2c] min-h-screen text-white">
        Error: Failed to load car data
      </div>
    );
  }

  if (!carData) {
    return <div className="w-full bg-[#2c2c2c] min-h-screen text-white">No car data found</div>;
  }

  const title = `${carData.year} ${carData.make} ${carData.model}`;

  const handleAccept = async () => {
    try {
      await assignAndStartAuction(Number(id)).unwrap(); // Use unwrap for better error handling
      navigate(`/${currentLang}/dashboard`); // Navigate to dashboard on success
    } catch (err) {
      console.error("Failed to start auction", err);
      alert("Error while starting auction.");
    }
  };

  return (
    <div className="w-full bg-[#2c2c2c] min-h-screen text-white">
      <main className="px-60 pb-12 flex flex-col justify-start items-start gap-8">
        <div className="w-full pb-4 flex flex-col justify-start items-start gap-8">
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <div className="w-full flex flex-col justify-start items-start">
              <h1 className="text-white text-2xl font-bold">{title}</h1>
            </div>

            <div className="w-full flex justify-start items-start gap-3 flex-wrap">
              <div className="w-[956px] flex flex-col justify-start items-start gap-2.5">
                <div className="w-full p-3 bg-[#212121] grid grid-cols-3 gap-3">
                  {carData.images?.map((image, index) => (
                    <img
                      key={image.id}
                      className="w-full h-[203px] object-cover"
                      src={image.imageUrl}
                      alt={`Car image ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-6">
                  <div className="w-full flex flex-col justify-start items-start gap-2.5">
                    <h2 className="text-white text-2xl font-bold">Specialty installed options or equipment</h2>
                    {mockSpecialtyOptions.map((option, index) => (
                      <div key={index} className="w-full text-white text-base font-medium">
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-[466px] flex flex-col justify-center items-center gap-6">
                <div className="w-full bg-[#212121] rounded-lg border border-[#d0d0d0] flex flex-col justify-start items-start">
                  <div className="w-full h-12 flex justify-start items-center">
                    <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                      <div className="text-white text-lg font-bold leading-tight">Brand</div>
                    </div>
                    <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                      <div className="text-white text-base font-medium">{carData.make}</div>
                    </div>
                  </div>

                  <div className="w-full h-12 border-t border-[#d0d0d0] flex justify-start items-center">
                    <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                      <div className="text-white text-lg font-bold leading-tight">Model</div>
                    </div>
                    <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                      <div className="text-white text-base font-medium">{carData.model}</div> 
                    </div>
                  </div>

                  <div className="w-full h-12 border-t border-[#d0d0d0] flex justify-start items-center">
                    <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                      <div className="text-white text-lg font-bold leading-tight">Year</div>
                    </div>
                    <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                      <div className="text-white text-base font-medium">{carData.year}</div>
                    </div>
                  </div>

                  <div className="w-full h-12 border-t border-[#d0d0d0] flex justify-start items-center">
                    <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                      <div className="text-white text-lg font-bold leading-tight">VIN</div>
                    </div>
                    <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                      <div className="text-white text-base font-medium">{carData.vin}</div>
                    </div>
                  </div>

                  <div className="w-full h-12 border-t border-[#d0d0d0] flex justify-start items-center">
                    <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                      <div className="text-white text-lg font-bold leading-tight">Mileage</div>
                    </div>
                    <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                      <div className="text-white text-base font-medium">{carData.mileage}</div>
                    </div>
                  </div>

                  <div className="w-full h-12 border-t border-[#d0d0d0] flex justify-start items-center">
                    <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                      <div className="text-white text-lg font-bold leading-tight">Transmission</div>
                    </div>
                    <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                      <div className="text-white text-base font-medium">{carData.transmissionType === 0 ? "Manual" : "Automatic"}</div>
                    </div>
                  </div>

                  <div className="w-full h-12 border-t border-[#d0d0d0] flex justify-start items-center">
                    <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                      <div className="text-white text-lg font-bold leading-tight">Seller</div>
                    </div>
                    <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                      <div className="flex justify-center items-center gap-2">
                        <User className="w-6 h-6 text-white" />
                        <div className="text-white text-base font-medium">{carData.owner}</div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-[#d0d0d0] flex justify-start items-center">
                    <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                      <div className="flex-1 text-white text-lg font-bold leading-tight">Car for sale elsewhere?</div>
                    </div>
                    <div className="flex-1 p-3 border-l border-[#d0d0d0] h-17.5 flex justify-start items-center gap-2.5">
                      <div className="flex justify-center items-center gap-2">
                        <div className="text-white text-base font-medium">{carData.isOnSaleElsewhere ? "Yes" : "No"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-[#d0d0d0] flex justify-start items-center">
                    <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                      <div className="flex-1 text-white text-lg font-bold leading-tight">Has the car been modified?</div>
                    </div>
                    <div className="flex-1 p-3 border-l border-[#d0d0d0] h-17.5 flex justify-start items-center gap-2.5">
                      <div className="flex justify-center items-center gap-2">
                        <div className="text-white text-base font-medium">{carData.isModified ? "Yes" : "No"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleAccept}
            disabled={isAccepting || !!carData.managerId}
            className="px-[30px] py-2.5 bg-[#cd1f22] rounded-md flex justify-center items-center gap-2.5 
             hover:bg-[#b01a1d] transition-colors disabled:opacity-50"
          >
            <div className="text-white text-2xl font-bold">
              {carData.managerId
                ? "Car Already Accepted"
                : isAccepting
                  ? "Accepting..."
                  : "Accept Commission"}
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}