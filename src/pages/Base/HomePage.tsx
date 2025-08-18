import Loader from "@/components/Main/Preloader";


const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">

      <div className="flex flex-col items-center justify-center">
        <Loader />
        <h1 className="text-2xl font-bold mt-4 dark:text-white">Welcome to the <span className="text-red-500 dark:text-red-600">Home Page</span></h1>
        <p className="text-gray-600 dark:text-gray-200">This is a placeholder for your content.</p>
        </div>

    
  
      
    </div>
  );
};

export default HomePage;