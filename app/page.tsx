import Link from "next/link";

export default function Home() {
  return (
    <>
      <h2>Hello WOrld</h2>
      <Link href="/onboarding/login">
        <button className="p-2 px-5 rounded-lg bg-green-500">Login here</button>
      </Link>
    </>
  );
}
