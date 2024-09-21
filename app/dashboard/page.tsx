import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="p-2">
      {/* background image */}
      <div className="w-full h-[40vh] p-1 relative">
        <Image
          src="https://images.unsplash.com/photo-1726853522009-8dc4c4e306a3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
          width={1000}
          height={1000}
          className="w-full h-full object-cover rounded-xl pointer-events-none"
        />
        <div className="absolute bottom-2 right-2">
          <button className="flex items-center bg-neutral-200 p-2 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </button>
        </div>
      </div>

      {/* profile */}
      <div className="w-full p-1 flex items-center justify-between">
        {/* profile image */}
        <div className="flex items-center gap-2">
          <Image
            src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile"
            width={1000}
            height={1000}
            className="w-[250px] h-[250px] rounded-full object-cover"
          />
          <div className="">
            <h1 className="text-5xl font-bold px-2">John Doe</h1>
            <div className="w-1/2 p-2">
              <p className="text-sm text-neutral-800">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
                quas ipsam odio assumenda non unde magni, molestias voluptatum
                ullam temporibus!
              </p>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex flex-col gap-2">
          <button className="bg-neutral-200 p-2 rounded-xl flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
            Edit profile
          </button>
          <button className="bg-neutral-200 p-2 rounded-xl flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            Create new
          </button>
        </div>
      </div>
    </div>
  );
}
