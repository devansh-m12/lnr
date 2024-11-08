'use client';

import TextEditor from '@/components/text-editor/TextEditor';

export default function AddNovel() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Add New Novel</h1>
      <TextEditor />
    </div>
  );
}
