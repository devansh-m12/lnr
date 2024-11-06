import { ContentType } from "@prisma/client";
import { notFound } from "next/navigation";
import AddNovel from "./AddNovel";
import AddManga from "./AddManga";

export default async function AddContentPage({ params }: { params: any }) {
  // Convert to uppercase and validate the content type
  const { content } = await params;
  const contentType = content.toUpperCase() as ContentType;
  const validContentTypes = Object.values(ContentType);

  if (!validContentTypes.includes(contentType as ContentType)) {
    notFound();
  }

  // Return the appropriate component based on content type
  switch (contentType) {
    case ContentType.NOVEL:
      return <AddNovel />;
    case ContentType.MANGA:
      return <AddManga />;
    default:
      notFound();
  }
}

// Generate static params for valid content types
export function generateStaticParams() {
  return Object.values(ContentType).map((type) => ({
    content: type.toLowerCase(),
  }));
}
