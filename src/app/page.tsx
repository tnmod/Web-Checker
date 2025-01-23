"use client";
import { useState } from "react";
import {
  checkOrderWebsite,
  WebsiteMetadata,
} from "./actions/check-order-website";
import ReactJson from "react-json-view";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState<string>(
    "https://localhost/vi-vn/flight/country/united-states-of-america"
  );
  const [metadata, setMetadata] = useState<WebsiteMetadata>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const check = async () => {
    setError(undefined);
    setMetadata(undefined);
    try {
      if (!url) {
        throw new Error("URL is required");
      }
      setLoading(true);
      const res = await checkOrderWebsite(url);
      if (!res) {
        throw new Error("Failed to fetch metadata");
      }
      setMetadata(res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center gap-12">
      <h1 className="text-4xl font-bold  mt-24">Website Checker</h1>
      <div className="flex flex-col items-center gap-4">
        <textarea
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="px-3 py-2 m-0 rounded-xl text-black placeholder-neutral-600 min-w-96"
        />
        <button
          onClick={() => {
            check();
          }}
          className={`px-6 py-2 bg-white text-black rounded-xl hover:bg-white/20 hover:text-white transform duration-300 font-semibold ${
            url.length === 0 || !url.includes("https://")
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          Check
        </button>
      </div>
      <div className="flex flex-col items-start w-[1024px] divide-y border rounded-xl px-4">
        {loading ? (
          <span className="text-center w-full">Loading....</span>
        ) : error ? (
          <span>{error}</span>
        ) : metadata ? (
          <>
            <p className="w-full py-4">Title: {metadata?.title || "null"}</p>
            <p className="w-full py-4">
              Description: {metadata?.description || "null"}
            </p>
            <p className="w-full  py-4">
              Keywords: {metadata?.keywords || "null"}
            </p>
            <p className="w-full  py-4">
              Canonical:{" "}
              <Link
                target="_blank"
                className="hover:text-blue-500 transform duration-300"
                href={metadata?.canonical || "#"}
              >
                {metadata?.canonical || "null"}
              </Link>
            </p>
            <div className="w-full  py-4">
              <span>Schema: </span>
              {metadata?.schema ? (
                <div className="bg-white p-2 rounded-xl mt-4">
                  <ReactJson collapsed={true} src={metadata.schema} />
                </div>
              ) : (
                "null"
              )}
            </div>
          </>
        ) : (
          <span className="text-center w-full">Enter URL and click Check</span>
        )}
      </div>
    </div>
  );
}
