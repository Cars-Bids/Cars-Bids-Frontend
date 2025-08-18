import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQSection() {
  return (
   <div className="w-[80vw] inline-flex flex-col justify-start items-start gap-4 sm:gap-6 max-w-[1440px]">
        <div className=" inline-flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 overflow-hidden w-full max-w-[1440px]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-white">
            <AccordionTrigger className="text-white text-2xl font-bold font-amulya py-2 flex justify-between items-start hover:no-underline my-4">
              How much does it cost to sell a car?
            </AccordionTrigger>
            <AccordionContent className="text-white text-base font-medium font-synonym pt-2">
              Listing a car on Cars & Bids is completely free — and sellers receive 100% of the final sale price!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-white">
            <AccordionTrigger className="text-white text-2xl font-bold font-amulya py-2 flex justify-between items-start hover:no-underline my-4">
              How do you choose which cars you’re looking for?
            </AccordionTrigger>
            <AccordionContent className="text-white text-base font-medium font-synonym pt-2">
              We’re focused on cool cars, trucks, and SUVs for the modern enthusiast. If you’re looking to sell a cool car, we might be interested in listing it. Our definition of “cool” ranges from traditional sports cars (Mazda MX-5 Miata, Porsche 911) to oddball vehicles (Subaru BRAT, Infiniti M30, Volvo 850R) to more obvious high-performance sports cars (Porsche Cayman R, Ferrari 360 Modena) to special trucks and SUVs (Jeep Grand Wagoneer, Land Rover Defender). We don’t list every car we’re offered, but we’re certainly interested in your submission to see if it’s a good fit for Steria.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-white">
            <AccordionTrigger className="text-white text-2xl font-bold font-amulya py-2 flex justify-between items-start hover:no-underline my-4">
              How do I submit my car for sale?
            </AccordionTrigger>
            <AccordionContent className="text-white text-base font-medium font-synonym pt-2">
              To submit your car for sale, go to the “Sell a Car” link in the header. In order to sell your car, you’ll need to provide us with some important information – like the make, model, year, VIN, a few photos, and some other relevant details. If we’re interested in selling your car, we’ll get in touch with you. Then we’ll ask you for a more detailed set of questions so we can make sure our auction description is accurate.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-b border-white">
            <AccordionTrigger className="text-white text-2xl font-bold font-amulya py-2 flex justify-between items-start hover:no-underline my-4">
              What is a Reserve Auction vs. a No Reserve Auction?
            </AccordionTrigger>
            <AccordionContent className="text-white text-base font-medium font-synonym pt-2">
              Reserve Auction – A reserve auction has a secret minimum price that you’ll accept in order to sell your car. If your reserve isn't met, the car does not sell. We'll work with you to agree on a fair reserve price during the submission process.<br/><br/>No Reserve Auction – An auction without a reserve means that the car will sell to the highest bidder at the end of the auction regardless of price. We've found that cars offered with no reserve get more bids, more interest, and more attention.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border-b border-white">
            <AccordionTrigger className="text-white text-2xl font-bold font-amulya py-2 flex justify-between items-start hover:no-underline my-4">
              What information do I need to provide in order to sell my car?
            </AccordionTrigger>
            <AccordionContent className="text-white text-base  font-medium font-synonym pt-2">
              We start with just the basics: we can let you know if we’ll accept your car if you just give us the make, model, year, VIN, some photos, and a few other details. If we accept your car based on this information, we’ll then need to gather more details – we’ll ask about your history with the car, features, and other items that help us craft our listing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}