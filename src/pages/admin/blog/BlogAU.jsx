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
  setOpenAddDialog,
  handleSubmit,
}) {
  
  


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
      <form onSubmit={handleSubmit} 
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
            <label className="block text-sm font-medium mb-1">Heading</label>
            <input
              type="text"
              value={section.heading}
              onChange={(e) => handleChange(index, "heading", e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Apartment</label>
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
            <label className="block text-sm font-medium mb-1">House</label>
            <input
              type="text"
              value={section.house}
              onChange={(e) => handleChange(index, "house", e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Winner</label>
            <input
              type="text"
              value={section.winner}
              onChange={(e) => handleChange(index, "winner", e.target.value)}
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

          {/* <div className="space-y-2">
            <Label>Sections</Label>
            {sections.map((section, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded bg-gray-50 space-y-3"
              >
                <input
                  type="text"
                  value={section.heading}
                  onChange={(e) =>
                    handleSectionChange(index, "heading", e.target.value)
                  }
                  placeholder="Heading"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={section.apartment}
                  onChange={(e) =>
                    handleSectionChange(index, "apartment", e.target.value)
                  }
                  placeholder="Apartment"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={section.house}
                  onChange={(e) =>
                    handleSectionChange(index, "house", e.target.value)
                  }
                  placeholder="House"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={section.winner}
                  onChange={(e) =>
                    handleSectionChange(index, "winner", e.target.value)
                  }
                  placeholder="Winner"
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            <Button type="button" onClick={addSection} className="mt-2">
              Add Section
            </Button>
          </div> */}

          <div className="space-y-2">
            <Label>Owner</Label>
            <select
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select owner</option>
              {owners.map((o) => (
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
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenAddDialog(false)}
          >
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

import { useUpdateAdminMutation } from "@/app/service/admin";
import { ImagePlus, Upload } from "lucide-react";

export function AdminPUT({ admin, onClose, onUpdated }) {
  const [name, setName] = useState(admin.name || "");
  const [email, setEmail] = useState(admin.email || "");
  const [phone, setPhone] = useState(admin.phone || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  const handleUpdate = async () => {
    try {
      const updateData = {
        id: admin._id,
        updateadmin: {
          name,
          email,
          phone,
          ...(password && { password }),
        },
      };

      const { status } = await updateAdmin(updateData).unwrap();

      if (status === 200) {
        onClose();
        onUpdated();
      }
    } catch (err) {
      console.error("Failed to update admin:", err);
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Edit Admin</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password (optional)</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          className="bg-rose-600 hover:bg-rose-700"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}


export function ShowImagesIcon({ images = [], onClose }) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Hostel Images</h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {images.map((imgUrl, i) => (
                <div key={i} className="border rounded overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`Hostel ${i}`}
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