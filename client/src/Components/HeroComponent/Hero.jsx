import LatestJobs from "./LatestJobs";

const Hero = () => {
    return (
      <section className=" py-10 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Welcome to JobFinder</h2>
        <p className="text-gray-600 text-lg mb-6 text-center">
          JobFinder is your go-to application for finding your dream job. Search and explore thousands of job listings tailored just for you.
        </p>
        {/* Search Bar */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for jobs..."
            className="w-full max-w-md px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            Search
          </button>
        </div>
        <div>
          <LatestJobs/>
        </div>
      
      </section>
    );
  };
export default Hero;