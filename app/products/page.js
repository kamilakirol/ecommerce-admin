import Link from "next/link";

export default function products() {
  return (
    <Link
      href={"/products/new"}
      className="bg-blue-900 text-white py-1 px-2 rounded-md"
    >
      Add new product
    </Link>
  );
}
