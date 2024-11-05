"use client";

import { Button } from "@/components/ui/button";
import { ContentType } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function AddContent() {
  const router = useRouter();

  const handleContentTypeSelect = (type: ContentType) => {
    router.push(`/add-content/${type.toLowerCase()}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Content</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={() => handleContentTypeSelect(ContentType.NOVEL)}
          className="h-32 text-lg"
          variant="outline"
        >
          Add Novel
        </Button>

        <Button
          onClick={() => handleContentTypeSelect(ContentType.MANGA)}
          className="h-32 text-lg"
          variant="outline"
        >
          Add Manga
        </Button>
      </div>
    </div>
  );
}
