import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Raj Biosis",
  description: "The page you are looking for does not exist. Explore our biomedical and laboratory equipment catalog.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="text-center max-w-xl bg-white p-8 md:p-12 rounded-[40px] border border-slate-200 shadow-xl">
        <div className="w-24 h-24 mx-auto rounded-full bg-sky-100 flex items-center justify-center text-5xl mb-6">
          ⚠️
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-8">
          Sorry, we couldn&apos;t find the page you are looking for. It might have been moved, deleted, or never existed.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="w-full sm:w-auto bg-sky-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-md hover:bg-sky-800 transition duration-300 cursor-pointer">
              Go to Homepage
            </button>
          </Link>
          <Link href="/items">
            <button className="w-full sm:w-auto border border-slate-300 text-slate-700 bg-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition duration-300 cursor-pointer">
              Explore Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
