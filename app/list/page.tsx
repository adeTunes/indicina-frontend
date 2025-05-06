"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { endpoints, queryKeys } from "@/lib/endpoints";

export default function UrlList() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryFn: endpoints.list,
    queryKey: queryKeys.listLinks,
    select: ({ data }) => {
      return Object.entries(data).map(([code, details]) => ({
        code,
        ...details,
      }));
    },
  });

  const filtered = data?.filter((item) =>
    item.longUrl.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4">All Shortened URLs</h2>
      <Input
        placeholder="Search by long URL..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />
      {isLoading ? (
        <h1 className="text-base font-semibold">Loading...</h1>
      ) : (
        <div className="space-y-4">
          {filtered?.map((item) => (
            <Card key={item.code}>
              <CardContent className="p-4">
                <p>
                  <strong>Original:</strong> {item.longUrl}
                </p>
                <p>
                  <strong>Short:</strong>{" "}
                  <a
                    href={`${process.env.NEXT_PUBLIC_BK_APP_DOMAIN}/${item.code}`}
                    className="text-blue-600 underline"
                    target="_blank"
                  >
                    {process.env.NEXT_PUBLIC_BK_APP_DOMAIN}/{item.code}
                  </a>
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Visits:</strong> {item.visits}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
