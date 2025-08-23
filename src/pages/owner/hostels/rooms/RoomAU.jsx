import { ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RoomsPOST({
  isPosting,
  roomNumber,
  setRoomNumber,
  capacity,
  setCapacity,
  price,
  setPrice,
  currentOccupancy,
  setCurrentOccupancy,
  roomType,
  setRoomType,
  payment,
  setPayment,
  charge,
  setCharge,
  gardianInfo,
  setGardianInfo,
  visitTimes,
  handleVisitTime,
  addVisitTime,
  removeVisitTime,
  selectedImages,
  setSelectedImages,
  handleSubmit,
  setIsAddHostelOpen,
}) {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add New Room</DialogTitle>
      </DialogHeader>
      {/* <div className="grid gap-4 py-4"> */}
      <div
        className="overflow-y-auto pr-2 mt-2 space-y-4"
        style={{ maxHeight: "calc(90vh - 130px)" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="roomNumber">Room Number</Label>
            <Input
              id="roomNumber"
              placeholder="Enter room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              placeholder="Enter room capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomtype">Room Type</Label>
            <Input
              id="roomtype"
              placeholder="Enter room type"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="charge">Charge</Label>
            <Input
              id="charge"
              placeholder="Enter room Charge"
              value={charge}
              onChange={(e) => setCharge(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment">Payment</Label>
            <Input
              id="payment"
              placeholder="Enter payment"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Gardian Name</Label>
            <Input
              id="name"
              placeholder="Enter street"
              value={gardianInfo.name}
              onChange={(e) =>
                setGardianInfo({
                  ...gardianInfo,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Gardian Email</Label>
            <Input
              id="email"
              placeholder="Enter gardian email"
              value={gardianInfo.email}
              onChange={(e) =>
                setGardianInfo({
                  ...gardianInfo,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Gardian Phone</Label>
            <Input
              id="phone"
              placeholder="Enter gardian phone"
              value={gardianInfo.phone}
              onChange={(e) =>
                setGardianInfo({
                  ...gardianInfo,
                  phone: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentOccupancy">Current Occupancy</Label>

            <Input
              id="currentOccupancy"
              placeholder="Enter number of people currently in the room"
              value={currentOccupancy}
              onChange={(e) => setCurrentOccupancy(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>

            <Input
              id="price"
              placeholder="Enter room price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* <div className="space-y-2">
            <Label>Features</Label>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatures(index, e.target.value)}
                  placeholder={`Enter feature ${index + 1}`}
                />
                {features.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeatures(index)}
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
              onClick={addFeatures}
            >
              + Add Feature
            </Button>
          </div> */}

          <div className="space-y-2">
            <Label>Visit Times</Label>
            {visitTimes.map((time, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={time}
                  onChange={(e) => handleVisitTime(index, e.target.value)}
                  placeholder={`Enter visit time ${index + 1}`}
                />
                {visitTimes.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVisitTime(index)}
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
              onClick={addVisitTime}
            >
              + Add Visit Time
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="images">Upload Images</Label>
          <label className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer">
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload</p>
            <Upload className="h-4 w-4" />

            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedImages((prevImages) => [
                    ...prevImages,
                    ...Array.from(e.target.files),
                  ]);
                }
              }}
            />
          </label>

          {selectedImages.length > 0 && (
            <div className="grid gap-2 mt-4">
              <Label>Preview</Label>
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
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => setIsAddHostelOpen(false)}
          className={"cursor-pointer"}
        >
          Cancel
        </Button>
        <Button
          className="bg-rose-600 hover:bg-rose-700 cursor-pointer"
          onClick={handleSubmit}
        >
          {isPosting ? "Creating..." : "Create"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

import { useState } from "react";
import { useUpdateroomMutation } from "@/app/service/room";

export function RoomsPUT({ room, onClose, onUpdated }) {
  const [roomNumber, setRoomNumber] = useState(room.roomNumber || "");
  const [capacity, setCapacity] = useState(room.capacity || "");
  const [price, setPrice] = useState(room.price || "");
  const [currentOccupancy, setCurrentOccupancy] = useState(
    room.currentOccupancy || ""
  );
  const [roomType, setRoomType] = useState(room.roomType || "");
  const [payment, setPayment] = useState(room.payment || "");
  const [charge, setCharge] = useState(room.charge || "");
  const [gardianInfo, setGardianInfo] = useState({
    name: room.gardianInfo?.name || "",
    email: room.gardianInfo?.email || "",
    phone: room.gardianInfo?.phone || "",
  });

  // const [features, setFeatures] = useState(room.features || [""]);
  const [visitTimes, setVisitTimes] = useState(room.visitTimes || [""]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState(room.photos || []);

  const [updateRoom, { isLoading }] = useUpdateroomMutation();

  // const handleFeatures = (index, value) => {
  //   const newFeatures = [...features];
  //   newFeatures[index] = value;
  //   setFeatures(newFeatures);
  // };
  // const addFeatures = () => setFeatures([...features, ""]);
  // const removeFeatures = (index) =>
  //   setFeatures(features.filter((_, i) => i !== index));

  const handleVisitTime = (index, value) => {
    const newVisit = [...visitTimes];
    newVisit[index] = value;
    setVisitTimes(newVisit);
  };
  const addVisitTime = () => setVisitTimes([...visitTimes, ""]);
  const removeVisitTime = (index) =>
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
    formData.append("price", price);
    formData.append("currentOccupancy", currentOccupancy);
    formData.append("gardianInfo[name]", gardianInfo.name);
    formData.append("gardianInfo[email]", gardianInfo.email);
    formData.append("gardianInfo[phone]", gardianInfo.phone);
    formData.append("roomType", roomType);
    formData.append("payment", payment);
    formData.append("charge", charge);

    // features.forEach((a, i) => {
    //   if (a.trim() !== "") {
    //     formData.append(`features[${i}]`, a);
    //   }
    // });
    visitTimes.forEach((a, i) => {
      if (a.trim() !== "") {
        formData.append(`visitTimes[${i}]`, a);
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
            <Label>Room Number</Label>
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
            <Label>Charge</Label>
            <Input value={charge} onChange={(e) => setCharge(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Payment</Label>
            <Input
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Gardian Name</Label>
            <Input
              value={gardianInfo.name}
              onChange={(e) =>
                setGardianInfo({ ...gardianInfo, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Gardian Email</Label>
            <Input
              value={gardianInfo.email}
              onChange={(e) =>
                setGardianInfo({ ...gardianInfo, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Gardian Phone</Label>
            <Input
              value={gardianInfo.phone}
              onChange={(e) =>
                setGardianInfo({ ...gardianInfo, phone: e.target.value })
              }
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
            <Label>Price</Label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>

        {/* <div className="space-y-2">
          <Label>Features</Label>
          {features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={f}
                onChange={(e) => handleFeatures(i, e.target.value)}
              />
              {features.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeatures(i)}
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addFeatures}>
            + Add Feature
          </Button>
        </div> */}

        <div className="space-y-2">
          <Label>Visit Times</Label>
          {visitTimes.map((v, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={v}
                onChange={(e) => handleVisitTime(i, e.target.value)}
              />
              {visitTimes.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeVisitTime(i)}
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addVisitTime}>
            + Add Visit Time
          </Button>
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
        <Button onClick={handleSubmit} disabled={isLoading}  className="bg-rose-600 hover:bg-rose-700 cursor-pointer">
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
