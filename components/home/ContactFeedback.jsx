export default function ContactFeedback() {
  return (
    <>
      <div
        id={"popup-message"}
        className={
          "fixed inset-0 flex items-center justify-center bg-primary bg-opacity-50 hidden z-[1000]"
        }
      >
        {"\n        "}
        <div
          className={
            "bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10 text-center transform transition-all duration-300 ease-in-out"
          }
        >
          {"\n            "}
          <div id={"popup-icon"} className={"mb-4"}></div>
          {"\n            "}
          <p
            id={"popup-text"}
            className={"text-lg font-semibold text-gray-800 mb-4"}
          ></p>
          {"\n            "}
          <button
            onClick={() => window.closePopup?.()}
            className={
              "mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
            }
          >
            {"\n                Close\n            "}
          </button>
          {"\n        "}
        </div>
        {"\n    "}
      </div>
    </>
  );
}
