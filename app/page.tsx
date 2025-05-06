"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "@/lib/endpoints";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: endpoints.encode,
    onSuccess({ data }) {
      setShortUrl(data.shortUrl);
    },
    onError() {
      alert("Something went wrong");
    },
  });

  return (
    <main className="max-w-xl mx-auto mt-10 p-4 space-y-6">
      <h1 className="text-3xl font-bold">URL Shortener</h1>
      <Input
        placeholder="Enter long URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={() => mutate({ url })} disabled={isPending}>
        {isPending ? "Shortening..." : "Shorten URL"}
      </Button>
      {shortUrl && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Short URL:</p>
            <a href={shortUrl} className="text-blue-600 underline">
              {shortUrl}
            </a>
          </CardContent>
        </Card>
      )}
      <Link href="/list" className="text-blue-500 underline block mt-4">
        View All Shortened URLs
      </Link>
    </main>
  );
}
