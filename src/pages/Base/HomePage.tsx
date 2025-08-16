import FeaturedCars from "@/components/Main/PhotoPrew/index";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">
    
      {/* Два компоненти в одному рядку */}
      <div className="flex flex-row gap-6 w-full max-w-7xl">
        
        <FeaturedCars  />
          <FeaturedCars variant="right" />
   
      </div>
    </div>
  );
};

export default HomePage;