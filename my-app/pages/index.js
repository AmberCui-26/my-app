import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <main>
        <h1 className="title">
          Read{" "}
          <Link href="/login">
            <a>login page</a>
          </Link>
        </h1>
      </main>
    </div>
  );
}
