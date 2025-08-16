import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function BlogPOST({
  isPosting,
  title,
  description,
  date,
  sections,
  selectedImages,
  ownerId,
  owners,
  setTitle,
  setDescription,
  setDate,
  setSections,
  setSelectedImages,
  setOwnerId,
  handleSubmit,
  onClose,
}) {
  const [search, setSearch] = useState("");

  const filteredOwners = owners.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      { heading: "", apartment: "", house: "", winner: "" },
    ]);
  };

  const handleRemoveSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, key, value) => {
    const updated = [...sections];
    updated[index][key] = value;
    setSections(updated);
  };

  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Add New Blog</DialogTitle>
      </DialogHeader>
      <form
        onSubmit={handleSubmit}
        className="overflow-y-auto pr-2 mt-2 space-y-4"
        style={{ maxHeight: "calc(90vh - 130px)" }}
      >
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            {sections.map((section, index) => (
              <div
                key={index}
                className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-sm"
              >
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) =>
                      handleChange(index, "heading", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Apartment
                  </label>
                  <input
                    type="text"
                    value={section.apartment}
                    onChange={(e) =>
                      handleChange(index, "apartment", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    House
                  </label>
                  <input
                    type="text"
                    value={section.house}
                    onChange={(e) =>
                      handleChange(index, "house", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Winner
                  </label>
                  <input
                    type="text"
                    value={section.winner}
                    onChange={(e) =>
                      handleChange(index, "winner", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </div>

                <div className="flex justify-end">
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(index)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove Section
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSection}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Section
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>

            {/* Search box */}
            <input
              type="text"
              placeholder="Search owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
            />

            {/* Owner select */}
            <select
              id="owner"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select owner</option>
              {filteredOwners.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="images">Upload Images</Label>
          <label className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer">
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload</p>
            <Upload className="h-4 w-4" />
            <Input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedImages((prev) => [
                    ...prev,
                    ...Array.from(e.target.files),
                  ]);
                }
              }}
            />
          </label>

          {selectedImages?.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {selectedImages.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-rose-600 hover:bg-rose-700"
            disabled={isPosting}
          >
            {isPosting ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

import { ImagePlus, Upload } from "lucide-react";

import { useUpdateblogMutation } from "@/app/service/blog";

export function BlogPUT({ blog, owners, onClose, onUpdated }) {
  const [title, setTitle] = useState(blog.title || "");
  const [description, setDescription] = useState(blog.description || "");
  const [date, setDate] = useState(blog.date ? blog.date.slice(0, 10) : "");
  const [sections, setSections] = useState(
    blog.sections || [{ heading: "", apartment: "", house: "", winner: "" }]
  );
  const [existingPhotos, setExistingPhotos] = useState(blog?.photos || []);

  const [selectedImages, setSelectedImages] = useState([]);
  const [ownerId, setOwnerId] = useState(blog.ownerId?._id || "");

  const [updateblog, { isLoading }] = useUpdateblogMutation();

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      { heading: "", apartment: "", house: "", winner: "" },
    ]);
  };

  const handleRemoveSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, key, value) => {
    const updated = [...sections];
    updated[index][key] = value;
    setSections(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("ownerId", ownerId);
      formData.append("sections", JSON.stringify(sections));
      selectedImages.forEach((file) => formData.append("images", file));

      const { status } = await updateblog({
        id: blog._id,
          updateData: formData,
      }).unwrap();

      if (status === 200) {
        onClose();
        onUpdated();
      }
    } catch (err) {
      console.error("Failed to update blog:", err);
    }
  };

  // ✅ Merge owners with current ownerId to ensure current one is included
  const combinedOwners = [...owners];
  if (blog?.ownerId && !owners.some((o) => o._id === blog.ownerId._id)) {
    combinedOwners.push(blog?.ownerId);
  }

  // Remove duplicate owners by _id
  const uniqueOwners = Array.from(
    new Map(combinedOwners.map((o) => [o._id, o])).values()
  );

  const [search, setSearch] = useState("");

  const filteredOwners = owners?.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Edit Blog</DialogTitle>
      </DialogHeader>
      <form
        onSubmit={handleSubmit}
        className="overflow-y-auto pr-2 mt-2 space-y-4"
        style={{ maxHeight: "calc(90vh - 130px)" }}
      >
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            {sections.map((section, index) => (
              <div
                key={index}
                className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-sm"
              >
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) =>
                      handleChange(index, "heading", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Apartment
                  </label>
                  <input
                    type="text"
                    value={section.apartment}
                    onChange={(e) =>
                      handleChange(index, "apartment", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    House
                  </label>
                  <input
                    type="text"
                    value={section.house}
                    onChange={(e) =>
                      handleChange(index, "house", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Winner
                  </label>
                  <input
                    type="text"
                    value={section.winner}
                    onChange={(e) =>
                      handleChange(index, "winner", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="flex justify-end">
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(index)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove Section
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSection}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Section
            </button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>

            {/* Search box */}
            <input
              type="text"
              placeholder="Search owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
            />

            {/* Owner select */}
            <select
              id="owner"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select owner</option>
              {filteredOwners?.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2 col-span-2">
          <Label>Upload New Images</Label>
          <label className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer">
            <ImagePlus className="h-8 w-8" />
            <p className="text-sm">Click to upload</p>
            <Upload className="h-4 w-4" />
            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedImages(Array.from(e.target.files));
                }
              }}
            />
          </label>
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {selectedImages.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2 col-span-2">
          {existingPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {existingPhotos.map((url, i) => (
                <div key={i} className="relative">
                  <img
                    src={url}
                    alt="Existing"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setExistingPhotos(
                        existingPhotos.filter((_, idx) => idx !== i)
                      )
                    }
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-rose-600 hover:bg-rose-700"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}


export function ShowImagesIcon({ images = [], onClose }) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Blog Images</h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {images.map((imgUrl, i) => (
                <div key={i} className="border rounded overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`Blog ${i}`}
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images available.</p>
          )}
          <button
            onClick={onClose}
            className="mt-4 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
