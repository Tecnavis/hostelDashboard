import {
  ImagePlus,
  Upload,
  CookingPot,
  Bath,
  Fan,
  AirVent,
  WashingMachine,
  Cuboid,
  Container,
  BookOpen,
  Flame,
  Lock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const iconMap = {
  CookingPot,
  Bath,
  Fan,
  AirVent,
  WashingMachine,
  Cuboid,
  Container,
  BookOpen,
  Flame,
  Lock,
};

export const AVAILABLE_AMENITIES = [
  { name: "Kitchen", icon: "CookingPot" },
  { name: "Attached washroom", icon: "Bath" },
  { name: "Fans", icon: "Fan" },
  { name: "A/C", icon: "AirVent" },
  { name: "Washing machine", icon: "WashingMachine" },
  { name: "Cupboard", icon: "Cuboid" },
  { name: "Iron box", icon: "Container" },
  { name: "Study tables / Desks", icon: "BookOpen" },
  { name: "Hot water / Geyser", icon: "Flame" },
  { name: "Locker / Storage", icon: "Lock" },
];

export function RoomPOST({
  isPosting,
  roomNumber,
  setRoomNumber,
  capacity,
  setCapacity,
  currentOccupancy,
  setCurrentOccupancy,
  roomType,
  setRoomType,
  selectedImages,
  setSelectedImages,
  handleSubmit,
  setIsAddHostelOpen,
  withFood,
  setWithFood,
  withoutFood,
  setWithoutFood,
  toggleAmenity,
  amenities,
}) {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add New Room</DialogTitle>
      </DialogHeader>

      <div
        className="overflow-y-auto pr-2 mt-2 space-y-4"
        style={{ maxHeight: "calc(90vh - 130px)" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Room Name</Label>
            <Input
              value={roomNumber}
              placeholder="Room name"
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Capacity</Label>
            <Input
              value={capacity}
              placeholder="Number of members in this room"
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Room Type</Label>
            <Input
              placeholder="No ac / ac"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Current Occupancy</Label>
            <Input
              placeholder="Currently living members"
              value={currentOccupancy}
              onChange={(e) => setCurrentOccupancy(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>With Food</Label>
            <Input
              value={withFood}
              placeholder="Price"
              onChange={(e) => setWithFood(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Without Food</Label>
            <Input
              value={withoutFood}
              placeholder="Price"
              onChange={(e) => setWithoutFood(e.target.value)}
            />
          </div>
        </div>

        {/* <div className="space-y-2">
          <Label>Features</Label>
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatures(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
              />
              {features.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => removeFeatures(index)}>✕</Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addFeatures}>+ Add Feature</Button>
        </div> */}

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

        <div className="space-y-2">
          <Label>Upload Images</Label>
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
                  setSelectedImages((prev) => [
                    ...prev,
                    ...Array.from(e.target.files),
                  ]);
                }
              }}
            />
          </label>
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {selectedImages.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setIsAddHostelOpen(false)}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isPosting}
          className="bg-rose-600 hover:bg-rose-700 cursor-pointer"
        >
          {isPosting ? "Creating..." : "Create"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

import { useState } from "react";
import { useUpdateroomMutation } from "@/app/service/room";

export function RoomPUT({ room, onClose, onUpdated }) {
  const [roomNumber, setRoomNumber] = useState(room.roomNumber || "");
  const [capacity, setCapacity] = useState(room.capacity || "");
  const [currentOccupancy, setCurrentOccupancy] = useState(
    room.currentOccupancy || ""
  );
  const [roomType, setRoomType] = useState(room.roomType || "");
  const [withFood, setWithFood] = useState(room?.withFood || "");
  const [withoutFood, setWithoutFood] = useState(room?.withoutFood || "");

  // const [features, setFeatures] = useState(room.features || [""]);
  const [visitTimes, setVisitTimes] = useState(room.visitTimes || [""]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState(room.photos || []);

  const [updateRoom, { isLoading }] = useUpdateroomMutation();

  const [amenities, setAmenities] = useState(
    room?.amenities?.length ? room?.amenities : []
  );

  // const handleFeatures = (index, value) => {
  //   const newFeatures = [...features];
  //   newFeatures[index] = value;
  //   setFeatures(newFeatures);
  // };
  // const addFeatures = () => setFeatures([...features, ""]);
  // const removeFeatures = (index) => setFeatures(features.filter((_, i) => i !== index));

  const toggleAmenity = (item) => {
    setAmenities((prev) => {
      const exists = prev.some((a) => a.name === item.name);
      if (exists) {
        // remove
        return prev.filter((a) => a.name !== item.name);
      } else {
        // add
        return [...prev, item];
      }
    });
  };


    setVisitTimes(visitTimes.filter((_, i) => i !== index));

  const handleRemoveExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  // ✅ use array upload, not single
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("capacity", capacity);
    formData.append("currentOccupancy", currentOccupancy);
    formData.append("roomType", roomType);
    formData.append("withFood", withFood);
    formData.append("withoutFood", withoutFood);

    // features.forEach((a, i) => {
    //   if (a.trim() !== "") {
    //     formData.append(`features[${i}]`, a);
    //   }
    // });
    amenities.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`amenities[${i}][name]`, a.name);
        formData.append(`amenities[${i}][icon]`, a.icon);
      }
    });

    // ✅ Add NEW images
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    // ✅ Add EXISTING images as JSON string
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      const response = await updateRoom({
        id: room._id,
        updateroom: formData,
      }).unwrap();

      if (response?.status === 200) {
        onClose();
        onUpdated();
      }
    } catch (error) {
      console.error("Room update failed:", error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Edit Room</DialogTitle>
      </DialogHeader>

      <div
        className="overflow-y-auto pr-2 mt-2 space-y-4"
        style={{ maxHeight: "calc(90vh - 130px)" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Room Name</Label>
            <Input
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Capacity</Label>
            <Input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Room Type</Label>
            <Input
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Current Occupancy</Label>
            <Input
              value={currentOccupancy}
              onChange={(e) => setCurrentOccupancy(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>With Food</Label>
            <Input
              value={withFood}
              onChange={(e) => setWithFood(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Without Food</Label>
            <Input
              value={withoutFood}
              onChange={(e) => setWithoutFood(e.target.value)}
            />
          </div>
        </div>

        {/* <div className="space-y-2">
          <Label>Features</Label>
          {features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <Input value={f} onChange={(e) => handleFeatures(i, e.target.value)} />
              {features.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => removeFeatures(i)}>✕</Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addFeatures}>+ Add Feature</Button>
        </div> */}

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

        <div className="space-y-2">
          <Label>Images</Label>
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
                  setSelectedImages((prev) => [
                    ...prev,
                    ...Array.from(e.target.files),
                  ]);
                }
              }}
            />
          </label>

          {(existingImages.length > 0 || selectedImages.length > 0) && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {existingImages.map((url, i) => (
                <div key={i} className="relative">
                  <img
                    src={url}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2"
                    onClick={() => handleRemoveExistingImage(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {selectedImages.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
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
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-rose-600 hover:bg-rose-700 cursor-pointer"
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
          <h2 className="text-lg font-semibold mb-4">Room Images</h2>
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
