"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Wifi,
  Utensils,
  Bath,
  Camera,
  Shirt,
  Car,
  BatteryCharging,
  Gamepad2,
  Droplet,
  Fan,
  BookOpen,
  Flame,
  Lock,
  UserCheck,
  ImagePlus,
  Upload,
  Check,
  Brush,
} from "lucide-react";


export const iconMap = {
  Wifi,
  Utensils,
  Bath,
  Camera,
  Shirt,
  Car,
  BatteryCharging,
  Gamepad2,
  Gamepad2,
  Brush,
  Droplet,
  Fan,
  BookOpen,
  Flame,
  Lock,
  UserCheck,
};

// amenitiesData.ts

export const AVAILABLE_AMENITIES = [
  { name: "Wi-Fi / High-speed internet", icon: "Wifi" },
  { name: "Meals included", icon: "Utensils" },
  { name: "Attached washroom", icon: "Bath" },
  { name: "Security / CCTV", icon: "Camera" },
  { name: "Laundry service", icon: "Shirt" },
  { name: "Parking (two-wheeler / four-wheeler)", icon: "Car" },
  { name: "Power backup", icon: "BatteryCharging" },
  { name: "Common recreation area", icon: "Gamepad2" },
  { name: "Housekeeping", icon: "Brush" },
  { name: "24×7 water supply", icon: "Droplet" },
  { name: "Air conditioning / Fans", icon: "Fan" },
  { name: "Study tables / Desks", icon: "BookOpen" },
  { name: "Hot water / Geyser", icon: "Flame" },
  { name: "Locker / Storage", icon: "Lock" },
  { name: "Visitor access", icon: "UserCheck" },
];

export function HostelPOST({
  isPosting,
  name,
  phone,
  price,
  accommodationType,
  location,
  description,
  amenities,
  category,
  owners,
  selectedImages,
  setName,
  setPhone,
  setPrice,
  setAccommodationType,
  setLocation,
  setDescription,
  // handleFacilities,
  // addFacilities,
  // removeFacilities,
  setCategory,
  ownerId,
  setOwnerId,
  setSelectedImages,
  handleSubmit,
  onClose,
    toggleAmenity,

}) {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add New Hostel</DialogTitle>
      </DialogHeader>

      <div
        className="overflow-y-auto pr-2 mt-2 space-y-4"
        style={{ maxHeight: "calc(90vh - 130px)" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter hostel name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+91..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accommodation">Accommodation</Label>
            <Input
              id="accommodation"
              placeholder="Accommodation"
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              placeholder="Street"
              value={location.street}
              onChange={(e) =>
                setLocation({ ...location, street: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="place">Place</Label>
            <Input
              id="place"
              placeholder="Place"
              value={location.place}
              onChange={(e) =>
                setLocation({ ...location, place: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              placeholder="Pincode"
              value={location.pincode}
              onChange={(e) =>
                setLocation({ ...location, pincode: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div className="space-y-2 col-span-2">
            <Label>Facilities</Label>
            {amenities.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={item}
                  placeholder={`Facility ${index + 1}`}
                  onChange={(e) => handleFacilities(index, e.target.value)}
                />
                {amenities.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFacilities(index)}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFacilities}
            >
              + Add Facility
            </Button>
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>
            <select
              id="owner"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
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

        
           <div className="space-y-4">
                  <Label className="block mb-2">Facilities</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {AVAILABLE_AMENITIES.map((item) => {
                      const Icon = iconMap[item.icon];
                      const isSelected = amenities?.some((a) => a.name === item.name);
                      return (
                        <button
                          type="button"
                          key={item.name}
                          onClick={() => toggleAmenity(item)}
                          className={`relative flex items-center gap-2 p-3 border rounded-lg transition w-full text-left ${
                            isSelected
                              ? "bg-blue-100 border-blue-500"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm">{item.name}</span>
                          {isSelected && (
                            <Check className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
                          )}
                        </button>
                      );
                    })}
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

          {selectedImages.length > 0 && (
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
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="bg-rose-600 hover:bg-rose-700"
          onClick={handleSubmit}
        >
          {isPosting ? "Creating..." : "Create"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

("use client");

import { useUpdatehostelMutation } from "@/app/service/hostel";

export function HostelPUT({ hostel, owners = [], onClose, onUpdated }) {
  const [name, setName] = useState(hostel?.name || "");
  const [phone, setPhone] = useState(hostel?.phone || "");
  const [price, setPrice] = useState(hostel?.price || "");
  const [accommodationType, setAccommodationType] = useState(
    hostel?.accommodationType || ""
  );
  const [location, setLocation] = useState({
    street: hostel?.location?.street || "",
    place: hostel?.location?.place || "",
    pincode: hostel?.location?.pincode || "",
  });
  const [description, setDescription] = useState(hostel?.description || "");
  const [category, setCategory] = useState(hostel?.category || "");
  const [ownerId, setOwnerId] = useState(hostel?.ownerId?._id || "");
  const [amenities, setAmenities] = useState(
    hostel?.amenities?.length ? hostel.amenities : [""]
  );
  const [existingPhotos, setExistingPhotos] = useState(hostel?.photos || []);
  const [selectedImages, setSelectedImages] = useState([]);

  const [updatehostel, { isLoading }] = useUpdatehostelMutation();

  const handleFacilities = (index, value) => {
    const newAmenities = [...amenities];
    newAmenities[index] = value;
    setAmenities(newAmenities);
  };

  const addFacilities = () => setAmenities([...amenities, ""]);
  const removeFacilities = (index) =>
    setAmenities(amenities.filter((_, i) => i !== index));

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("price", price);
    formData.append("accommodationType", accommodationType);
    formData.append("location[street]", location.street);
    formData.append("location[place]", location.place);
    formData.append("location[pincode]", location.pincode);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("ownerId", ownerId);

    amenities.forEach((a, i) => {
      if (a.trim()) formData.append(`amenities[${i}]`, a);
    });

    formData.append("existingPhotos", JSON.stringify(existingPhotos));
    selectedImages.forEach((file) => formData.append("images", file));

    try {
      const response = await updatehostel({
        id: hostel._id,
        updateData: formData,
      }).unwrap();

      if (response.status === 200) {
        onClose();
        onUpdated();
      }
    } catch (err) {
      console.error("Failed to update hostel:", err);
    }
  };

  // ✅ Merge owners with current ownerId to ensure current one is included
  const combinedOwners = [...owners];
  if (hostel?.ownerId && !owners.some((o) => o._id === hostel.ownerId._id)) {
    combinedOwners.push(hostel.ownerId);
  }

  // Remove duplicate owners by _id
  const uniqueOwners = Array.from(
    new Map(combinedOwners.map((o) => [o._id, o])).values()
  );

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Edit Hostel</DialogTitle>
      </DialogHeader>

      <div
        className="overflow-y-auto pr-2 mt-2 space-y-4"
        style={{ maxHeight: "calc(90vh - 130px)" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Accommodation</Label>
            <Input
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Street</Label>
            <Input
              value={location.street}
              onChange={(e) =>
                setLocation({ ...location, street: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Place</Label>
            <Input
              value={location.place}
              onChange={(e) =>
                setLocation({ ...location, place: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Pincode</Label>
            <Input
              value={location.pincode}
              onChange={(e) =>
                setLocation({ ...location, pincode: e.target.value })
              }
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Facilities</Label>
            {amenities.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleFacilities(i, e.target.value)}
                />
                {amenities.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFacilities(i)}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFacilities}
            >
              + Add Facility
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>
            <select
              id="owner"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select owner</option>
              {uniqueOwners.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name}
                </option>
              ))}
            </select>
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
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleUpdate} disabled={isLoading}>
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
