import React from "react";

const CreatePage = () => {
  return (
    <div className="w-screen border border-red-500 grid grid-cols-12">
      <div className="bg-lightColor1 col-span-4 flex justify-center dark:bg-darkColor2">
        <h1 className="text-2xl">Players</h1>
      </div>
      <div className="border col-span-8 bg-lightColor1 dark:bg-darkColor2">
        <form>
          <div>
            <label>How many rounds?</label>
            <input type="number" />
          </div>
          <div>
            <label>Each round should last for?</label>
            <input type="number" />
          </div>
          <button>Start</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
