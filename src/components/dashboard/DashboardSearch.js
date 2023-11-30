import React from "react";

export const DashboardSearch = ({ handleSearchCampaign, onChange, value }) => {
  return (
    <div className="w-full">
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="m-2 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            onChange={onChange}
            type="text"
            id="default-search"
            class="block mt-5 w-full p-4 pl-12 text-sm text-gray-900 rounded-lg bg-[#EFE3FF] outline-none dark:bg-[#EFE3FF] dark:border-[#87255B] dark:placeholder-[#87255B] dark:text-white"
            placeholder="Search"
            required
          />
        </div>
      </form>
    </div>
  );
};
