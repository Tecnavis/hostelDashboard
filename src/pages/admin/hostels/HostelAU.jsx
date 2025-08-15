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
  Bus,
  TrainFrontTunnel,
  Car,
  Plane,
  Ship,
  Sailboat,
  Bike,
  Siren,
  Navigation,
  CarTaxiFront,
  Hotel,
  Trash2,
  School,
  BookOpenCheck,
  Hospital,
  Stethoscope,
  Pill,
  Fuel,
  Church,
  Mountain,
  MoonStar,
  ShieldCheck,
  ShoppingBag,
  Store,
  TreePalm,
  Dumbbell,
  Clapperboard,
  Wine,
  CreditCard,
  Building2,
  AirVent,
  WashingMachine,
  Cuboid,
  Container,
} from "lucide-react";

export const iconMap = {
  Wifi,
  Utensils,
  Bath,
  Camera,
  Shirt,
  Bike,
  Car,
  BatteryCharging,
  Gamepad2,
  Brush,
  Droplet,
  Fan,
  AirVent,
  WashingMachine,
  Cuboid,
  Container,
  BookOpen,
  Flame,
  Lock,
  UserCheck,
};

export const transportMap = {
  Bus,
  TrainFrontTunnel,
  Car,
  Plane,
  CarTaxiFront,
  Ship,
  Sailboat,
  Bike,
  BatteryCharging,
  Siren,
  Navigation,
};

const restorentMap = { Hotel };

export const nearbyMap = {
  School,
  BookOpenCheck,
  Hospital,
  Stethoscope,
  Pill,
  Fuel,
  Church,
  Mountain,
  MoonStar,
  ShieldCheck,
  Flame,
  ShoppingBag,
  Store,
  Utensils,
  TreePalm,
  Dumbbell,
  Clapperboard,
  Wine,
  CreditCard,
  Building2,
};

// amenitiesData.ts

export const AVAILABLE_AMENITIES = [
  { name: "Wi-Fi / High-speed internet", icon: "Wifi" },
  { name: "Meals included", icon: "Utensils" },
  { name: "Attached washroom", icon: "Bath" },
  { name: "Security / CCTV", icon: "Camera" },
  { name: "Laundry service", icon: "Shirt" },
  { name: "Parking two-wheeler", icon: "Bike" },
  { name: "Parking four-wheeler", icon: "Car" },
  { name: "Power backup", icon: "BatteryCharging" },
  { name: "Common recreation area", icon: "Gamepad2" },
  { name: "Housekeeping", icon: "Brush" },
  { name: "24×7 water supply", icon: "Droplet" },
  { name: "Fans", icon: "Fan" },
  { name: "A/C", icon: "AirVent" },
  { name: "Washing machine", icon: "WashingMachine" },
  { name: "Cupboard", icon: "Cuboid" },
  { name: "Iron box", icon: "Container" },
  { name: "Study tables / Desks", icon: "BookOpen" },
  { name: "Hot water / Geyser", icon: "Flame" },
  { name: "Locker / Storage", icon: "Lock" },
  { name: "Visitor access", icon: "UserCheck" },
];

export const AVAILABLE_TRANSPORTATION = [
  { name: "Bus Stop", icon: "Bus" },
  { name: "Metro Station", icon: "TrainFrontTunnel" },
  { name: "Auto Rickshaw Stand", icon: "Car" },
  { name: "Airport", icon: "Plane" },
  { name: "Railway Station", icon: "TrainFrontTunnel" },
  { name: "Taxi Stand", icon: "CarTaxiFront" },
  { name: "Bike Rental", icon: "Bike" },
  { name: "Ferry Terminal", icon: "Ship" },
  { name: "Boat Dock", icon: "Sailboat" },
  { name: "Helipad", icon: "Navigation" },
  { name: "EV Charging", icon: "BatteryCharging" },
  { name: "Rickshaw Stand", icon: "Siren" },
  { name: "Car Rental", icon: "Car" },
  { name: "Highway Exit", icon: "Navigation" },
];

export const NEARBY_PLACES = [
  { name: "School", icon: "School" },
  { name: "College", icon: "BookOpenCheck" },
  { name: "Hospital", icon: "Hospital" },
  { name: "Clinic", icon: "Stethoscope" },
  { name: "Pharmacy", icon: "Pill" },
  { name: "Petrol Pump", icon: "Fuel" },
  { name: "Church", icon: "Church" },
  { name: "Temple", icon: "Mountain" },
  { name: "Mosque", icon: "MoonStar" },
  { name: "Police Station", icon: "ShieldCheck" },
  { name: "Fire Station", icon: "Flame" },
  { name: "Shopping Mall", icon: "ShoppingBag" },
  { name: "Market", icon: "Store" },
  { name: "Restaurant", icon: "Utensils" },
  { name: "Park", icon: "TreePalm" },
  { name: "Gym", icon: "Dumbbell" },
  { name: "Cinema", icon: "Clapperboard" },
  { name: "Bar / Pub", icon: "Wine" },
  { name: "ATM", icon: "CreditCard" },
  { name: "Bank", icon: "Building2" },
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
  transport,
  category,
  owners,
  selectedImages,
  setName,
  setPhone,
  setPrice,
  setAccommodationType,
  setLocation,
  setDescription,
  setCategory,
  ownerId,
  setOwnerId,
  setSelectedImages,
  handleSubmit,
  onClose,
  toggleAmenity,
  toggleTransport,
  setSelectedTransport,
  addRestaurant,
  restaurantName,
  setRestaurantName,
  restaurantFar,
  setRestaurantFar,
  selectedRestaurants,
  removeRestaurant,
  toggleNearby,
  selectedNearby,
  setSelectdNearby,
}) {
  const [search, setSearch] = useState("");

  const filteredOwners = owners.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add New Hostel</DialogTitle>restorentMap
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
              onChange={(e) => setPhone(e.target.restorentMapvalue)}
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
            <Label>Accommodation</Label>
            <select
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Accommodation</option>
              <option value="with_food">With Food</option>
              <option value="without_food">Without Food</option>
            </select>
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
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select category</option>
              <option value="Men's hostel">Men's hostel</option>
              <option value="Women's hostel">Women's hostel</option>
              <option value="Others">Others</option>
            </select>
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

        <div className="space-y-4">
          <Label className="block mb-2">Transportation</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {AVAILABLE_TRANSPORTATION.map((item) => {
              const Icon = transportMap[item.icon];
              const isSelected = transport?.some((a) => a.name === item.name);
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => toggleTransport(item)}
                  className={`relative flex items-center gap-2 p-3 border rounded-lg transition w-full text-left ${
                    isSelected
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="text-sm">{item.name}</span>
                  {isSelected && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>

          {transport.length > 0 && (
            <div className="mt-4 space-y-4">
              {transport.map((trans, index) => (
                <div key={trans.name} className="flex items-center gap-4">
                  <span className="w-32">{trans.name}</span>
                  <Input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Enter distance (e.g., 200m)"
                    value={trans.far}
                    onChange={(e) => {
                      const updated = [...transport];
                      updated[index].far = e.target.value;
                      setSelectedTransport(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="block mb-2">Nearby</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {NEARBY_PLACES.map((item) => {
              const Icon = nearbyMap[item.icon];
              const isSelected = selectedNearby?.some(
                (a) => a.name === item.name
              );
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => toggleNearby(item)}
                  className={`relative flex items-center gap-2 p-3 border rounded-lg transition w-full text-left ${
                    isSelected
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="text-sm">{item.name}</span>
                  {isSelected && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedNearby.length > 0 && (
            <div className="mt-4 space-y-4">
              {selectedNearby.map((nearby, index) => (
                <div key={nearby.name} className="flex items-center gap-4">
                  <span className="w-32">{nearby.name}</span>
                  <Input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Enter distance (e.g., 200m)"
                    value={nearby.far}
                    onChange={(e) => {
                      const updated = [...selectedNearby];
                      updated[index].far = e.target.value;
                      setSelectdNearby(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="block mb-2 text-sm">Restaurants</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Restaurant name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
            <Input
              placeholder="Far (distance)"
              value={restaurantFar}
              onChange={(e) => setRestaurantFar(e.target.value)}
            />
            <Button onClick={addRestaurant} className="shrink-0">
              Add
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {selectedRestaurants.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-gray-600" />
                  <div className="text-sm">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.far}</p>
                  </div>
                </div>
                <button onClick={() => removeRestaurant(r.name)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
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

export function HostelPUT({
  hostel,
  owners = [],
  onClose,
  onUpdated,
  transport,
  selectedNearby,
  restaurantName,
  restaurantFar,
  addRestaurant,
  selectedRestaurants,
  selectedAmenities,
  toggleAmenity,
  toggleTransport,
  toggleNearby,
  setRestaurantName,
  setSelectdNearby,
  setRestaurantFar,
  removeRestaurant,
  setSelectedTransport,
   selectedTransport
}) {
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

    selectedAmenities.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`amenities[${i}][name]`, a.name);
        formData.append(`amenities[${i}][icon]`, a.icon);
      }
    });
    selectedTransport.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`transportation[${i}][name]`, a.name);
        formData.append(`transportation[${i}][icon]`, a.icon);
        formData.append(`transportation[${i}][far]`, a.far);
      }
    });
    selectedNearby.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`nearbyPlaces[${i}][name]`, a.name);
        formData.append(`nearbyPlaces[${i}][icon]`, a.icon);
        formData.append(`nearbyPlaces[${i}][far]`, a.far);
      }
    });
    selectedRestaurants.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`restaurants[${i}][name]`, a.name);
        formData.append(`restaurants[${i}][icon]`, a.icon);
        formData.append(`restaurants[${i}][far]`, a.far);
      }
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

  const [search, setSearch] = useState("");

  const filteredOwners = owners.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
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
            <select
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Accommodation</option>
              <option value="with_food">With Food</option>
              <option value="without_food">Without Food</option>
            </select>
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

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select category</option>
              <option value="Men's hostel">Men's hostel</option>
              <option value="Women's hostel">Women's hostel</option>
              <option value="Others">Others</option>
            </select>
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

        <div className="space-y-4">
          <Label className="block mb-2">Transportation</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {AVAILABLE_TRANSPORTATION.map((item) => {
              const Icon = transportMap[item.icon];
              const isSelected = transport?.some((a) => a.name === item.name);
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => toggleTransport(item)}
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

          {transport.length > 0 && (
            <div className="mt-4 space-y-4">
              {transport.map((trans, index) => (
                <div key={trans.name} className="flex items-center gap-4">
                  <span className="w-32">{trans.name}</span>
                  <Input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Enter distance (e.g., 200m)"
                    value={trans.far}
                    onChange={(e) => {
                      const updated = [...transport];
                      updated[index].far = e.target.value;
                      setSelectedTransport(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="block mb-2">Nearby</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {NEARBY_PLACES.map((item) => {
              const Icon = nearbyMap[item.icon];
              const isSelected = selectedNearby?.some(
                (a) => a.name === item.name
              );
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => toggleNearby(item)}
                  className={`relative flex items-center gap-2 p-3 border rounded-lg transition w-full text-left ${
                    isSelected
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="text-sm">{item.name}</span>
                  {isSelected && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedNearby.length > 0 && (
            <div className="mt-4 space-y-4">
              {selectedNearby.map((nearby, index) => (
                <div key={nearby.name} className="flex items-center gap-4">
                  <span className="w-32">{nearby.name}</span>
                  <Input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Enter distance (e.g., 200m)"
                    value={nearby.far}
                    onChange={(e) => {
                      const updated = [...selectedNearby];
                      updated[index].far = e.target.value;
                      setSelectdNearby(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="block mb-2 text-sm">Restaurants</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Restaurant name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
            <Input
              placeholder="Far (distance)"
              value={restaurantFar}
              onChange={(e) => setRestaurantFar(e.target.value)}
            />
            <Button onClick={addRestaurant} className="shrink-0">
              Add
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {selectedRestaurants.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-gray-600" />
                  <div className="text-sm">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.far}</p>
                  </div>
                </div>
                <button onClick={() => removeRestaurant(r.name)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
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

export function ShowMorFacility({ facility = [], onClose }) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">{facility?.name}</h2>
          {facility?.data?.length > 0 ? (
            <div className="py-3 px-4 ">
              {facility.data?.map((a, i) => {
                const Icon =
                  iconMap[a.icon] ||
                  transportMap[a.icon] ||
                  nearbyMap[a.icon] ||
                  restorentMap[a.icon];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {a.name}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">No {facility?.name} available.</p>
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
